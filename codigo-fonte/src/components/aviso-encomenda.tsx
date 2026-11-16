import { Link } from "@tanstack/react-router";
import { Seta } from "@/components/seta";
import { useEffect, useState } from "react";

/**
 * Aviso «Encomende já» no canto inferior direito.
 * Aparece ao fim de ~20 s no site; se for fechado, volta a aparecer
 * quando a pessoa já estiver no site há mais de 4 minutos. Depois disso
 * (ou se a pessoa carregar no botão) não volta a aparecer nesta visita.
 */
const PRIMEIRO_MS = 20_000;
const SEGUNDO_MS = 4 * 60_000;
const CHAVE = "strampuru-aviso-encomenda";

declare global {
  interface Window {
    __strampuruInicio?: number;
  }
}

function lerFase(): number {
  try {
    return Number(sessionStorage.getItem(CHAVE) ?? "0") || 0;
  } catch {
    return 0;
  }
}
function gravarFase(f: number) {
  try {
    sessionStorage.setItem(CHAVE, String(f));
  } catch {
    /* sem armazenamento: o aviso funciona na mesma nesta página */
  }
}
function inicioVisita(): number {
  if (!window.__strampuruInicio) {
    let guardado = 0;
    try {
      guardado = Number(sessionStorage.getItem(CHAVE + "-inicio") ?? "0");
    } catch {
      /* ignora */
    }
    window.__strampuruInicio = guardado || Date.now();
    try {
      sessionStorage.setItem(CHAVE + "-inicio", String(window.__strampuruInicio));
    } catch {
      /* ignora */
    }
  }
  return window.__strampuruInicio;
}

export function AvisoEncomenda() {
  const [visivel, setVisivel] = useState(false);
  const [fase, setFase] = useState(0);

  useEffect(() => {
    const f = lerFase();
    setFase(f);
    if (f >= 2) return;
    // Na página de contactos não faz sentido mostrar o aviso
    if (window.location.hash.startsWith("#/contactos")) return;
    const alvo = f === 0 ? PRIMEIRO_MS : SEGUNDO_MS;
    const falta = Math.max(0, inicioVisita() + alvo - Date.now());
    const t = window.setTimeout(() => setVisivel(true), falta);
    return () => window.clearTimeout(t);
  }, []);

  const fechar = () => {
    setVisivel(false);
    const nova = fase + 1;
    setFase(nova);
    gravarFase(nova);
    if (nova < 2) {
      const falta = Math.max(0, inicioVisita() + SEGUNDO_MS - Date.now());
      window.setTimeout(() => {
        if (lerFase() < 2) setVisivel(true);
      }, Math.max(falta, 5_000));
    }
  };

  const encomendar = () => {
    setVisivel(false);
    setFase(2);
    gravarFase(2);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Encomende já"
      aria-hidden={!visivel}
      className={`fixed z-[55] bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[22rem] transition-all duration-700 ease-[cubic-bezier(.2,1.4,.4,1)] ${
        visivel ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-foreground text-background shadow-[0_20px_60px_-10px_rgba(0,0,0,0.45)] ring-1 ring-accent/40">
        {/* brilho bronze */}
        <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-accent/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 size-40 rounded-full bg-accent/20 blur-3xl" />

        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar aviso"
          className="absolute top-3 right-3 z-10 size-8 rounded-full flex items-center justify-center text-background/70 hover:text-background hover:bg-background/10 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
            <path strokeWidth="1.8" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent">
              Personalize com a sua marca
            </span>
          </div>

          <p className="font-display text-3xl sm:text-4xl leading-none">
            Encomende <span className="italic text-accent">já!</span>
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-background/75 pr-4">
            Peça o seu orçamento sem compromisso. Respondemos rapidamente e ajudamos a escolher as peças certas.
          </p>

          <Link
            to="/contactos"
            onClick={encomendar}
            className="group mt-5 flex items-center justify-between gap-3 rounded-full bg-accent py-1.5 pl-5 pr-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent-foreground shadow-lg transition-colors hover:bg-background hover:text-foreground"
          >
            Pedir orçamento
            <span className="flex size-9 items-center justify-center rounded-full bg-accent-foreground text-accent transition-transform group-hover:translate-x-0.5">
              <Seta direcao="direita" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
