import { Link } from "@tanstack/react-router";
import { Seta } from "@/components/seta";
import { useEffect, useState } from "react";
import { ModelCard } from "@/components/model-card";
import { BotaoVoltarInicio } from "@/components/botao-voltar-inicio";
import {
  cicloAtual,
  DESCONTO,
  formatarEuros,
  modelosEmPromocao,
  precoMinimo,
} from "@/lib/promocoes";

function useAgora(intervalo = 1000) {
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setAgora(Date.now()), intervalo);
    return () => window.clearInterval(t);
  }, [intervalo]);
  return agora;
}

function Bloco({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-[4.25rem] sm:min-w-[5.5rem] rounded-xl bg-accent text-accent-foreground px-3 py-3 sm:py-4 text-center font-display text-4xl sm:text-6xl leading-none tabular-nums shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        {String(valor).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-background/70">{rotulo}</span>
    </div>
  );
}

export function PaginaPromocoes() {
  const agora = useAgora();
  const { fim } = cicloAtual(agora);
  const itens = modelosEmPromocao(agora);
  const falta = Math.max(0, fim - agora);
  const dias = Math.floor(falta / 86_400_000);
  const horas = Math.floor((falta % 86_400_000) / 3_600_000);
  const minutos = Math.floor((falta % 3_600_000) / 60_000);
  const segundos = Math.floor((falta % 60_000) / 1000);
  const pct = Math.round(DESCONTO * 100);
  const dataFim = new Date(fim - 1).toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" });

  return (
    <>
      {/* Cabeçalho chamativo */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-accent/35 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-accent/25 blur-[90px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(135deg,var(--accent)_0_2px,transparent_2px_22px)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-20">
          <nav className="mb-8 flex gap-4 text-[10px] uppercase tracking-widest text-background/60">
            <Link to="/" className="transition-colors hover:text-background">
              Início
            </Link>
            <span>/</span>
            <span className="text-background">Promoções</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-accent/15 ring-1 ring-accent/50 px-4 py-1.5 mb-6">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent">Só esta semana</span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.9]">
                Promoções <span className="italic text-accent">da semana</span>
              </h1>
              <p className="mt-6 max-w-lg text-[14px] sm:text-base leading-relaxed text-background/80">
                Todas as semanas escolhemos {itens.length} modelos com{" "}
                <strong className="text-accent font-semibold">{pct}% de desconto</strong> em todos os escalões de
                quantidade. Quando o tempo acabar, a seleção muda — aproveite enquanto dura.
              </p>
            </div>

            <div className="relative rounded-3xl bg-background/[0.04] ring-1 ring-background/10 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-background/70">Termina em</span>
                <span className="font-display text-6xl sm:text-7xl leading-none text-accent">−{pct}%</span>
              </div>
              <div className="flex justify-between gap-2 sm:gap-3">
                <Bloco valor={dias} rotulo="Dias" />
                <Bloco valor={horas} rotulo="Horas" />
                <Bloco valor={minutos} rotulo="Min" />
                <Bloco valor={segundos} rotulo="Seg" />
              </div>
              <p className="mt-5 text-[11px] text-background/60 text-center first-letter:uppercase">
                Válido até {dataFim}, às 23:59
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modelos em promoção */}
      <section className="relative bg-accent/10 border-b border-accent/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
          <div className="mb-8 md:mb-10">
            <BotaoVoltarInicio />
          </div>
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12">
            <h2 className="font-display text-3xl md:text-5xl leading-none">
              Em <span className="italic">promoção</span>
            </h2>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent font-semibold">
              {itens.length} modelos · −{pct}%
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
            {itens.map((m) => {
              const min = precoMinimo(m);
              return (
                <div key={m.id} className="relative">
                  <div className="rounded-sm ring-2 ring-accent/70 ring-offset-4 ring-offset-transparent">
                    <ModelCard modelo={m} />
                  </div>
                  {min !== undefined && (
                    <p className="mt-3 flex items-baseline gap-2 text-[12px]">
                      <span className="uppercase tracking-widest text-muted-foreground text-[10px]">desde</span>
                      <span className="line-through text-muted-foreground">{formatarEuros(min)}</span>
                      <span className="font-display text-xl text-accent font-semibold">
                        {formatarEuros(min * (1 - DESCONTO))}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl bg-foreground text-background px-6 py-6 sm:px-8">
            <p className="font-display text-2xl sm:text-3xl leading-tight">
              Quer aproveitar? <span className="italic text-accent">Peça já o seu orçamento.</span>
            </p>
            <Link
              to="/contactos"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-accent text-accent-foreground py-1.5 pl-5 pr-1.5 text-[11px] font-semibold uppercase tracking-widest shadow-md transition-colors hover:bg-background hover:text-foreground"
            >
              Encomendar
              <span className="flex size-9 items-center justify-center rounded-full bg-accent-foreground text-accent transition-transform group-hover:translate-x-0.5">
                <Seta direcao="direita" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
