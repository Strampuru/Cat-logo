/**
 * Páginas de destaque (ligadas ao banner da página principal e ao menu lateral).
 * Para mudar o que aparece em cada página, altere os textos ou a lista `modelos`
 * (ids dos modelos em src/lib/catalogo.ts, pela ordem em que devem aparecer).
 */
export type Destaque = {
  id: string;
  /** Nome curto (menu lateral). */
  nome: string;
  titulo: string;
  tituloItalico: string;
  etiqueta: string;
  introducao: string;
  /** Modelos a mostrar nesta página. Vazio = mostra a mensagem «em preparação». */
  modelos: string[];
  /** Texto quando ainda não há modelos/trabalhos. */
  vazio: string;
};

export const destaques: Destaque[] = [
  {
    id: "natal",
    nome: "Especial de Natal",
    titulo: "Especial de",
    tituloItalico: "Natal",
    etiqueta: "Presentes personalizados",
    introducao:
      "Ideias de presente com a sua marca para oferecer à equipa, a clientes e à família. Peças confortáveis e brindes originais, personalizados ao seu gosto.",
    modelos: ["dublin", "arizona", "torre-de-madeira", "vaduz", "motu-nui", "otava", "quito", "abuja"],
    vazio: "Estamos a preparar a seleção de Natal. Volte em breve.",
  },
  {
    id: "novidades",
    nome: "Novidades",
    titulo: "As nossas",
    tituloItalico: "novidades",
    etiqueta: "Acabados de chegar",
    introducao: "Os modelos mais recentes do catálogo Strampuru, prontos a personalizar.",
    modelos: ["torre-de-madeira", "caracas", "strategy", "dacar", "bissau", "luanda", "rabat", "cairo"],
    vazio: "Ainda não há novidades. Volte em breve.",
  },
  {
    id: "promocoes",
    nome: "Promoções",
    titulo: "",
    tituloItalico: "Promoções",
    etiqueta: "Condições especiais",
    introducao: "Peças selecionadas com condições especiais por tempo limitado.",
    modelos: [],
    vazio: "De momento não há promoções ativas. Fale connosco para conhecer as condições para grandes quantidades.",
  },
  {
    id: "trabalhos",
    nome: "Trabalhos que já fizemos",
    titulo: "Trabalhos que",
    tituloItalico: "já fizemos",
    etiqueta: "Portefólio",
    introducao:
      "Alguns dos projetos que personalizámos para empresas, clubes, escolas e eventos. Inspire-se para o seu.",
    modelos: [],
    vazio: "Estamos a reunir fotografias dos nossos trabalhos. Volte em breve.",
  },
];

export function getDestaque(id: string) {
  return destaques.find((d) => d.id === id);
}
