/** Fita vermelha com laço no canto do cartão, como num presente (usada só no Especial de Natal). */
export function FitaPresente() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className="pointer-events-none absolute right-0 top-0 z-10"
      style={{ width: "34%", maxWidth: 150, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))" }}
    >
      <defs>
        <linearGradient id="fita-cetim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d7323c" />
          <stop offset="0.5" stopColor="#b3151f" />
          <stop offset="1" stopColor="#8d0f18" />
        </linearGradient>
      </defs>
      {/* faixa diagonal no canto */}
      <path d="M38 0 L58 0 L120 62 L120 82 Z" fill="url(#fita-cetim)" />
      <path d="M44 0 L47 0 L120 73 L120 76 Z" fill="#f2c460" opacity="0.85" />
      {/* pontas do laço */}
      <path d="M84 34 L70 64 L78 60 L82 70 L88 40 Z" fill="#a8121b" />
      <path d="M86 36 L112 58 L104 60 L108 68 L84 42 Z" fill="#a8121b" />
      {/* laços */}
      <path d="M85 37 C66 18 52 30 62 42 C70 52 82 44 85 37 Z" fill="url(#fita-cetim)" />
      <path d="M85 37 C104 18 118 30 108 42 C100 52 88 44 85 37 Z" fill="url(#fita-cetim)" />
      <path d="M67 35 C72 31 79 33 83 37" stroke="#e8545c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M103 35 C98 31 91 33 87 37" stroke="#e8545c" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* nó */}
      <ellipse cx="85" cy="38" rx="7" ry="6" fill="#c41d27" stroke="#8d0f18" strokeWidth="1.2" />
    </svg>
  );
}
