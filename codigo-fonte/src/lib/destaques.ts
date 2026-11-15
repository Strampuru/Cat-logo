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
  /** Fotos de trabalhos (galeria). Quando existe, a página mostra a galeria em vez dos modelos. */
  fotos?: { imagem: string; legenda: string; tipo: string }[];
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
    modelos: [],
    vazio: "Estamos a preparar a seleção de Natal. Volte em breve.",
  },
  {
    id: "novidades",
    nome: "Novidades",
    titulo: "As nossas",
    tituloItalico: "novidades",
    etiqueta: "Acabados de chegar",
    introducao: "Os modelos mais recentes do catálogo Strampuru, prontos a personalizar.",
    modelos: ["atlantida", "torre-de-madeira"],
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
    fotos: [
      { imagem: "./trabalhos/canecas-natal-nomes.webp", legenda: "Canecas de Natal com nomes", tipo: "Canecas" },
      { imagem: "./trabalhos/sweat-natal.webp", legenda: "Sweat com capuz de Natal", tipo: "Sweats" },
      { imagem: "./trabalhos/mala-vk-clinic.webp", legenda: "Mala acolchoada com logótipo — VK Clinic", tipo: "Malas" },
      { imagem: "./trabalhos/body-bebe-madrinha.webp", legenda: "Body de bebé com convite à madrinha", tipo: "Bebé" },
      { imagem: "./trabalhos/tshirt-xarope.webp", legenda: "T-shirt com estampagem divertida", tipo: "T-shirts" },
      { imagem: "./trabalhos/canecas-merry-christmas.webp", legenda: "Canecas «Merry Christmas»", tipo: "Canecas" },
      { imagem: "./trabalhos/tshirts-team-bride.webp", legenda: "T-shirts «Team Bride» para despedida de solteira", tipo: "T-shirts" },
      { imagem: "./trabalhos/sweats-familia-ilustracao.webp", legenda: "Sweats de família com ilustração personalizada", tipo: "Sweats" },
      { imagem: "./trabalhos/tshirt-hot-girlfriend.webp", legenda: "T-shirt com frase nas costas", tipo: "T-shirts" },
      { imagem: "./trabalhos/tshirts-grupo-concerto.webp", legenda: "T-shirts de grupo para concerto", tipo: "T-shirts" },
      { imagem: "./trabalhos/sweat-bear-crianca.webp", legenda: "Sweat de criança com ilustração", tipo: "Sweats" },
      { imagem: "./trabalhos/sweat-colecao-couple.webp", legenda: "Coleção Couple", tipo: "Sweats" },
    ],
  },
];

export function getDestaque(id: string) {
  return destaques.find((d) => d.id === id);
}

/** true se o modelo estiver na página «Novidades» (mostra o selo «Novidade» no cartão). */
export function eNovidade(id: string) {
  return getDestaque("novidades")?.modelos.includes(id) ?? false;
}
