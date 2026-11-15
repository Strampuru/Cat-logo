import { FIM_NATAL, useAgora } from "@/lib/tempo";

const VERMELHO = "#b3151f";

function Bloco({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="min-w-[4.25rem] sm:min-w-[5.5rem] rounded-xl px-3 py-3 sm:py-4 text-center font-display text-4xl sm:text-6xl leading-none tabular-nums ring-1 ring-white/10"
        style={{ background: VERMELHO, color: "#fff", boxShadow: "0 10px 30px -8px rgba(120,10,20,0.55)" }}
      >
        {String(valor).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{rotulo}</span>
    </div>
  );
}

/** Contagem decrescente do Especial de Natal. */
export function ContagemNatal() {
  const agora = useAgora();
  const falta = Math.max(0, FIM_NATAL - agora);
  if (falta === 0) {
    return (
      <p className="mt-8 text-[13px] text-muted-foreground">
        A campanha de Natal terminou. Fale connosco para encomendas especiais.
      </p>
    );
  }
  const dias = Math.floor(falta / 86_400_000);
  const horas = Math.floor((falta % 86_400_000) / 3_600_000);
  const minutos = Math.floor((falta % 3_600_000) / 60_000);
  const segundos = Math.floor((falta % 60_000) / 1000);
  return (
    <div className="mt-8 inline-block rounded-3xl p-6 sm:p-8 ring-1 ring-black/5" style={{ background: "rgba(179,21,31,0.06)" }}>
      <span className="block mb-5 text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: VERMELHO }}>
        Encomendas de Natal terminam em
      </span>
      <div className="flex justify-between gap-2 sm:gap-3">
        <Bloco valor={dias} rotulo="Dias" />
        <Bloco valor={horas} rotulo="Horas" />
        <Bloco valor={minutos} rotulo="Min" />
        <Bloco valor={segundos} rotulo="Seg" />
      </div>
      <p className="mt-5 text-[11px] text-muted-foreground text-center">Até 15 de dezembro de 2026, às 23:59 (UTC)</p>
    </div>
  );
}
