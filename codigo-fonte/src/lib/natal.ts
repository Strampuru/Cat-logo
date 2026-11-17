/**
 * Coleção de Natal — modelos que SÓ aparecem na página «Especial de Natal».
 * Não fazem parte da lista `modelos` do catálogo, por isso não aparecem nas categorias,
 * na pesquisa, na página inicial nem nas promoções.
 * Cada modelo parte de um modelo do catálogo (preços, tamanhos, composição) e troca
 * as fotos pelas versões com ilustração de Natal (public/natal/*.webp).
 */
import { modelos, getModelo, type Cor, type Modelo } from "@/lib/catalogo";
import { natalAtivo } from "@/lib/tempo";

const __base = import.meta.env.BASE_URL ?? "/";
const pub = (p: string): string => (__base === "/" ? p : __base.replace(/\/$/, "") + p);

function base(id: string): Modelo {
  const m = modelos.find((x) => x.id === id);
  if (!m) throw new Error(`Modelo base em falta: ${id}`);
  return m;
}

/** Copia as cores indicadas do modelo base (mantém hex e soAdulto/soCrianca) com a foto de Natal. */
function cores(baseId: string, lista: [nomeBase: string, foto: string][]): Cor[] {
  const b = base(baseId);
  return lista.map(([nome, foto]) => {
    const c = b.cores.find((x) => x.nome === nome);
    if (!c) throw new Error(`Cor em falta em ${baseId}: ${nome}`);
    return { ...c, imagem: pub(`/natal/${foto}.webp`) };
  });
}

function natal(baseId: string, extra: Partial<Modelo> & Pick<Modelo, "id" | "nome" | "descricao" | "cores">): Modelo {
  const b = base(baseId);
  return {
    ...b,
    lifestyle: undefined,
    semLegenda: true,
    fotosCheias: true,
    referencia: `${b.referencia}-NAT`,
    imagem: extra.cores[0].imagem,
    ...extra,
  };
}

const QUATRO = (pref: string, verde = "Verde escuro"): [string, string][] => [
  ["Branco", `${pref}-branco`],
  ["Vermelho", `${pref}-vermelho`],
  [verde, `${pref}-verde`],
  ["Preto", `${pref}-preto`],
];

export const modelosNatal: Modelo[] = [
  natal("racing", {
    id: "natal-lisboa",
    lifestyle: pub("/natal/lisboa-estampa.webp"),
    nome: "T-shirt LISBOA · Árvore de Natal",
    referenciaNome: "LISBOA NATAL",
    descricao:
      "A nossa T-shirt LISBOA vestida para a época: uma árvore de Natal ilustrada, cheia de bolas e estrelas douradas, com «Feliz Natal» em letra manuscrita. Ideal para a família, a equipa ou a festa de Natal da empresa — e pode juntar o seu nome ou logótipo.",
    cores: cores("racing", QUATRO("lisboa")),
  }),
  natal("arizona", {
    id: "natal-lima",
    lifestyle: pub("/natal/lima-estampa.webp"),
    nome: "Hoodie LIMA · Rena de Natal",
    referenciaNome: "LIMA NATAL",
    descricao:
      "O Hoodie LIMA com uma rena simpática a espreitar, com luzes de Natal enroladas nas hastes e «Feliz Natal» por baixo. Quente, confortável e perfeito para as tardes de dezembro, em família ou entre amigos.",
    cores: cores("arizona", QUATRO("lima")),
  }),
  natal("dublin", {
    id: "natal-melodias",
    lifestyle: pub("/natal/melodias-estampa.webp"),
    nome: "Sweatshirt MELODIAS · Luzes de Natal",
    referenciaNome: "MELODIAS NATAL",
    descricao:
      "A Sweatshirt MELODIAS com «Feliz Natal» em letra manuscrita, rodeado por um fio de luzes coloridas. Um clássico de inverno, fácil de oferecer e de usar em toda a época festiva.",
    cores: cores("dublin", QUATRO("melodias")),
  }),
  natal("dublin", {
    id: "natal-couple",
    lifestyle: pub("/natal/couple-estampa.webp"),
    nome: "Sweatshirts COUPLE · Natal",
    referenciaNome: "COUPLE NATAL",
    descricao:
      "O par perfeito para casais com sentido de humor. Uma sweatshirt diz «I don't do matching Christmas outfits» (em português, «Eu não alinho em roupa de Natal a condizer») e a outra responde «But I do…» («Mas eu alinho…»), as duas com «Ho ho ho!», grinalda de azevinho e laço dourado. Feitas na Sweatshirt MELODIAS e vendidas em pares.",
    cores: cores("dublin", QUATRO("couple")),
    tituloPrecos: "Preços por quantidade (em pares)",
    precos: [
      ["0–49 pares", "37,50€"],
      ["50–249 pares", "36,00€"],
      ["Mais de 249 pares", "34,50€"],
    ],
    notaPrecos: "Vende-se em pares: cada par tem duas sweatshirts. Preço por par.",
  }),
  natal("otava", {
    id: "natal-otava",
    lifestyle: pub("/natal/otava-estampa.webp"),
    nome: "Avental OTAVA · Chef de Natal",
    referenciaNome: "OTAVA NATAL",
    descricao:
      "O Avental OTAVA com um boneco de gengibre de gorro de Pai Natal e a frase «Chef de Natal». Para quem manda na cozinha na noite da consoada — e um presente divertido para os cozinheiros da família.",
    cores: cores("otava", QUATRO("otava", "Verde")),
  }),
  natal("vaduz", {
    id: "natal-vaduz",
    lifestyle: pub("/natal/vaduz-estampa.webp"),
    soFotoPrincipal: false,
    nome: "Caneca VADUZ · Ho Ho Ho",
    referenciaNome: "VADUZ NATAL",
    descricao:
      "A Caneca VADUZ, branca, com um Pai Natal sorridente e um «Ho Ho Ho» em vermelho. A caneca certa para o chocolate quente das manhãs de dezembro.",
    cores: cores("vaduz", [["Branco", "vaduz"]]),
  }),
  natal("motu-nui", {
    id: "natal-motu-nui",
    lifestyle: pub("/natal/motu-nui-estampa.webp"),
    soFotoPrincipal: false,
    nome: "Caneca MOTU NUI · Boas Festas",
    referenciaNome: "MOTU NUI NATAL",
    descricao:
      "A Caneca MOTU NUI, preta, com um pinguim de gorro e cachecol, flocos de neve e «Boas Festas» em creme e dourado. Um presente pequeno com muito encanto.",
    cores: cores("motu-nui", [["Preto", "motu-nui"]]),
  }),
  natal("abuja", {
    id: "natal-abuja",
    lifestyle: pub("/natal/abuja-estampa.webp"),
    soFotoPrincipal: false,
    nome: "Bases ABUJA · Team Natal",
    referenciaNome: "ABUJA NATAL",
    descricao:
      "Bases de copos ABUJA com «Team Natal», gorro de Pai Natal, hastes de rena e luzes coloridas. Dão cor à mesa da ceia e são uma lembrança divertida para oferecer.",
    cores: cores("abuja", [["Branco", "abuja"]]),
  }),
  natal("torre-de-madeira", {
    id: "natal-bolas",
    lifestyle: pub("/natal/bolas-capa.webp"),
    soFotoPrincipal: false,
    nome: "BOLAS DE NATAL em madeira",
    referenciaNome: "BOLAS DE NATAL",
    subcategoria: "Decoração",
    referencia: "#BOL-NAT",
    composicao: "Madeira natural gravada a laser",
    descricao:
      "Bolas de Natal em madeira natural, gravadas a laser, com fita ou cordel para pendurar na árvore. Escolha frases de Natal, os nomes de cada pessoa da família ou desenhos ternurentos para os mais pequenos — ou envie-nos a sua ideia. Um enfeite que dura muitos Natais e um presente com significado.",
    cores: [
      { nome: "Frases de Natal", hex: "#d9c3a0", hexes: ["#d9c3a0"], imagem: pub("/natal/bolas-frases.webp") },
      { nome: "Nomes da família", hex: "#d9c3a0", hexes: ["#d9c3a0"], imagem: pub("/natal/bolas-nomes.webp") },
      { nome: "Desenhos infantis", hex: "#d9c3a0", hexes: ["#d9c3a0"], imagem: pub("/natal/bolas-desenhos.webp") },
    ],
    caracteristicas: ["Madeira natural gravada a laser", "Fita ou cordel para pendurar", "Personalizável com frases, nomes ou desenhos"],
    precos: [["Preço por unidade", "2,50€"]],
    notaPrecos: "Stock limitado: preço por unidade, com IVA e personalização incluídos, enquanto houver stock. Portes de envio não incluídos.",
    tituloPrecos: "Preço",
    stockLimitado: true,
  }),
  natal("torre-de-madeira", {
    id: "natal-velas",
    lifestyle: pub("/natal/velas-capa.webp"),
    soFotoPrincipal: false,
    nome: "BOLA DE NATAL com vela",
    referenciaNome: "BOLA COM VELA",
    subcategoria: "Decoração",
    referencia: "#VEL-NAT",
    composicao: "Madeira natural cortada a laser",
    descricao:
      "Castiçal em madeira natural em forma de bola de Natal, com desenho recortado a laser e suporte para vela de chá no topo. Escolha entre azevinho com vela, boneco de neve ou sino — ou peça o seu próprio desenho ou nome. Mede 8 cm de altura e 6 cm de largura. Dá um brilho acolhedor à mesa da consoada e é um presente com encanto.",
    caracteristicas: ["Madeira natural cortada a laser", "8 cm de altura × 6 cm de largura", "Suporte para vela de chá", "Personalizável com desenhos ou nomes"],
    cores: [
      { nome: "Azevinho e vela", hex: "#e8dcc4", hexes: ["#e8dcc4"], imagem: pub("/natal/velas-azevinho.webp") },
      { nome: "Boneco de neve", hex: "#e8dcc4", hexes: ["#e8dcc4"], imagem: pub("/natal/velas-boneco.webp") },
      { nome: "Sino", hex: "#e8dcc4", hexes: ["#e8dcc4"], imagem: pub("/natal/velas-sino.webp") },
    ],
    precos: [["Preço por unidade", "3,50€"]],
    notaPrecos: "Stock limitado: preço por unidade, com IVA e personalização incluídos, enquanto houver stock. Portes de envio não incluídos.",
    tituloPrecos: "Preço",
    stockLimitado: true,
  }),
];

/** true se o modelo pertence à coleção de Natal. */
export function eModeloNatal(id: string) {
  return modelosNatal.some((m) => m.id === id);
}

/** Procura primeiro no catálogo e depois na coleção de Natal (só enquanto a campanha está ativa). */
export function getModeloComNatal(id: string): Modelo | undefined {
  return getModelo(id) ?? (natalAtivo() ? modelosNatal.find((m) => m.id === id) : undefined);
}
