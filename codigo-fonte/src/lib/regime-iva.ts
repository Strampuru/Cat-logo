/**
 * REGIME DE IVA. A Carolina está no regime de isenção do artigo 53.º do CIVA.
 * Se passar ao regime normal (faturação acima de 15 000 €/ano), muda para false:
 * todos os textos do site passam a dizer «IVA incluído».
 *
 * ⚠️ NOTA PARA QUANDO MUDAR PARA false — REVER ESTES 3 PRODUTOS:
 * com o IVA e o arredondamento para ,49/,99, dois escalões ficam com o mesmo preço:
 *   - MORONI: 9,25€ e 9,00€ → ambos 11,49€
 *   - SEUL:   3,50€ e 3,25€ → ambos 4,49€
 *   - HAVANA: 1,50€ e 1,25€ → ambos 1,99€
 * Decidir com a Strampuru se ficam assim ou se se ajustam os escalões.
 */
export const IVA_ISENTO = true;
export const FRASE_IVA = IVA_ISENTO
  ? "Preços finais, isentos de IVA ao abrigo do artigo 53.º do Código do IVA."
  : "Preços com IVA incluído à taxa legal em vigor.";
export const FRASE_IVA_CURTA = IVA_ISENTO ? "Preços finais, isentos de IVA (art. 53.º do CIVA)." : "Preços com IVA incluído.";
