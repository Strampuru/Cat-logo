import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/site-layout";
import { BotaoVoltarInicio } from "@/components/botao-voltar-inicio";
import { ATUALIZADO_EM, getPaginaLegal, paginasLegais } from "@/lib/legal";

export const Route = createFileRoute("/legal/$pagina")({
  loader: ({ params }) => {
    const pagina = getPaginaLegal(params.pagina);
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: ({ loaderData }) => {
    const nome = loaderData?.pagina.nome ?? "Informação legal";
    return {
      meta: [
        { title: `${nome} — Strampuru` },
        { name: "description", content: loaderData?.pagina.introducao ?? "" },
      ],
    };
  },
  component: PaginaLegalView,
});

/** Transforma endereços (www…, https://…, emails) em links clicáveis. */
function comLinks(texto: string): ReactNode[] {
  const partes = texto.split(/((?:https?:\/\/|www\.)[^\s,;)]+[^\s,;).]|[\w.+-]+@[\w-]+\.[\w.]+[\w])/g);
  return partes.map((p, i) => {
    if (/^(https?:\/\/|www\.)/.test(p)) {
      const href = p.startsWith("http") ? p : `https://${p}`;
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-foreground">
          {p}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(p)) {
      return (
        <a key={i} href={`mailto:${p}`} className="text-accent underline underline-offset-2 hover:text-foreground">
          {p}
        </a>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function PaginaLegalView() {
  const { pagina } = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="border-b border-border bg-card py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 flex gap-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              Início
            </Link>
            <span>/</span>
            <span className="text-foreground">{pagina.nome}</span>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight">{pagina.titulo}</h1>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">{pagina.introducao}</p>
          <p className="mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">Atualizado em {ATUALIZADO_EM}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-10 md:py-14">
        <div className="mb-8">
          <BotaoVoltarInicio />
        </div>
        <div className="space-y-9">
          {pagina.seccoes.map((s) => (
            <div key={s.titulo}>
              <h2 className="font-display text-2xl leading-tight">{s.titulo}</h2>
              <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-foreground/85">
                {s.paragrafos.map((p, i) => (
                  <p key={i}>{comLinks(p)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Informação legal</p>
          <div className="flex flex-wrap gap-2.5">
            {paginasLegais
              .filter((p) => p.id !== pagina.id)
              .map((p) => (
                <Link
                  key={p.id}
                  to="/legal/$pagina"
                  params={{ pagina: p.id }}
                  className="rounded-full border border-border px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  {p.nome}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
