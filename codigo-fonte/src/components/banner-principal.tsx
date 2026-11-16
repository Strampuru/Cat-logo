import { Link } from "@tanstack/react-router";
import { Seta } from "@/components/seta";
import { useEffect, useRef, useState } from "react";
import { cicloAtual, DESCONTO, modelosEmPromocao } from "@/lib/promocoes";
import { FIM_NATAL, useAgora } from "@/lib/tempo";
import { TemporizadorPequeno } from "@/components/temporizador";
import { getDestaque } from "@/lib/destaques";

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
  /** Imagem alternativa para telemóvel (<640px). */
  imagemMovel?: string;
  /** "direita": em ecrãs grandes mostra a imagem inteira encostada à direita, a fundir no preto. */
  encaixe?: "direita";
  /** Imagem clara: texto escuro em ecrãs ≥sm. */
  claro?: boolean;
  /** Colagem fixa de fotos (em vez de `imagem`). */
  fotos?: string[];
  /** Mosaico em movimento com as fotos da página «Trabalhos que já fizemos». */
  trabalhos?: boolean;
  /** Colagem automática com os modelos em promoção desta semana. */
  promocao?: boolean;
  /** Cores do fundo provisório (enquanto não há foto). */
  fundo: string;
};

const SLIDES: Slide[] = [
  {
    titulo: "Especial de Natal",
    subtitulo: "Presentes personalizados para a equipa, clientes e família.",
    botao: "Ver especial",
    destino: "natal",
    imagem: "./banner/natal.webp",
    encaixe: "direita",
    fundo: "linear-gradient(120deg, oklch(0.42 0.11 25), oklch(0.32 0.08 150))",
  },
  {
    titulo: "Novidades",
    subtitulo: "Os modelos mais recentes do nosso catálogo.",
    botao: "Ver novidades",
    destino: "novidades",
    imagem: "./banner/novidades-largo.webp",
    imagemMovel: "./lifestyle/torre-bebidas.webp",
    claro: true,
    fundo: "linear-gradient(120deg, oklch(0.62 0.078 58), oklch(0.45 0.05 58))",
  },
  {
    titulo: "Promoções",
    subtitulo: "−10% em 4 modelos escolhidos todas as semanas. Aproveite antes que o tempo acabe.",
    botao: "Ver promoções",
    destino: "promocoes",
    promocao: true,
    fundo: "linear-gradient(120deg, oklch(0.3 0.02 75), oklch(0.5 0.07 58))",
  },
  {
    titulo: "Trabalhos que já fizemos",
    subtitulo: "Inspire-se em projetos que personalizámos para os nossos clientes.",
    botao: "Ver trabalhos",
    destino: "trabalhos",
    trabalhos: true,
    fundo: "linear-gradient(120deg, oklch(0.36 0.06 240), oklch(0.55 0.06 58))",
  },
];

const INTERVALO = 6000;

/** Inclinação de cada foto da colagem (ecrãs ≥xl). */
const INCLINACOES = [
  { r: -7, y: 4 },
  { r: 4, y: -6 },
  { r: -3, y: 6 },
  { r: 6, y: -3 },
  { r: -5, y: 3 },
];


const FOTOS_TRABALHOS = (getDestaque("trabalhos")?.fotos ?? []).map((f) => f.imagem);

/** Três colunas de fotos a deslizar devagar (sentidos alternados). */
function MosaicoTrabalhos({ fotos, fundo }: { fotos: string[]; fundo: string }) {
  const colunas = [0, 1, 2].map((c) => fotos.filter((_, i) => i % 3 === c));
  const coluna = (lista: string[], c: number, grande: boolean) => (
    <div key={c} className={`flex-1 overflow-hidden ${grande && c === 1 ? "pt-10" : ""}`}>
      <div
        className="flex flex-col gap-2 xl:gap-3 motion-reduce:animate-none"
        style={{ animation: `${c % 2 ? "mosaico-descer" : "mosaico-subir"} ${38 + c * 7}s linear infinite` }}
      >
        {[...lista, ...lista].map((f, i) => (
          <img
            key={`${f}-${i}`}
            src={f}
            alt=""
            loading="lazy"
            className={`block w-full aspect-[4/5] object-cover ${grande ? "rounded-md shadow-xl ring-1 ring-white/10" : ""}`}
          />
        ))}
      </div>
    </div>
  );
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: fundo }}>
      {/* Telemóvel e tablet: mosaico de fundo */}
      <div className="absolute inset-0 flex gap-2 xl:hidden">{colunas.map((l, c) => coluna(l, c, false))}</div>
      <div className="absolute inset-0 bg-black/55 xl:hidden" />
      {/* Computador: mosaico à direita, a desvanecer nas pontas */}
      <div className="absolute inset-y-0 right-0 hidden w-[46%] gap-3 pr-[4%] xl:flex [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
        {colunas.map((l, c) => coluna(l, c, true))}
      </div>
      <style>{`@keyframes mosaico-subir{from{transform:translateY(0)}to{transform:translateY(-50%)}}@keyframes mosaico-descer{from{transform:translateY(-50%)}to{transform:translateY(0)}}`}</style>
    </div>
  );
}

function Colagem({ fotos, fundo, selo }: { fotos: string[]; fundo: string; selo?: string }) {
  const grelha = fotos.length <= 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-3 grid-rows-2";
  return (
    <div className="absolute inset-0" style={{ background: fundo }}>
      <div className={`absolute inset-0 grid ${grelha} gap-0.5 xl:hidden`}>
        {fotos.slice(0, 6).map((f) => (
          <img key={f} src={f} alt="" className="h-full w-full object-cover" />
        ))}
        <div className="absolute inset-0 bg-black/45" />
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-[47%] items-center justify-center pr-[5%] xl:flex">
        {fotos.slice(0, INCLINACOES.length).map((f, i) => (
          <div
            key={f}
            className="relative -ml-[3%] w-[22%] shrink-0 rounded-[3px] bg-white p-[0.6%] pb-[2.2%] shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            style={{ transform: `rotate(${INCLINACOES[i].r}deg) translateY(${INCLINACOES[i].y}%)`, zIndex: i + 1 }}
          >
            <img src={f} alt="" className="block aspect-[4/5] w-full object-cover" />
            {selo && (
              <span className="absolute left-[7%] top-[5%] rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground shadow-md">
                {selo}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BannerPrincipal() {
  const [atual, setAtual] = useState(0);
  const [pausa, setPausa] = useState(false);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const arrastou = useRef(false);
  // O banner do Especial de Natal desaparece quando a campanha acaba
  const agora = useAgora(30_000);
  const slides = SLIDES.filter((s) => s.destino !== "natal" || agora < FIM_NATAL);
  const total = slides.length;
  const [fotosPromo, setFotosPromo] = useState<string[]>([]);

  useEffect(() => {
    setFotosPromo(
      modelosEmPromocao()
        .map((m) => m.lifestyle || m.imagem || m.cores[0]?.imagem || "")
        .filter(Boolean),
    );
  }, []);

  const ir = (i: number) => setAtual(((i % total) + total) % total);

  useEffect(() => {
    if (atual >= total) setAtual(0);
  }, [atual, total]);

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
        {slides.map((s, i) => (
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
            {s.promocao && fotosPromo.length > 0 ? (
              <Colagem fotos={fotosPromo} fundo={s.fundo} selo={`−${Math.round(DESCONTO * 100)}%`} />
            ) : s.trabalhos && FOTOS_TRABALHOS.length > 0 ? (
              <MosaicoTrabalhos fotos={FOTOS_TRABALHOS} fundo={s.fundo} />
            ) : s.fotos ? (
              <Colagem fotos={s.fotos} fundo={s.fundo} />
            ) : s.imagem ? (
              <>
                {s.encaixe === "direita" && <div className="absolute inset-0 bg-black" />}
                <picture>
                  {s.imagemMovel && <source media="(max-width: 639px)" srcSet={s.imagemMovel} />}
                  <img
                    src={s.imagem}
                    alt={s.titulo}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.03] ${
                      s.encaixe === "direita"
                        ? "md:object-contain md:object-right md:[mask-image:linear-gradient(to_right,transparent_30%,black_55%)]"
                        : ""
                    }`}
                  />
                </picture>
              </>
            ) : (
              <div className="absolute inset-0" style={{ background: s.fundo }} />
            )}
            {s.claro ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent sm:hidden" />
                <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-[#f6efe3]/70 via-[#f6efe3]/20 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent md:bg-gradient-to-r md:from-black/55 md:via-black/20 md:to-transparent" />
            )}
            <div className="absolute inset-0 flex items-end md:items-center">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-20 md:px-24 pb-16 md:pb-0">
                <div
                  className={`${s.fotos || s.trabalhos ? "max-w-xl xl:max-w-md" : "max-w-xl"} ${
                    s.claro ? "text-white sm:text-[#3b2a1c]" : "text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3 md:mb-5">
                    <span className={`h-px w-8 ${s.claro ? "bg-white/70 sm:bg-[#8a6a4a]" : "bg-white/70"}`} />
                    <span
                      className={`text-[10px] tracking-[0.3em] uppercase font-semibold ${
                        s.claro ? "text-white/85 sm:text-[#7a5a3c]" : "text-white/85"
                      }`}
                    >
                      Strampuru
                    </span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
                    {s.titulo}
                  </h2>
                  <p
                    className={`mt-3 md:mt-5 text-[13px] sm:text-base leading-relaxed max-w-md ${
                      s.claro ? "text-white/85 sm:text-[#5c4330]" : "text-white/85"
                    }`}
                  >
                    {s.subtitulo}
                  </p>
                  {s.trabalhos && FOTOS_TRABALHOS.length > 0 && (
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex -space-x-2.5">
                        {FOTOS_TRABALHOS.slice(0, 4).map((f) => (
                          <img key={f} src={f} alt="" className="size-8 md:size-9 rounded-full object-cover ring-2 ring-white/90" />
                        ))}
                      </div>
                      <span className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-white/90">
                        {FOTOS_TRABALHOS.length} trabalhos reais
                      </span>
                    </div>
                  )}
                  <span className="mt-6 md:mt-8 inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground py-1.5 pl-5 pr-1.5 text-[11px] font-medium uppercase tracking-widest shadow-md transition-colors group-hover:bg-white group-hover:text-foreground">
                    {s.botao}
                    <span className="flex size-8 items-center justify-center rounded-full bg-accent-foreground text-accent transition-transform group-hover:translate-x-0.5">
                      <Seta direcao="direita" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {s.destino === "natal" && (
              <TemporizadorPequeno fim={FIM_NATAL} rotulo="Termina em" style={{ right: 14, bottom: 14 }} />
            )}
            {s.promocao && (
              <TemporizadorPequeno
                fim={cicloAtual(agora).fim}
                rotulo="Termina em"
                cor="var(--accent)"
                style={{ right: 14, bottom: 14 }}
              />
            )}
          </Link>
        ))}

        <button type="button" aria-label="Destaque anterior" onClick={() => ir(atual - 1)} className={`${seta} left-3 md:left-6 hidden sm:flex`}>
          <Seta direcao="esquerda" />
        </button>
        <button type="button" aria-label="Destaque seguinte" onClick={() => ir(atual + 1)} className={`${seta} right-3 md:right-6 hidden sm:flex`}>
          <Seta direcao="direita" />
        </button>

        <div className="absolute bottom-5 md:bottom-7 left-0 right-0 z-20 flex justify-center gap-2.5">
          {slides.map((s, i) => (
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
