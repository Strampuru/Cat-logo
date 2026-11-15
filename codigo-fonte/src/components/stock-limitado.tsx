import type { CSSProperties } from "react";

const ANIM = `
@keyframes stock-pulso { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,176,32,.7); } 50% { transform: scale(1.04); box-shadow: 0 0 0 6px rgba(255,176,32,0); } }
@keyframes stock-ponto { 0%,100% { opacity: 1; } 50% { opacity: .25; } }
`;

function Ponto() {
  return (
    <span
      aria-hidden
      style={{
        width: 7,
        height: 7,
        borderRadius: 999,
        background: "#fff",
        display: "inline-block",
        animation: "stock-ponto 1s ease-in-out infinite",
        flex: "none",
      }}
    />
  );
}

/** Selo pequeno e chamativo para os cartões: «Stock limitado». */
export function SeloStockLimitado({ style }: { style?: CSSProperties }) {
  return (
    <>
      <style>{ANIM}</style>
      <span
        style={{
          position: "absolute",
          left: 10,
          bottom: 42,
          zIndex: 11,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 10px",
          borderRadius: 999,
          background: "linear-gradient(135deg,#ff7a00,#e0001b)",
          color: "#fff",
          fontSize: "clamp(8.5px, 2.3vw, 10px)",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          animation: "stock-pulso 1.6s ease-in-out infinite",
          ...style,
        }}
      >
        <Ponto />
        Stock limitado
      </span>
    </>
  );
}

/** Aviso grande na página do modelo. */
export function AvisoStockLimitado() {
  return (
    <>
      <style>{ANIM}</style>
      <div
        role="note"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 16px",
          borderRadius: 10,
          background: "linear-gradient(135deg,#ff7a00,#e0001b)",
          color: "#fff",
          boxShadow: "0 10px 24px -12px rgba(224,0,27,.6)",
          animation: "stock-pulso 2s ease-in-out infinite",
        }}
      >
        <span aria-hidden style={{ fontSize: 26, lineHeight: 1 }}>
          ⚡
        </span>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <Ponto /> Stock limitado
          </div>
          <div style={{ fontSize: 12.5, marginTop: 3, opacity: 0.95 }}>
            Unidades limitadas para este Natal — quando esgotarem, não voltam. Garanta já as suas!
          </div>
        </div>
      </div>
    </>
  );
}
