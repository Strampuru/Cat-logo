/**
 * Informação legal do site (Termos, Privacidade, Resolução de litígios, Livro de Reclamações).
 * PARA ALTERAR OS DADOS DO VENDEDOR: muda só o objeto VENDEDOR abaixo.
 * Os textos usam estes dados automaticamente.
 */
export const VENDEDOR = {
  nome: "Carolina Ribeiros Carvalho",
  marca: "Strampuru",
  nif: "255600097",
  morada: "Rua das Flores, n.º 1 A, 2855-199 Corroios, Setúbal, Portugal",
  email: "Strampuru@gmail.com",
  telefone: "(+351) 928 253 232",
  whatsapp: "351928253232",
  instagram: "@strampuru_",
};

/** Data da última atualização dos textos legais. */
export const ATUALIZADO_EM = "17 de novembro de 2026";

export const LIVRO_RECLAMACOES = "https://www.livroreclamacoes.pt/";
export const CNIACC = { nome: "CNIACC – Centro Nacional de Informação e Arbitragem de Conflitos de Consumo", site: "https://www.cniacc.pt", email: "geral@cniacc.pt" };
export const PORTAL_CONSUMIDOR = "https://www.consumidor.gov.pt";

/** true enquanto faltarem dados do vendedor (mostra um aviso só na pré-visualização). */
export const DADOS_EM_FALTA = /\[.*\]/.test(VENDEDOR.nome + VENDEDOR.nif + VENDEDOR.morada);

export type Seccao = { titulo: string; paragrafos: string[] };
export type PaginaLegal = { id: string; nome: string; titulo: string; introducao: string; seccoes: Seccao[] };

const v = VENDEDOR;

export const paginasLegais: PaginaLegal[] = [
  {
    id: "termos",
    nome: "Termos e Condições",
    titulo: "Termos e Condições",
    introducao:
      "Leia com atenção antes de fazer uma encomenda. Ao encomendar através dos nossos canais, aceita estes Termos e Condições.",
    seccoes: [
      {
        titulo: "1. Identificação e âmbito",
        paragrafos: [
          `Este catálogo online é gerido por ${v.nome}, que exerce a atividade sob a marca ${v.marca}, com o NIF ${v.nif} e domicílio fiscal em ${v.morada}, doravante designado por «Vendedor». Contactos: ${v.email} · ${v.telefone}.`,
          `Estes Termos e Condições aplicam-se a todas as encomendas feitas através dos canais oficiais associados a este catálogo: WhatsApp ${v.telefone}, Instagram ${v.instagram} e email ${v.email}.`,
        ],
      },
      {
        titulo: "2. Processo de encomenda",
        paragrafos: [
          "Este website funciona como catálogo de apresentação de produtos. As encomendas não são feitas no site: são formalizadas diretamente por mensagem no WhatsApp, no Instagram ou por email.",
          "Após o pedido do cliente, o Vendedor confirma por escrito a disponibilidade, a personalização acordada, o valor total (incluindo portes de envio), os prazos estimados de produção e entrega e os dados para pagamento. A encomenda considera-se aceite com essa confirmação e só entra em produção depois de confirmado o pagamento.",
          "Sempre que a personalização o justifique, o Vendedor envia uma prova (maquete) para aprovação. A produção só começa depois de o cliente aprovar a prova.",
        ],
      },
      {
        titulo: "3. Preços, pagamento e portes de envio",
        paragrafos: [
          "Os preços apresentados no catálogo estão em euros (€), são por unidade, incluem a personalização e incluem IVA à taxa legal em vigor. Os preços variam consoante a quantidade encomendada, de acordo com os escalões indicados em cada produto.",
          "Os portes de envio não estão incluídos nos preços e são comunicados ao cliente antes da confirmação da encomenda.",
          "As promoções indicadas no site (por exemplo, «−10% esta semana») são válidas apenas durante o período indicado e aplicam-se às encomendas confirmadas dentro desse período.",
          "Os meios de pagamento disponíveis e os respetivos dados são indicados na confirmação da encomenda. Por cada pagamento é emitida a respetiva fatura ou fatura-recibo.",
        ],
      },
      {
        titulo: "4. Prazos de produção e entrega",
        paragrafos: [
          "Os prazos de produção e entrega são estimados e comunicados na confirmação de cada encomenda, dependendo da quantidade, do tipo de personalização e da disponibilidade dos artigos.",
          "Em caso de atraso, o Vendedor informa o cliente logo que possível. Na falta de indicação de prazo, a entrega é feita no máximo em 30 dias após a celebração do contrato, nos termos da lei.",
        ],
      },
      {
        titulo: "5. Produtos personalizados e direito de livre resolução",
        paragrafos: [
          "Nos termos do artigo 17.º, n.º 1, alínea c), do Decreto-Lei n.º 24/2014, não existe direito de livre resolução (devolução no prazo de 14 dias sem indicar motivo) no fornecimento de bens confecionados de acordo com especificações do consumidor ou manifestamente personalizados.",
          "Assim, depois de o cliente aprovar a personalização e de a produção começar, não são aceites cancelamentos, trocas ou devoluções por mudança de ideia (por exemplo, escolha errada de tamanho ou cor).",
          "Se for vendido algum artigo sem personalização, o consumidor mantém o direito de livre resolução de 14 dias a contar da receção, devendo devolver o artigo em perfeito estado; os custos de devolução ficam a cargo do cliente.",
        ],
      },
      {
        titulo: "6. Defeitos, erros de personalização e garantia",
        paragrafos: [
          "Todos os artigos beneficiam da garantia legal de conformidade prevista no Decreto-Lei n.º 84/2021 (3 anos para os consumidores).",
          "Se o artigo tiver defeito de fabrico ou erro de personalização imputável ao Vendedor, pedimos que nos contacte logo que possível, de preferência nas 48 horas seguintes à receção, enviando fotografias do artigo. Procederemos à reparação, substituição ou reembolso sem custos para o cliente. Este pedido de rapidez serve apenas para resolvermos o problema mais depressa e não limita os seus direitos de garantia legal.",
          "Não são considerados defeitos as pequenas variações de cor entre o ecrã e o artigo real, nem os resultados que correspondam exatamente à prova aprovada pelo cliente.",
        ],
      },
      {
        titulo: "7. Direitos sobre imagens, logótipos e textos enviados",
        paragrafos: [
          "O cliente declara que é titular dos direitos, ou que tem as autorizações necessárias, sobre as imagens, logótipos, marcas ou textos que envia para personalização, e assume a responsabilidade por qualquer violação de direitos de propriedade intelectual de terceiros.",
          "O Vendedor pode recusar personalizações com conteúdo ilegal, ofensivo ou que viole direitos de terceiros.",
          "As fotografias de trabalhos realizados só são publicadas pelo Vendedor com autorização do cliente e com as caras das pessoas desfocadas.",
        ],
      },
      {
        titulo: "8. Reclamações e resolução de litígios",
        paragrafos: [
          `O cliente pode apresentar reclamação diretamente ao Vendedor (${v.email}) ou no Livro de Reclamações Eletrónico (www.livroreclamacoes.pt).`,
          `Em caso de litígio de consumo, o consumidor pode recorrer a uma entidade de Resolução Alternativa de Litígios de Consumo: ${CNIACC.nome} — ${CNIACC.site} · ${CNIACC.email}. Mais informações no Portal do Consumidor: ${PORTAL_CONSUMIDOR}.`,
        ],
      },
      {
        titulo: "9. Aceitação e conhecimento dos termos",
        paragrafos: [
          "Ao aceitar estes Termos e Condições e a Política de Privacidade (na entrada do site ou ao fazer uma encomenda), o cliente declara que os leu, compreendeu e aceita na íntegra. A partir desse momento, o cliente não pode alegar desconhecimento ou ignorância do seu conteúdo.",
          "Os Termos e Condições e a Política de Privacidade estão sempre disponíveis para consulta no rodapé de todas as páginas do site. Em caso de dúvida, o cliente deve contactar o Vendedor antes de confirmar a encomenda.",
          "O disposto neste ponto não afasta nem limita os direitos que a lei garante aos consumidores.",
        ],
      },
      {
        titulo: "10. Lei aplicável",
        paragrafos: [
          "Estes Termos e Condições regem-se pela lei portuguesa. O Vendedor pode atualizá-los; aplica-se a cada encomenda a versão em vigor na data da sua confirmação.",
        ],
      },
    ],
  },
  {
    id: "privacidade",
    nome: "Política de Privacidade",
    titulo: "Política de Privacidade",
    introducao:
      "Explicamos de forma simples que dados tratamos, para quê e quais são os seus direitos, de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD).",
    seccoes: [
      {
        titulo: "1. Responsável pelo tratamento",
        paragrafos: [
          `O responsável pelo tratamento dos dados pessoais é ${v.nome} (${v.marca}), NIF ${v.nif}, com domicílio em ${v.morada}, contactável através de ${v.email}.`,
        ],
      },
      {
        titulo: "2. Dados recolhidos e finalidades",
        paragrafos: [
          "Este website não tem formulários nem contas de cliente e não utiliza cookies de publicidade ou de rastreamento.",
          "Quando nos contacta pelo WhatsApp, Instagram ou email para fazer uma encomenda, tratamos apenas os dados necessários para: (a) responder ao seu pedido e preparar o orçamento; (b) produzir, personalizar e enviar a encomenda (nome, contacto, morada de entrega e elementos de personalização); (c) cumprir obrigações legais e fiscais (emissão de faturas, com NIF quando indicado).",
        ],
      },
      {
        titulo: "3. Fundamento legal",
        paragrafos: [
          "Os dados são tratados para a execução do contrato de compra e venda e das diligências pré-contratuais pedidas por si (artigo 6.º, n.º 1, alínea b), do RGPD) e para o cumprimento de obrigações legais (alínea c)).",
        ],
      },
      {
        titulo: "4. Conservação",
        paragrafos: [
          "Os dados das encomendas são conservados enquanto forem necessários para a encomenda e para eventuais garantias. Os documentos fiscais são guardados pelo prazo legal (atualmente 10 anos). As conversas de pedidos que não resultem em encomenda são apagadas quando deixarem de ser necessárias.",
        ],
      },
      {
        titulo: "5. Partilha com terceiros",
        paragrafos: [
          "Não vendemos nem cedemos os seus dados. Podem ter acesso a dados, apenas na medida do necessário: as transportadoras (para a entrega), o contabilista (para obrigações fiscais) e os fornecedores dos serviços que usa para falar connosco (WhatsApp/Instagram – Meta; email – Google).",
          "O site está alojado no GitHub Pages, usa o Cloudflare Web Analytics para contar visitas de forma agregada e anónima (sem cookies e sem identificar visitantes) e carrega os tipos de letra a partir do Google Fonts. Estes serviços podem tratar dados técnicos, como o endereço IP, apenas para entregar o site e contar visitas.",
        ],
      },
      {
        titulo: "6. Os seus direitos",
        paragrafos: [
          `Pode pedir a qualquer momento o acesso, a retificação, o apagamento ou a portabilidade dos seus dados, bem como a limitação ou a oposição ao tratamento, escrevendo para ${v.email}.`,
          "Tem ainda o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD – www.cnpd.pt).",
        ],
      },
      {
        titulo: "7. Cookies e armazenamento no navegador",
        paragrafos: [
          "O site não usa cookies. Guarda apenas no seu navegador pequenas preferências técnicas necessárias ao funcionamento (por exemplo, que já aceitou estes termos ou que fechou o aviso «Encomende já»). Estes dados não saem do seu dispositivo e pode apagá-los nas definições do navegador.",
        ],
      },
      {
        titulo: "8. Aceitação",
        paragrafos: [
          "Ao aceitar esta Política de Privacidade (na entrada do site ou ao fazer uma encomenda), declara que a leu e compreendeu, não podendo a partir desse momento alegar desconhecimento do seu conteúdo. Esta política está sempre disponível no rodapé do site.",
        ],
      },
    ],
  },
  {
    id: "litigios",
    nome: "Resolução de Litígios",
    titulo: "Reclamações e Resolução de Litígios",
    introducao: "Se alguma coisa não correr bem, fale primeiro connosco — resolvemos a maioria das situações rapidamente.",
    seccoes: [
      {
        titulo: "Livro de Reclamações Eletrónico",
        paragrafos: ["Pode apresentar uma reclamação no Livro de Reclamações Eletrónico, em www.livroreclamacoes.pt."],
      },
      {
        titulo: "Resolução Alternativa de Litígios (RAL)",
        paragrafos: [
          `Em caso de litígio de consumo, o consumidor pode recorrer à seguinte Entidade de Resolução Alternativa de Litígios de Consumo: ${CNIACC.nome}. Website: ${CNIACC.site} · Email: ${CNIACC.email}.`,
          `Mais informações no Portal do Consumidor: ${PORTAL_CONSUMIDOR}.`,
        ],
      },
    ],
  },
];

export function getPaginaLegal(id: string) {
  return paginasLegais.find((p) => p.id === id);
}
