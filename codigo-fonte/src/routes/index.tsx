import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { BannerPrincipal } from "@/components/banner-principal";
import { CatalogoInicio } from "@/components/catalogo-inicio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strampuru — Vestuário e brindes personalizados" },
      {
        name: "description",
        content:
          "Strampuru: t-shirts, polos, sweats, casacos e brindes personalizados com o seu logótipo, nome ou imagem. Catálogo com cores, tamanhos e preços por quantidade. Encomendas por WhatsApp, Instagram ou email.",
      },
      { property: "og:title", content: "Strampuru — Vestuário e brindes personalizados" },
      {
        property: "og:description",
        content:
          "T-shirts, polos, sweats, casacos e brindes personalizados com o seu logótipo. Veja o catálogo e encomende por WhatsApp, Instagram ou email.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <BannerPrincipal />

      <CatalogoInicio />

      {/* Sobre nós */}
      <section
        id="sobre-nos"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-32 grid md:grid-cols-2 gap-8 md:gap-20 items-start"
      >
        <div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
            Sobre <span className="italic">nós</span>
          </h2>
          <p className="mt-6 md:mt-8 font-display text-2xl md:text-3xl italic leading-snug text-accent max-w-md">
            Cada peça começa em branco. O que a torna única é a história que lhe damos.
          </p>
        </div>
        <div className="space-y-5 md:space-y-6 text-[13px] sm:text-sm text-muted-foreground leading-relaxed max-w-prose">
          <p>
            Na STRAMPURU acreditamos que a roupa também fala. Uma t-shirt pode
            vestir uma equipa inteira, uma sweat pode guardar a memória de um
            evento, um polo pode ser o primeiro contacto de um cliente com a sua
            marca. Por isso, não nos limitamos a vender peças: transformamo-las
            em algo que é seu.
          </p>
          <p>
            A personalização está no centro de tudo o que fazemos. Ouvimos a sua
            ideia, ajudamos a escolher o modelo, a cor e o tamanho certos, e
            cuidamos de cada pormenor até o resultado final estar à altura do
            que imaginou — seja um logótipo discreto ao peito, um nome nas costas
            ou uma criação que só existe no seu caderno de esboços.
          </p>
          <p>
            Trabalhamos com empresas, clubes, escolas, associações e famílias,
            em encomendas grandes ou pequenas, sempre com o mesmo rigor. Das
            t-shirts aos polos, das sweats aos casacos, dos bodies de bebé aos
            brindes, cada artigo deste catálogo foi pensado para ganhar a sua
            marca.
          </p>
          <p className="text-foreground font-medium">
            Escolha a peça. Nós tratamos do resto. Personaliza-me.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
