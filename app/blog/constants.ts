// 一度に表示する記事数（「もっと見る」で増える）。
// サーバー側（page.tsx）とブラウザ側（BlogClient / BlogView）の両方から読むので、
// "use client" のファイルには置かない。置くとサーバーからは値が読めず0件になる。
export const PAGE_SIZE = 24;
