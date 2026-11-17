import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { CatalogoSidebar } from "@/components/catalogo-sidebar";
import { PesquisaModelos } from "@/components/pesquisa-modelos";
import logo from "@/assets/strampuru-logo.png.asset.json";
import { AvisoEncomenda } from "@/components/aviso-encomenda";
import { AceitarTermos } from "@/components/aceitar-termos";
import { CACCL, CNIACC, FRASE_IVA, LIVRO_RECLAMACOES, VENDEDOR, paginasLegais } from "@/lib/legal";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/20 font-sans flex flex-col">
      <CatalogoSidebar
        aberta={menuAberto}
        onFechar={() => setMenuAberto(false)}
      />

      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
          <button
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir categorias"
            className="flex items-center gap-3 min-h-11 -ml-2 pl-2 pr-1 text-muted-foreground hover:text-accent transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.25em]">
              Categorias
            </span>
          </button>

          <Link to="/" className="flex items-center gap-3 whitespace-nowrap">
            <img
              src={logo.url}
              alt="Logótipo Strampuru"
              width={56}
              height={56}
              className="h-10 w-auto md:h-14"
            />
            <span className="sr-only">Strampuru</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">
            <PesquisaModelos />
            <Link
              to="/contactos"
              className="text-muted-foreground hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              Contactos
            </Link>
            <a
              href="https://wa.me/351928253232"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline text-muted-foreground hover:text-accent transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border py-14 md:py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12">
          <div className="space-y-5 md:space-y-6 w-full">
            <img
              src={logo.url}
              alt="Logótipo Stram Puru"
              width={200}
              height={200}
              loading="lazy"
              className="h-16 md:h-24 w-auto"
            />
            <div className="flex w-full items-start justify-between gap-8 sm:gap-16">
              <div className="max-w-xs space-y-2">
                <p className="font-display text-2xl italic leading-none text-accent">Personaliza-me.</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest leading-loose">
                  Peças pensadas ao pormenor, prontas a ganhar a sua marca.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/strampuru_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Strampuru"
                className="flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://wa.me/351928253232"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Strampuru"
                className="flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8.5 8.3c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.3-.1.5.2.4.7 1.1 1.3 1.6.8.7 1.4.9 1.6 1 .2.1.4 0 .5-.1l.5-.6c.2-.2.3-.2.5-.1l1.7.8c.2.1.3.3.3.4 0 .6-.3 1.2-.7 1.4-.5.3-1.4.6-2.6.2-1.5-.5-2.9-1.4-4-2.8-.6-.8-1.2-1.8-1.3-2.6-.1-.8 0-1.4.2-1.8z"
                  />
                </svg>
              </a>
              <a
                href="mailto:Strampuru@gmail.com"
                aria-label="Email da Strampuru"
                className="flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3.5 6.5l8.5 6 8.5-6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Informação legal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 md:mt-16 border-t border-border pt-8 md:pt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-foreground">Informação legal</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {paginasLegais.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/legal/$pagina"
                    params={{ pagina: p.id }}
                    className="hover:text-accent transition-colors"
                  >
                    {p.nome}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[11px] leading-relaxed text-muted-foreground max-w-xl">
              {VENDEDOR.marca} · {VENDEDOR.nome} · NIF {VENDEDOR.nif} · {VENDEDOR.morada} ·{" "}
              <a href={`mailto:${VENDEDOR.email}`} className="hover:text-accent transition-colors">
                {VENDEDOR.email}
              </a>
            </p>
            <p className="text-[11px] leading-relaxed text-muted-foreground max-w-xl">
              {FRASE_IVA} Em caso de litígio de consumo pode recorrer ao{" "}
              <a href={CACCL.site} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-accent">
                Centro de Arbitragem de Lisboa
              </a>{" "}
              ou ao{" "}
              <a href={CNIACC.site} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-accent">
                CNIACC
              </a>{" "}
              (entidades de Resolução Alternativa de Litígios de Consumo).
            </p>
          </div>
          <a
            href={LIVRO_RECLAMACOES}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 self-start justify-self-start md:justify-self-end rounded-xl border border-border bg-background px-5 py-4 transition-colors hover:border-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-8 shrink-0 text-[#c8102e]">
              <path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5z" />
              <path d="M4 20.5A2.5 2.5 0 016.5 18H20v3H6.5A2.5 2.5 0 014 20.5z" />
              <path d="M9 8h7M9 11h5" />
            </svg>
            <span>
              <span className="block text-[13px] font-semibold leading-tight text-foreground group-hover:text-accent">Livro de Reclamações</span>
              <span className="block text-[11px] text-muted-foreground">Eletrónico · livroreclamacoes.pt</span>
            </span>
          </a>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 text-[10px] uppercase tracking-widest text-muted-foreground">
          &copy; {new Date().getFullYear()} Strampuru. Todos os direitos
          reservados.
        </div>
      </footer>
      <AvisoEncomenda />
      <AceitarTermos />
    </div>
  );
}
