import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { ModelCard } from "@/components/model-card";
import { getModeloComNatal } from "@/lib/natal";
import { destaques, getDestaque } from "@/lib/destaques";
import { PaginaPromocoes } from "@/components/pagina-promocoes";
import { BotaoVoltarInicio } from "@/components/botao-voltar-inicio";
import { GaleriaTrabalhos } from "@/components/galeria-trabalhos";
import { ContagemNatal } from "@/components/contagem-natal";
import { FIM_NATAL, useAgora } from "@/lib/tempo";
import { eModeloNatal } from "@/lib/natal";

export const Route = createFileRoute("/destaque/$id")({
  loader: ({ params }) => {
    const destaque = getDestaque(params.id);
    if (!destaque) throw notFound();
    return { destaque };
  },
  head: ({ loaderData }) => {
    const nome = loaderData?.destaque.nome ?? "Destaque";
    return {
      meta: [
        { title: `${nome} — Strampuru` },
        { name: "description", content: loaderData?.destaque.introducao ?? "" },
        { property: "og:title", content: `${nome} — Strampuru` },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: DestaquePage,
});

function DestaquePage() {
  const { destaque } = Route.useLoaderData();
  const agora = useAgora();
  const eNatal = destaque.id === "natal";
  // Quando a campanha de Natal acaba, os artigos de Natal saem (fica só o que é do catálogo normal, ex.: a torre)
  const natalAcabou = eNatal && agora >= FIM_NATAL;
  const visivel = (id: string) => !(natalAcabou && eModeloNatal(id));
  const itens = destaque.modelos
    .filter(visivel)
    .map((id) => getModeloComNatal(id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));
  const outros = destaques.filter((d) => d.id !== destaque.id);

  return (
    <SiteLayout>
      {destaque.id === "promocoes" ? (
        <PaginaPromocoes />
      ) : (
        <>
      <section className="border-b border-border bg-card py-10 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="mb-6 flex gap-4 text-[10px] uppercase tracking-widest text-muted-foreground md:mb-8">
            <Link to="/" className="transition-colors hover:text-foreground">
              Início
            </Link>
            <span>/</span>
            <span className="text-foreground">{destaque.nome}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent" />
            <span className="text-[10px] tracking-[0.3em] text-accent font-semibold uppercase">
              {destaque.etiqueta}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none">
            {destaque.titulo} <span className="italic">{destaque.tituloItalico}</span>
          </h1>
          <p className="mt-5 md:mt-6 max-w-xl text-[13px] sm:text-sm leading-relaxed text-muted-foreground">
            {destaque.introducao}
          </p>
          {destaque.id === "natal" && <ContagemNatal />}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16">
        <div className="mb-8 md:mb-10">
          <BotaoVoltarInicio />
        </div>
        {destaque.fotos && destaque.fotos.length > 0 ? (
          <GaleriaTrabalhos fotos={destaque.fotos} />
        ) : destaque.grupos && destaque.grupos.length > 0 ? (
          <div className="space-y-14 md:space-y-20">
            {destaque.grupos.map((g) => {
              const doGrupo = g.modelos
                .filter(visivel)
                .map((id) => getModeloComNatal(id))
                .filter((m): m is NonNullable<typeof m> => Boolean(m));
              if (doGrupo.length === 0) return null;
              return (
                <div key={g.titulo}>
                  <div className="mb-6 md:mb-8 flex flex-col gap-2 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
                    <h2 className="font-display text-2xl md:text-4xl leading-none">{g.titulo}</h2>
                    {g.descricao && (
                      <p className="max-w-md text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground md:text-right">
                        {g.descricao}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-4">
                    {doGrupo.map((m) => (
                      <ModelCard key={m.id} modelo={m} presente={eNatal && !natalAcabou} fim={eNatal && !natalAcabou ? FIM_NATAL : undefined} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : itens.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-4">
            {itens.map((m) => (
              <ModelCard key={m.id} modelo={m} />
            ))}
          </div>
        ) : (
          <div className="py-16 md:py-24 text-center max-w-md mx-auto">
            <p className="font-display text-2xl md:text-3xl italic">Em preparação</p>
            <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">{destaque.vazio}</p>
            <Link
              to="/contactos"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground py-1.5 pl-5 pr-1.5 text-[11px] font-medium uppercase tracking-widest shadow-sm transition-colors hover:bg-foreground hover:text-background"
            >
              Fale connosco
              <span className="flex size-8 items-center justify-center rounded-full bg-accent-foreground text-accent">→</span>
            </Link>
          </div>
        )}
      </section>

        </>
      )}

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Veja também</p>
          <div className="flex flex-wrap gap-2.5">
            {outros.map((d) => (
              <Link
                key={d.id}
                to="/destaque/$id"
                params={{ id: d.id }}
                className="rounded-full border border-border px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                {d.nome}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
