import { IVA_ISENTO } from "@/lib/regime-iva";

/**
 * Preparação para a saída da isenção de IVA.
 * Os preços do catálogo estão escritos SEM IVA (valores atuais, isentos).
 * Se `IVA_ISENTO` (em lib/regime-iva.ts) passar a false, todos os preços do site
 * — catálogo, peças dos conjuntos, Natal e promoções — passam automaticamente
 * a custar mais 23%, arredondados para cima para ,49 ou ,99, e os textos passam a «IVA incluído».
 */
export const TAXA_IVA = 0.23;
export const FATOR_IVA = IVA_ISENTO ? 1 : 1 + TAXA_IVA;

/**
 * Arredonda PARA CIMA para o preço «bonito» seguinte terminado em ,49 ou ,99.
 * Ex.: 6,14 → 6,49 · 11,69 → 11,99 · 12,49 → 12,49 · 13,00 → 13,49.
 */
export function arredondarPrecoBonito(valor: number): number {
  const cent = Math.round(valor * 100 - 1e-6);
  const euros = Math.floor(cent / 100);
  const resto = cent - euros * 100;
  return euros + (resto <= 49 ? 0.49 : 0.99);
}

/** "4,99€" → "6,49€"; "10,00€ – 22,50€" → "12,49€ – 27,99€". Textos sem € ficam iguais. */
export function precoComIva(texto: string): string {
  if (FATOR_IVA === 1) return texto;
  return texto.replace(/(\d+(?:,\d+)?)\s*€/g, (_, n: string) => {
    const v = arredondarPrecoBonito(parseFloat(n.replace(",", ".")) * FATOR_IVA);
    return v.toFixed(2).replace(".", ",") + "€";
  });
}

/** Aplica o IVA a todas as listas «precos» ([escalão, preço][]) dentro de um objeto (modelos, peças, opções). */
export function aplicarIvaNosPrecos<T>(valor: T): T {
  if (FATOR_IVA === 1) return valor;
  const visitar = (v: unknown, chave?: string): unknown => {
    if (Array.isArray(v)) {
      if (chave === "precos") {
        return v.map((par) => (Array.isArray(par) && typeof par[1] === "string" ? [par[0], precoComIva(par[1]), ...par.slice(2)] : par));
      }
      return v.map((x) => visitar(x));
    }
    if (v && typeof v === "object" && Object.getPrototypeOf(v) === Object.prototype) {
      const novo: Record<string, unknown> = {};
      for (const [k, x] of Object.entries(v as Record<string, unknown>)) novo[k] = visitar(x, k);
      return novo;
    }
    return v;
  };
  return visitar(valor) as T;
}
