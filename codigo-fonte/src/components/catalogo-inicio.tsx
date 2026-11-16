import { Link } from "@tanstack/react-router";
import { Seta } from "@/components/seta";
import { ModelCard } from "@/components/model-card";
import { modelos, type Modelo } from "@/lib/catalogo";

/**
 * Catálogo completo na página principal, organizado por grupos
 * na ordem mais útil para quem chega pela primeira vez.
 * Dentro de cada grupo, aparecem primeiro os modelos com mais opções de cor.
 */
type Grupo = {
  id: string;
  titulo: string;
  descricao: string;
  filtro: (m: Modelo) => boolean;
  /** Ordem das subcategorias dentro do grupo. */
  ordemSub?: string[];
  link?: { to: string; params?: Record<string, string> };
};

const GRUPOS: Grupo[] = [
  {
    id: "tshirts",
    titulo: "T-shirts",
    descricao: "A base de qualquer encomenda: algodão clássico e malhas técnicas para desporto.",
    filtro: (m) => m.categoria === "tshirts",
    ordemSub: ["Clássicas", "Desportivas"],
    link: { to: "/categoria/$categoria", params: { categoria: "tshirts" } },
  },
  {
    id: "polos",
    titulo: "Polos",
    descricao: "Uma imagem cuidada para equipas, lojas e eventos.",
    filtro: (m) => m.categoria === "polos",
    link: { to: "/categoria/$categoria", params: { categoria: "polos" } },
  },
  {
    id: "sweats",
    titulo: "Sweats",
    descricao: "Sweatshirts e hoodies confortáveis para os dias mais frescos.",
    filtro: (m) => m.categoria === "sweats",
    ordemSub: ["Sem Capuz", "Com Capuz"],
    link: { to: "/categoria/$categoria", params: { categoria: "sweats" } },
  },
  {
    id: "jaquetas",
    titulo: "Casacos",
    descricao: "Proteção contra o vento e a chuva, com a sua marca.",
    filtro: (m) => m.categoria === "jaquetas",
    link: { to: "/categoria/$categoria", params: { categoria: "jaquetas" } },
  },
  {
    id: "conjuntos",
    titulo: "Conjuntos",
    descricao: "Peças pensadas para usar em conjunto, prontas a equipar uma equipa inteira.",
    filtro: (m) => m.categoria === "conjuntos",
    link: { to: "/categoria/$categoria", params: { categoria: "conjuntos" } },
  },
  {
    id: "bebe",
    titulo: "Bebé",
    descricao: "Bodies e babetes para personalizar com carinho.",
    filtro: (m) => m.categoria === "crianca",
    ordemSub: ["Bodies", "Babetes"],
  },
  {
    id: "outros",
    titulo: "Outros artigos",
    descricao: "Sacos, canecas, aventais, coletes e brindes para levar a sua marca a todo o lado.",
    filtro: (m) => m.categoria === "brindes",
    ordemSub: ["Sacos", "Canecas", "Cozinha", "Coletes desportivos", "Bases", "Jogos", "Fotografias"],
    link: { to: "/categoria/$categoria", params: { categoria: "brindes" } },
  },
];

function ordenar(lista: Modelo[], ordemSub?: string[]) {
  return lista
    .map((m, i) => ({ m, i }))
    .sort((a, b) => {
      if (ordemSub) {
        const sa = ordemSub.indexOf(a.m.subcategoria);
        const sb = ordemSub.indexOf(b.m.subcategoria);
        const da = sa < 0 ? 99 : sa;
        const db = sb < 0 ? 99 : sb;
        if (da !== db) return da - db;
      }
      const dc = b.m.cores.length - a.m.cores.length;
      return dc !== 0 ? dc : a.i - b.i;
    })
    .map((x) => x.m);
}

export function CatalogoInicio() {
  const grupos = GRUPOS.map((g) => ({ ...g, itens: ordenar(modelos.filter(g.filtro), g.ordemSub) })).filter(
    (g) => g.itens.length > 0,
  );

  const irPara = (id: string) => {
    document.getElementById(`grupo-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 md:pt-20">
        <div className="border-b border-border pb-6 md:pb-8">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-none text-accent">
            Catálogo completo
          </h2>
        </div>
      </div>

      {/* Atalhos para cada grupo */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {grupos.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => irPara(g.id)}
              className="shrink-0 rounded-full border border-border px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              {g.titulo}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 md:pb-24">
        {grupos.map((g) => (
          <div key={g.id} id={`grupo-${g.id}`} className="scroll-mt-36 md:scroll-mt-40 pt-12 md:pt-16">
            <div className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-3xl md:text-4xl italic leading-none">{g.titulo}</h3>
                <p className="mt-2 text-[13px] text-muted-foreground max-w-lg">{g.descricao}</p>
              </div>
              {g.link && (
                <Link
                  to={g.link.to}
                  params={g.link.params as never}
                  className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent font-medium hover:text-foreground transition-colors whitespace-nowrap"
                >
                  Ver só {g.titulo.toLowerCase()} ({g.itens.length}) <Seta direcao="direita" className="size-3.5 -mt-0.5" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-4">
              {g.itens.map((m) => (
                <ModelCard key={m.id} modelo={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
