import { useEffect, useState } from "react";

/** Fim da campanha de Natal: 15/12/2026 às 23:59 UTC. */
export const FIM_NATAL = Date.UTC(2026, 11, 15, 23, 59, 0);

/** true enquanto a campanha de Natal está ativa. */
export function natalAtivo(agora = Date.now()) {
  return agora < FIM_NATAL;
}

/** Hora atual que se atualiza sozinha (por omissão, a cada segundo). */
export function useAgora(intervalo = 1000) {
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setAgora(Date.now()), intervalo);
    return () => window.clearInterval(t);
  }, [intervalo]);
  return agora;
}

/** Divide um intervalo (ms) em dias, horas, minutos e segundos. */
export function partesTempo(ms: number) {
  const falta = Math.max(0, ms);
  return {
    dias: Math.floor(falta / 86_400_000),
    horas: Math.floor((falta % 86_400_000) / 3_600_000),
    minutos: Math.floor((falta % 3_600_000) / 60_000),
    segundos: Math.floor((falta % 60_000) / 1000),
  };
}
