import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Seta } from "@/components/seta";

export type FotoZoom = { src: string; alt: string };

const MIN = 1;
const MAX = 4;

/**
 * Visualizador em ecrã inteiro com zoom.
 * Computador: roda do rato ou duplo clique para aproximar, arrastar para mover, setas do teclado, Esc fecha.
 * Telemóvel: beliscar (dois dedos) ou toque duplo para aproximar, arrastar para mover, deslizar para mudar de foto.
 */
export function VisualizadorZoom({
  fotos,
  inicio,
  onFechar,
}: {
  fotos: FotoZoom[];
  inicio: number;
  onFechar: () => void;
}) {
  const [indice, setIndice] = useState(inicio);
  const [escala, setEscala] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const area = useRef<HTMLDivElement>(null);
  const ponteiros = useRef(new Map<number, { x: number; y: number }>());
  const gesto = useRef<{
    tipo: "nenhum" | "mover" | "beliscar";
    inicioX: number;
    inicioY: number;
    posInicial: { x: number; y: number };
    distInicial: number;
    escalaInicial: number;
    moveu: boolean;
  }>({ tipo: "nenhum", inicioX: 0, inicioY: 0, posInicial: { x: 0, y: 0 }, distInicial: 0, escalaInicial: 1, moveu: false });
  const ultimoToque = useRef(0);

  const total = fotos.length;
  const foto = fotos[indice];

  const escalaRef = useRef(1);
  const posRef = useRef({ x: 0, y: 0 });
  const definir = useCallback((e: number, p: { x: number; y: number }) => {
    escalaRef.current = e;
    posRef.current = p;
    setEscala(e);
    setPos(p);
  }, []);

  const repor = useCallback(() => definir(1, { x: 0, y: 0 }), [definir]);

  const mudar = useCallback(
    (d: number) => {
      if (total < 2) return;
      setIndice((i) => (i + d + total) % total);
      repor();
    },
    [total, repor],
  );

  const limitar = useCallback((p: { x: number; y: number }, e: number) => {
    const el = area.current;
    if (!el || e <= 1) return { x: 0, y: 0 };
    const maxX = (el.clientWidth * (e - 1)) / 2;
    const maxY = (el.clientHeight * (e - 1)) / 2;
    return { x: Math.max(-maxX, Math.min(maxX, p.x)), y: Math.max(-maxY, Math.min(maxY, p.y)) };
  }, []);

  const aplicarZoom = useCallback(
    (nova: number, cx?: number, cy?: number) => {
      const e = Math.max(MIN, Math.min(MAX, nova));
      const antiga = escalaRef.current;
      const p = posRef.current;
      const el = area.current;
      if (e === 1) return definir(1, { x: 0, y: 0 });
      if (!el || cx === undefined || cy === undefined) return definir(e, limitar({ x: p.x * (e / antiga), y: p.y * (e / antiga) }, e));
      // aproxima no ponto onde está o rato/dedos
      const r = el.getBoundingClientRect();
      const ox = cx - r.left - r.width / 2;
      const oy = cy - r.top - r.height / 2;
      const k = e / antiga;
      definir(e, limitar({ x: ox - (ox - p.x) * k, y: oy - (oy - p.y) * k }, e));
    },
    [limitar, definir],
  );

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
      if (e.key === "ArrowRight") mudar(1);
      if (e.key === "ArrowLeft") mudar(-1);
      if (e.key === "+" || e.key === "=") aplicarZoom(escala + 0.5);
      if (e.key === "-") aplicarZoom(escala - 0.5);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", tecla);
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = overflow;
    };
  }, [onFechar, mudar, aplicarZoom, escala]);

  // Roda do rato (precisa de passive:false para não fazer scroll à página)
  useEffect(() => {
    const el = area.current;
    if (!el) return;
    const roda = (e: WheelEvent) => {
      e.preventDefault();
      aplicarZoom(escalaRef.current * (e.deltaY < 0 ? 1.2 : 1 / 1.2), e.clientX, e.clientY);
    };
    el.addEventListener("wheel", roda, { passive: false });
    return () => el.removeEventListener("wheel", roda);
  }, [aplicarZoom]);

  const distancia = () => {
    const [a, b] = [...ponteiros.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const centro = () => {
    const [a, b] = [...ponteiros.current.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    ponteiros.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ponteiros.current.size === 2) {
      gesto.current = { ...gesto.current, tipo: "beliscar", distInicial: distancia(), escalaInicial: escalaRef.current, moveu: true };
    } else if (ponteiros.current.size === 1) {
      gesto.current = {
        tipo: "mover",
        inicioX: e.clientX,
        inicioY: e.clientY,
        posInicial: posRef.current,
        distInicial: 0,
        escalaInicial: escala,
        moveu: false,
      };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!ponteiros.current.has(e.pointerId)) return;
    ponteiros.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesto.current;
    if (g.tipo === "beliscar" && ponteiros.current.size >= 2) {
      const c = centro();
      aplicarZoom((g.escalaInicial * distancia()) / (g.distInicial || 1), c.x, c.y);
    } else if (g.tipo === "mover") {
      const dx = e.clientX - g.inicioX;
      const dy = e.clientY - g.inicioY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) g.moveu = true;
      if (escalaRef.current > 1) definir(escalaRef.current, limitar({ x: g.posInicial.x + dx, y: g.posInicial.y + dy }, escalaRef.current));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const g = gesto.current;
    ponteiros.current.delete(e.pointerId);
    if (ponteiros.current.size > 0) return;
    if (g.tipo === "mover") {
      const dx = e.clientX - g.inicioX;
      const dy = e.clientY - g.inicioY;
      if (escalaRef.current === 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        mudar(dx < 0 ? 1 : -1);
      } else if (!g.moveu) {
        // toque/clique duplo: alterna o zoom
        const agora = Date.now();
        if (agora - ultimoToque.current < 300) {
          if (escalaRef.current > 1) repor();
          else aplicarZoom(2.5, e.clientX, e.clientY);
          ultimoToque.current = 0;
        } else {
          ultimoToque.current = agora;
        }
      }
    }
    gesto.current = { ...g, tipo: "nenhum" };
  };

  const botao =
    "flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-30 disabled:hover:bg-white/10";

  return createPortal(
    <div className="fixed inset-0 z-[90] flex flex-col bg-[#0d0b09]" role="dialog" aria-modal="true" aria-label="Ver imagem em grande">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 text-white/80">
        <span className="text-[11px] uppercase tracking-[0.25em] tabular-nums">
          {total > 1 ? `${indice + 1} / ${total}` : ""}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Afastar" onClick={() => aplicarZoom(escala - 0.5)} disabled={escala <= MIN} className={botao}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-5">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M8 11h6M16 16l4.5 4.5" />
            </svg>
          </button>
          <span className="w-12 text-center text-[11px] tabular-nums">{Math.round(escala * 100)}%</span>
          <button type="button" aria-label="Aproximar" onClick={() => aplicarZoom(escala + 0.5)} disabled={escala >= MAX} className={botao}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-5">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M8 11h6M11 8v6M16 16l4.5 4.5" />
            </svg>
          </button>
          <button type="button" aria-label="Fechar" onClick={onFechar} className={`${botao} ml-2 text-xl`}>
            ×
          </button>
        </div>
      </div>

      <div
        ref={area}
        className="relative flex-1 min-h-0 overflow-hidden select-none"
        style={{ touchAction: "none", cursor: escala > 1 ? "grab" : "zoom-in" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {foto && (
          <img
            key={foto.src}
            src={foto.src}
            alt={foto.alt}
            draggable={false}
            className="absolute inset-0 m-auto max-h-full max-w-full object-contain p-2 sm:p-6"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${escala})`,
              transition: gesto.current.tipo === "nenhum" ? "transform 0.2s ease-out" : "none",
            }}
          />
        )}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagem anterior"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => mudar(-1)}
              className={`${botao} !bg-black/50 backdrop-blur hover:!bg-accent absolute left-3 sm:left-6 top-1/2 -translate-y-1/2`}
            >
              <Seta direcao="esquerda" />
            </button>
            <button
              type="button"
              aria-label="Imagem seguinte"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => mudar(1)}
              className={`${botao} !bg-black/50 backdrop-blur hover:!bg-accent absolute right-3 sm:right-6 top-1/2 -translate-y-1/2`}
            >
              <Seta direcao="direita" />
            </button>
          </>
        )}
      </div>

      <p className="px-4 py-3 text-center text-[11px] text-white/50">
        <span className="hidden sm:inline">Roda do rato ou duplo clique para aproximar · arraste para mover</span>
        <span className="sm:hidden">Afaste dois dedos ou toque duas vezes para aproximar</span>
      </p>
    </div>,
    document.body,
  );
}

/** Botão pequeno de lupa, para pôr no canto das fotos. */
export function BotaoLupa({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Ver imagem em grande"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-background/85 backdrop-blur ring-1 ring-black/10 text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-5">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M8 11h6M11 8v6M16 16l4.5 4.5" />
      </svg>
    </button>
  );
}
