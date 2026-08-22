#!/usr/bin/env python3
"""終値から相関・騰落率を出す（記事の数字づくり用）

使い方:
  # 相関（米国の当日 × 日本の翌営業日、1年/5年/10年）
  python3 scripts/market-corr.py corr XRT 1630.T --label "米・小売" "日本の小売"

  # 相関（同じ日どうし。日本株×為替など）
  python3 scripts/market-corr.py corr JPY=X 1630.T --sameday

  # 騰落率（期間を区切って）
  python3 scripts/market-corr.py ret WMT XLP ^GSPC --from 2023-08-21 --to 2026-08-20

  # 終値を並べる
  python3 scripts/market-corr.py px WMT --last 10

踏んだ落とし穴（コードで対処済み）:
  * JPY=X の月次（interval=1mo）は毎年10月が丸ごと欠落し、値もずれる → 日次のみ
  * 1306.T は10:1の分割がデータに記録されていない → TOPIX は 1348.T
  * 日本株の日足は UTC で前日15時頃になる → .T は +9時間して日付を直す
  * 当日ぶんの終値がまだ無いとき、meta の regularMarketPrice で埋めない（別物）
  * 米国が終わってから日本が開く → 相関は「米国の当日 × 日本の次の営業日」が既定

よく使う銘柄:
  1348.T TOPIX / 1617.T 食品 / 1630.T 小売 / 1622.T 自動車・輸送機 / ^N225 日経平均
  XLP 米・生活必需品 / XRT 米・小売 / ^GSPC S&P500 / ^DJI ダウ
  BND 米国債券 / SHY 1-3年 / IEF 7-10年 / TLT 20年超 / JPY=X ドル円
"""
import argparse, bisect, datetime as dt, json, math, statistics, sys, urllib.request

UA = {"User-Agent": "Mozilla/5.0"}


def fetch(sym, start, end):
    """日足の終値を {'YYYY-MM-DD': 終値} で返す。日本株は日付を +9h して直す。"""
    p1 = int(dt.datetime.combine(start, dt.time()).timestamp())
    p2 = int(dt.datetime.combine(end, dt.time()).timestamp()) + 86400
    url = (f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}"
           f"?period1={p1}&period2={p2}&interval=1d")
    d = json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA)))
    r = d["chart"]["result"][0]
    out, nulls = {}, 0
    for t, c in zip(r["timestamp"], r["indicators"]["quote"][0]["close"]):
        if c is None:
            nulls += 1
            continue
        day = dt.datetime.fromtimestamp(t, dt.UTC)
        if sym.upper().endswith(".T"):
            day += dt.timedelta(hours=9)
        out[day.strftime("%Y-%m-%d")] = c
    if nulls:
        print(f"  ※ {sym}: 終値が空の日が {nulls} 日あった（除外した）", file=sys.stderr)
    return out


def logret(px):
    k = sorted(px)
    return {k[i]: math.log(px[k[i]] / px[k[i - 1]]) for i in range(1, len(k))}


def corr(x, y):
    mx, my = statistics.mean(x), statistics.mean(y)
    num = sum((a - mx) * (b - my) for a, b in zip(x, y))
    dx = math.sqrt(sum((a - mx) ** 2 for a in x))
    dy = math.sqrt(sum((b - my) ** 2 for b in y))
    return num / (dx * dy)


def pair(ra, rb, since, sameday):
    """sameday=False なら a の当日 × b の次の営業日で突き合わせる。"""
    da = [d for d in sorted(ra) if d >= since]
    db = [d for d in sorted(rb) if d >= since]
    if sameday:
        common = sorted(set(da) & set(db))
        return [ra[d] for d in common], [rb[d] for d in common]
    xs, ys = [], []
    for d in da:
        i = bisect.bisect_right(db, d)
        if i < len(db):
            xs.append(ra[d]); ys.append(rb[db[i]])
    return xs, ys


def cmd_corr(a):
    end = dt.date.fromisoformat(a.to) if a.to else dt.date.today()
    start = end.replace(year=end.year - 11)
    pa, pb = fetch(a.symbols[0], start, end), fetch(a.symbols[1], start, end)
    ra, rb = logret(pa), logret(pb)
    la = a.label[0] if a.label else a.symbols[0]
    lb = a.label[1] if a.label and len(a.label) > 1 else a.symbols[1]
    how = "同じ日" if a.sameday else "米国の当日 × 日本の翌営業日"
    print(f"\n{la} と {lb} の相関係数（{how}、{end} まで）")
    print(f"{'期間':6}{'相関':>9}{'n':>8}")
    for lbl, yrs in [("1年", 1), ("5年", 5), ("10年", 10)]:
        since = end.replace(year=end.year - yrs).isoformat()
        xs, ys = pair(ra, rb, since, a.sameday)
        if len(xs) < 10:
            print(f"{lbl:6}{'データ不足':>9}{len(xs):>8}")
            continue
        print(f"{lbl:6}{corr(xs, ys):>+9.3f}{len(xs):>8}")
    print("\n  ＋1に近いほど同じ向き、0に近いほど関係がない。")
    print("  記事に出すときは、ものさしを添える（BNDと米国債7〜10年は +0.98）。")


def cmd_ret(a):
    start = dt.date.fromisoformat(a.frm)
    end = dt.date.fromisoformat(a.to) if a.to else dt.date.today()
    print(f"\n{start} → {end} の騰落率（終値ベース・分配金は含まない）")
    for s in a.symbols:
        px = fetch(s, start - dt.timedelta(days=10), end)
        k = sorted(px)
        b = [d for d in k if d <= start.isoformat()]
        e = [d for d in k if d <= end.isoformat()]
        if not b or not e:
            print(f"  {s:8} データなし"); continue
        v0, v1 = px[b[-1]], px[e[-1]]
        print(f"  {s:8} {v0:>10,.2f}（{b[-1]}） → {v1:>10,.2f}（{e[-1]}）  {(v1/v0-1)*100:+7.1f}%")


def cmd_px(a):
    end = dt.date.today()
    px = fetch(a.symbols[0], end - dt.timedelta(days=a.last * 3 + 30), end)
    k = sorted(px)[-a.last:]
    print(f"\n{a.symbols[0]} の終値")
    prev = None
    for d in k:
        chg = f"{(px[d]/prev-1)*100:+7.2f}%" if prev else "       "
        print(f"  {d}  {px[d]:>10,.2f}  {chg}")
        prev = px[d]


p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
sub = p.add_subparsers(dest="cmd", required=True)

c = sub.add_parser("corr", help="2銘柄の相関を1年/5年/10年で")
c.add_argument("symbols", nargs=2)
c.add_argument("--label", nargs="*", help="表示名")
c.add_argument("--sameday", action="store_true", help="同じ日どうしで突き合わせる")
c.add_argument("--to", help="終点 YYYY-MM-DD")
c.set_defaults(func=cmd_corr)

r = sub.add_parser("ret", help="期間の騰落率")
r.add_argument("symbols", nargs="+")
r.add_argument("--from", dest="frm", required=True)
r.add_argument("--to")
r.set_defaults(func=cmd_ret)

x = sub.add_parser("px", help="直近の終値を並べる")
x.add_argument("symbols", nargs=1)
x.add_argument("--last", type=int, default=10)
x.set_defaults(func=cmd_px)

a = p.parse_args()
a.func(a)
