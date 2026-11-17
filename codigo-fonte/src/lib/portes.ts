import { precoComIva } from "@/lib/iva";

/**
 * PORTES DE ENVIO (decisão de 17/11/2026).
 * Valor escrito SEM IVA, como os preços do catálogo: se a Strampuru sair da isenção,
 * passa automaticamente a incluir IVA (arredondado para ,49/,99).
 * Referência de custo: CTT Pack Expresso — preço normal 35,00 € + IVA por 5 envios
 * (7,00 € + IVA = 8,61 € por envio até 5 kg; campanha até 31/12/2026: 5,95 € + IVA),
 * entrega no dia útil seguinte (Portugal continental). Valor escolhido: 8,99 €.
 */
export const PORTE_CONTINENTE = precoComIva("8,99€");
export const PESO_MAXIMO = "5 kg";

export const FRASE_PORTES_CURTA = `Portes de envio: ${PORTE_CONTINENTE} para Portugal continental (até ${PESO_MAXIMO}).`;

export const OPCOES_ENVIO = [
  {
    titulo: "Portugal continental",
    valor: PORTE_CONTINENTE,
    texto: `Por encomenda até ${PESO_MAXIMO}, por CTT Expresso, com entrega prevista no dia útil seguinte ao envio. Acima de ${PESO_MAXIMO}, combinamos os portes consigo.`,
  },
  {
    titulo: "Açores e Madeira",
    valor: "Sob consulta",
    texto: "Indicamos o valor dos portes antes de confirmar a encomenda.",
  },
  {
    titulo: "Entrega em mão",
    valor: "Grátis",
    texto: "Combine connosco a entrega ou o levantamento em mão na zona de Corroios / Seixal.",
  },
];
