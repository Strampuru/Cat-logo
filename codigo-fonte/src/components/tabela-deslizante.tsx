import { useEffect, useRef, useState, type ReactNode } from "react";
import { Seta } from "@/components/seta";

/**
 * Contentor para tabelas largas (ex.: tamanhos).
 * Quando a tabela não cabe, mostra um aviso «Deslize para ver todos os tamanhos»,
 * setas para avançar/recuar e uma barra de deslocamento discreta na cor de destaque.
 */
export function TabelaDeslizante({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [esq, setEsq] = useState(false);
  const [dir, setDir] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const atualizar = () => {
      setEsq(el.scrollLeft > 2);
      setDir(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };
    atualizar();
    el.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(atualizar) : null;
    ro?.observe(el);
    if (el.firstElementChild) ro?.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
      ro?.disconnect();
    };
  }, []);

  const deslizar = (sentido: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: sentido * Math.max(160, el.clientWidth * 0.7), behavior: "smooth" });
  };

  const temMais = esq || dir;
  const seta =
    "absolute top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-accent text-accent-foreground shadow-md flex items-center justify-center text-sm transition-colors hover:bg-accent/85";

  return (
    <div className="space-y-2">
      {temMais && (
        <p className="text-[10px] uppercase tracking-widest text-accent font-medium">
          Deslize para ver todos os tamanhos <Seta direcao="direita" className="size-3.5 -mt-0.5" />
        </p>
      )}
      <div className="relative">
        <div
          ref={ref}
          className={`overflow-x-auto pb-2 [scrollbar-width:thin] [scrollbar-color:var(--accent)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-accent/70 ${className}`}
        >
          {children}
        </div>
        {esq && (
          <button
            type="button"
            onClick={() => deslizar(-1)}
            aria-label="Ver tamanhos anteriores"
            className={`${seta} left-1`}
          >
            <Seta direcao="esquerda" />
          </button>
        )}
        {dir && (
          <button
            type="button"
            onClick={() => deslizar(1)}
            aria-label="Ver mais tamanhos"
            className={`${seta} right-1`}
          >
            <Seta direcao="direita" />
          </button>
        )}
      </div>
    </div>
  );
}
