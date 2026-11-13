import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/**
 * Banner rotativo da página principal.
 * Para trocar uma imagem: ponha a foto em public/banner/ e indique o caminho em `imagem`
 * (ex.: "./banner/natal.jpg"). Sem imagem, mostra um fundo provisório com o título.
 * `destino` é o id da página de destaque (src/lib/destaques.ts) para onde o banner leva.
 */
type Slide = {
  titulo: string;
  subtitulo: string;
  botao: string;
  destino: string;
  imagem?: string;
  /** Cores do fundo provisório (enquanto não há foto). */
  fundo: string;
};

const SLIDES: Slide[] = [
  {
    titulo: "Especial de Natal",
    subtitulo: "Presentes personalizados para a equipa, clientes e família.",
    botao: "Ver especial",
    destino: "natal",
    fundo: "linear-gradient(120deg, oklch(0.42 0.11 25), oklch(0.32 0.08 150))",
  },
  {
    titulo: "Novidades",
    subtitulo: "Os modelos mais recentes do nosso catálogo.",
    botao: "Ver novidades",
    destino: "novidades",
    fundo: "linear-gradient(120deg, oklch(0.62 0.078 58), oklch(0.45 0.05 58))",
  },
  {
    titulo: "Promoções",
    subtitulo: "−10% em 4 modelos escolhidos todas as semanas. Aproveite antes que o tempo acabe.",
    botao: "Ver promoções",
    destino: "promocoes",
    fundo: "linear-gradient(120deg, oklch(0.3 0.02 75), oklch(0.5 0.07 58))",
  },
  {
    titulo: "Trabalhos que já fizemos",
    subtitulo: "Inspire-se em projetos que personalizámos para os nossos clientes.",
    botao: "Ver trabalhos",
    destino: "trabalhos",
    fundo: "linear-gradient(120deg, oklch(0.36 0.06 240), oklch(0.55 0.06 58))",
  },
];

const INTERVALO = 6000;

export function BannerPrincipal() {
  const [atual, setAtual] = useState(0);
  const [pausa, setPausa] = useState(false);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const arrastou = useRef(false);
  const total = SLIDES.length;

  const ir = (i: number) => setAtual(((i % total) + total) % total);

  useEffect(() => {
    if (pausa) return;
    const t = window.setTimeout(() => ir(atual + 1), INTERVALO);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atual, pausa]);

  const seta =
    "absolute top-1/2 -translate-y-1/2 z-20 size-10 md:size-12 rounded-full bg-background/85 backdrop-blur text-foreground shadow-md flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground";

  return (
    <section
      className="relative w-full overflow-hidden bg-foreground"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        toque.current = { x: t.clientX, y: t.clientY };
        arrastou.current = false;
        setPausa(true);
      }}
      onTouchEnd={(e) => {
        const s = toque.current;
        const t = e.changedTouches[0];
        if (s) {
          const dx = t.clientX - s.x;
          const dy = t.clientY - s.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            arrastou.current = true;
            ir(atual + (dx < 0 ? 1 : -1));
          }
        }
        toque.current = null;
        setPausa(false);
      }}
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] w-full">
        {SLIDES.map((s, i) => (
          <Link
            key={s.titulo}
            to="/destaque/$id"
            params={{ id: s.destino }}
            onClick={(e) => {
              if (arrastou.current) {
                e.preventDefault();
                arrastou.current = false;
              }
            }}
            aria-hidden={i !== atual}
            tabIndex={i === atual ? 0 : -1}
            className={`group absolute inset-0 block transition-opacity duration-700 ease-out ${
              i === atual ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {s.imagem ? (
              <img
                src={s.imagem}
                alt={s.titulo}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: s.fundo }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent md:bg-gradient-to-r md:from-black/55 md:via-black/20 md:to-transparent" />
            <div className="absolute inset-0 flex items-end md:items-center">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-20 md:px-24 pb-16 md:pb-0">
                <div className="max-w-xl text-white">
                  <div className="flex items-center gap-3 mb-3 md:mb-5">
                    <span className="h-px w-8 bg-white/70" />
                    <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-white/85">
                      Strampuru
                    </span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
                    {s.titulo}
                  </h2>
                  <p className="mt-3 md:mt-5 text-[13px] sm:text-base text-white/85 leading-relaxed max-w-md">
                    {s.subtitulo}
                  </p>
                  <span className="mt-6 md:mt-8 inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground py-1.5 pl-5 pr-1.5 text-[11px] font-medium uppercase tracking-widest shadow-md transition-colors group-hover:bg-white group-hover:text-foreground">
                    {s.botao}
                    <span className="flex size-8 items-center justify-center rounded-full bg-accent-foreground text-accent transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <button type="button" aria-label="Destaque anterior" onClick={() => ir(atual - 1)} className={`${seta} left-3 md:left-6 hidden sm:flex`}>
          ←
        </button>
        <button type="button" aria-label="Destaque seguinte" onClick={() => ir(atual + 1)} className={`${seta} right-3 md:right-6 hidden sm:flex`}>
          →
        </button>

        <div className="absolute bottom-5 md:bottom-7 left-0 right-0 z-20 flex justify-center gap-2.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.titulo}
              type="button"
              aria-label={`Ver ${s.titulo}`}
              aria-current={i === atual}
              onClick={() => ir(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === atual ? "w-8 bg-accent" : "w-3 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
