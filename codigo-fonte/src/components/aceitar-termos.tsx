import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CHAVE = "strampuru-termos-aceites-v1";

function naPaginaLegal() {
  const h = window.location.hash || "";
  const p = window.location.pathname || "";
  return h.startsWith("#/legal/") || p.includes("/legal/");
}

function jaAceitou() {
  try {
    return Boolean(window.localStorage.getItem(CHAVE));
  } catch {
    return false;
  }
}

/**
 * Janela mostrada na primeira visita: o visitante confirma que leu e aceita
 * os Termos e Condições e a Política de Privacidade. Fica guardado no navegador.
 * Não aparece nas próprias páginas legais (para poderem ser lidas).
 */
export function AceitarTermos() {
  const [aberta, setAberta] = useState(false);
  const [marcado, setMarcado] = useState(false);

  useEffect(() => {
    const verificar = () => setAberta(!jaAceitou() && !naPaginaLegal());
    verificar();
    window.addEventListener("hashchange", verificar);
    window.addEventListener("popstate", verificar);
    return () => {
      window.removeEventListener("hashchange", verificar);
      window.removeEventListener("popstate", verificar);
    };
  }, []);

  useEffect(() => {
    if (!aberta) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [aberta]);

  if (!aberta) return null;

  const aceitar = () => {
    try {
      window.localStorage.setItem(CHAVE, new Date().toISOString());
    } catch {
      /* navegador sem armazenamento: aceita só nesta visita */
    }
    setAberta(false);
  };

  const ligacao = "text-accent underline underline-offset-2 hover:text-foreground";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-foreground/60 backdrop-blur-sm p-0 sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="aceitar-termos-titulo"
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-background p-6 sm:p-8 shadow-2xl animate-fade-up"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Bem-vindo à Strampuru</p>
        <h2 id="aceitar-termos-titulo" className="mt-2 font-display text-3xl leading-tight">
          Antes de <span className="italic">continuar</span>
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          Este site é o nosso catálogo. As encomendas são feitas connosco por WhatsApp, Instagram ou email. Para
          continuar, confirme que leu e aceita os nossos termos. O site não usa cookies.
        </p>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 text-[13px] leading-relaxed">
          <input
            type="checkbox"
            checked={marcado}
            onChange={(e) => setMarcado(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
          />
          <span>
            Li e aceito os{" "}
            <Link to="/legal/$pagina" params={{ pagina: "termos" }} className={ligacao}>
              Termos e Condições
            </Link>{" "}
            e a{" "}
            <Link to="/legal/$pagina" params={{ pagina: "privacidade" }} className={ligacao}>
              Política de Privacidade
            </Link>
            .
          </span>
        </label>

        <button
          type="button"
          disabled={!marcado}
          onClick={aceitar}
          className="mt-5 w-full rounded-full bg-accent py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-foreground shadow-md transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent disabled:hover:text-accent-foreground"
        >
          Aceitar e continuar
        </button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Pode consultar estes textos a qualquer momento no fundo da página.
        </p>
      </div>
    </div>,
    document.body,
  );
}
