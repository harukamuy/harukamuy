export default function BostonTerrierSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* body */}
      <ellipse cx="80" cy="130" rx="44" ry="38" fill="#2e2318" />
      {/* chest white patch */}
      <ellipse cx="80" cy="138" rx="24" ry="22" fill="#f8f4ee" />
      {/* head */}
      <ellipse cx="80" cy="82" rx="42" ry="40" fill="#2e2318" />
      {/* face white */}
      <ellipse cx="80" cy="90" rx="28" ry="26" fill="#f8f4ee" />
      {/* ears */}
      <path d="M42 58 L32 28 L58 50 Z" fill="#2e2318" />
      <path d="M118 58 L128 28 L102 50 Z" fill="#2e2318" />
      {/* eyes */}
      <circle cx="66" cy="80" r="10" fill="#2e2318" />
      <circle cx="94" cy="80" r="10" fill="#2e2318" />
      <circle cx="66" cy="80" r="6" fill="white" />
      <circle cx="94" cy="80" r="6" fill="white" />
      <circle cx="68" cy="79" r="3" fill="#1a1008" />
      <circle cx="96" cy="79" r="3" fill="#1a1008" />
      {/* eye glint */}
      <circle cx="70" cy="77" r="1.5" fill="white" />
      <circle cx="98" cy="77" r="1.5" fill="white" />
      {/* nose */}
      <ellipse cx="80" cy="96" rx="9" ry="6" fill="#2e2318" />
      <ellipse cx="80" cy="96" rx="5" ry="3" fill="#3e3228" />
      {/* nostrils */}
      <circle cx="76" cy="97" r="1.5" fill="#1a1008" />
      <circle cx="84" cy="97" r="1.5" fill="#1a1008" />
      {/* smile */}
      <path d="M70 104 Q80 112 90 104" stroke="#2e2318" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* front paws */}
      <ellipse cx="62" cy="163" rx="14" ry="10" fill="#2e2318" />
      <ellipse cx="98" cy="163" rx="14" ry="10" fill="#2e2318" />
      {/* paw toes left */}
      <circle cx="54" cy="158" r="4" fill="#2e2318" />
      <circle cx="62" cy="155" r="4" fill="#2e2318" />
      <circle cx="70" cy="158" r="4" fill="#2e2318" />
      {/* paw toes right */}
      <circle cx="90" cy="158" r="4" fill="#2e2318" />
      <circle cx="98" cy="155" r="4" fill="#2e2318" />
      <circle cx="106" cy="158" r="4" fill="#2e2318" />
      {/* collar */}
      <rect x="50" y="114" width="60" height="10" rx="5" fill="#c4674a" />
      <circle cx="80" cy="119" r="4" fill="#e4b840" opacity="0.9" />
      {/* tail */}
      <path d="M124 140 Q140 125 138 110" stroke="#2e2318" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* blush cheeks */}
      <ellipse cx="58" cy="92" rx="7" ry="4" fill="#ebbfb0" opacity="0.5" />
      <ellipse cx="102" cy="92" rx="7" ry="4" fill="#ebbfb0" opacity="0.5" />
    </svg>
  );
}
