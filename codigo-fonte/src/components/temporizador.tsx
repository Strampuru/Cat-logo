import type { CSSProperties } from "react";
import { partesTempo, useAgora } from "@/lib/tempo";

const dois = (n: number) => String(n).padStart(2, "0");

/** Temporizador pequeno (ex.: «⏱ 30d 07:43:12»). Desaparece quando o tempo acaba. */
export function TemporizadorPequeno({
  fim,
  rotulo,
  cor = "#b3151f",
  style,
}: {
  fim: number;
  rotulo?: string;
  cor?: string;
  style?: CSSProperties;
}) {
  const agora = useAgora();
  const falta = fim - agora;
  if (falta <= 0) return null;
  const { dias, horas, minutos, segundos } = partesTempo(falta);
  return (
    <span
      className="pointer-events-none absolute z-20 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tabular-nums shadow-md"
      style={{ background: cor, color: "#fff", letterSpacing: "0.04em", ...style }}
      aria-label={`${rotulo ? rotulo + " " : ""}${dias} dias, ${horas} horas, ${minutos} minutos`}
    >
      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9 2h6" strokeLinecap="round" />
      </svg>
      {rotulo && <span style={{ fontWeight: 500, opacity: 0.9 }}>{rotulo}</span>}
      <span>
        {dias > 0 ? `${dias}d ` : ""}
        {dois(horas)}:{dois(minutos)}:{dois(segundos)}
      </span>
    </span>
  );
}
