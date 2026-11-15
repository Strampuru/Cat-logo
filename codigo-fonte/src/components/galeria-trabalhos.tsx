import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Foto = { imagem: string; legenda: string; tipo: string };

const WHATSAPP = "351928253232";

function linkWhatsApp(legenda?: string) {
  const texto = legenda
    ? `Olá! Vi o trabalho «${legenda}» no vosso site e gostava de fazer algo parecido.`
    : "Olá! Vi os vossos trabalhos no site e gostava de pedir um orçamento.";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

/**
 * Galeria interativa da página «Trabalhos que já fizemos»:
 * filtros por tipo de peça, fotos em mosaico e visualizador em ecrã inteiro
 * (setas, teclado, deslizar no telemóvel) com pedido de orçamento direto.
 */
export function GaleriaTrabalhos({ fotos }: { fotos: Foto[] }) {
  const tipos = useMemo(() => {
    const contagem = new Map<string, number>();
    fotos.forEach((f) => contagem.set(f.tipo, (contagem.get(f.tipo) ?? 0) + 1));
    return [...contagem.entries()].sort((a, b) => b[1] - a[1]);
  }, [fotos]);

  const [filtro, setFiltro] = useState<string | null>(null);
  const visiveis = filtro ? fotos.filter((f) => f.tipo === filtro) : fotos;
  const [aberta, setAberta] = useState<number | null>(null);

  const fechar = useCallback(() => setAberta(null), []);
  const mover = useCallback(
    (d: number) => setAberta((i) => (i === null ? i : (i + d + visiveis.length) % visiveis.length)),
    [visiveis.length],
  );

  useEffect(() => {
    if (aberta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", tecla);
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = overflow;
    };
  }, [aberta, fechar, mover]);

  const toque = useRef<number | null>(null);
  const atual = aberta !== null ? visiveis[aberta] : null;

  const chip = (ativo: boolean) =>
    `shrink-0 rounded-full border px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest transition-colors ${
      ativo
        ? "border-accent bg-accent text-accent-foreground"
        : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
    }`;

  return (
    <>
      {/* Filtros */}
      <div className="mb-8 md:mb-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={() => setFiltro(null)} className={chip(filtro === null)}>
          Todos <span className="opacity-70">({fotos.length})</span>
        </button>
        {tipos.map(([tipo, n]) => (
          <button key={tipo} type="button" onClick={() => setFiltro(tipo)} className={chip(filtro === tipo)}>
            {tipo} <span className="opacity-70">({n})</span>
          </button>
        ))}
      </div>

      {/* Mosaico */}
      <div className="columns-2 gap-3 sm:gap-5 md:columns-3">
        {visiveis.map((f, i) => (
          <button
            key={f.imagem}
            type="button"
            onClick={() => setAberta(i)}
            className="group relative mb-3 sm:mb-5 block w-full break-inside-avoid overflow-hidden rounded-sm bg-muted text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent animate-[aparecer_0.5s_ease-out_both]"
            style={{ animationDelay: `${i * 50}ms` }}
            aria-label={`Ver em grande: ${f.legenda}`}
          >
            <img
              src={f.imagem}
              alt={f.legenda}
              loading="lazy"
              className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white sm:translate-y-2 sm:opacity-0 transition-all duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">{f.tipo}</span>
              <p className="mt-1 text-[12px] sm:text-[13px] leading-snug">{f.legenda}</p>
            </div>
            <span className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
                <path strokeLinecap="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {/* Chamada final */}
      <div className="mt-14 md:mt-20 rounded-2xl bg-foreground text-background px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-2xl sm:text-3xl leading-tight">
            Tem uma ideia para a sua marca? <span className="italic text-accent">Nós damos-lhe forma.</span>
          </p>
          <p className="mt-2 text-[13px] text-background/70">Envie-nos a sua ideia e preparamos um orçamento sem compromisso.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground py-1.5 pl-5 pr-1.5 text-[11px] font-semibold uppercase tracking-widest shadow-md transition-colors hover:bg-background hover:text-foreground"
          >
            WhatsApp
            <span className="flex size-8 items-center justify-center rounded-full bg-accent-foreground text-accent">→</span>
          </a>
          <Link
            to="/contactos"
            className="inline-flex items-center rounded-full border border-background/30 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
          >
            Contactos
          </Link>
        </div>
      </div>

      {/* Visualizador */}
      {atual && aberta !== null && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-[#0d0b09] animate-[aparecer_0.25s_ease-out_both]"
          role="dialog"
          aria-modal="true"
          aria-label={atual.legenda}
          onClick={fechar}
          onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (toque.current === null) return;
            const dx = e.changedTouches[0].clientX - toque.current;
            if (Math.abs(dx) > 40) mover(dx < 0 ? 1 : -1);
            toque.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white/80" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] uppercase tracking-[0.25em] tabular-nums">
              {aberta + 1} / {visiveis.length}
            </span>
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-xl transition-colors hover:bg-white/20"
            >
              ×
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 sm:px-20 min-h-0">
            <img
              key={atual.imagem}
              src={atual.imagem}
              alt={atual.legenda}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-sm object-contain shadow-2xl animate-[aparecer_0.3s_ease-out_both]"
            />
            {visiveis.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Trabalho anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    mover(-1);
                  }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 hidden sm:flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Trabalho seguinte"
                  onClick={(e) => {
                    e.stopPropagation();
                    mover(1);
                  }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 hidden sm:flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent"
                >
                  →
                </button>
              </>
            )}
          </div>

          <div
            className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">{atual.tipo}</span>
              <p className="mt-1 font-display text-xl sm:text-2xl leading-tight">{atual.legenda}</p>
            </div>
            <a
              href={linkWhatsApp(atual.legenda)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-accent text-accent-foreground py-1.5 pl-5 pr-1.5 text-[11px] font-semibold uppercase tracking-widest shadow-md transition-colors hover:bg-white hover:text-foreground sm:self-auto"
            >
              Quero algo assim
              <span className="flex size-8 items-center justify-center rounded-full bg-accent-foreground text-accent">→</span>
            </a>
          </div>

          {/* Miniaturas */}
          <div className="hidden sm:flex gap-2 overflow-x-auto px-6 pb-5 justify-center" onClick={(e) => e.stopPropagation()}>
            {visiveis.map((f, i) => (
              <button
                key={f.imagem}
                type="button"
                onClick={() => setAberta(i)}
                aria-label={f.legenda}
                className={`size-14 shrink-0 overflow-hidden rounded-sm transition-all ${
                  i === aberta ? "ring-2 ring-accent opacity-100" : "opacity-40 hover:opacity-80"
                }`}
              >
                <img src={f.imagem} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes aparecer{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </>
  );
}
