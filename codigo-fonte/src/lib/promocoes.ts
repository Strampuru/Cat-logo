import { modelos, type Modelo } from "@/lib/catalogo";

/**
 * Promoção semanal automática.
 * - Cada ciclo dura 7 dias, a contar de INICIO (00:00, hora local).
 * - Em cada ciclo são escolhidos ao acaso QUANTOS modelos com DESCONTO de desconto.
 * - A escolha é «aleatória mas igual para todos os visitantes» durante o ciclo
 *   (usa o número do ciclo como semente), e muda automaticamente no ciclo seguinte.
 */
export const INICIO = new Date(2026, 10, 13, 0, 0, 0); // 13/11/2026 às 00:00
export const DURACAO_MS = 7 * 24 * 60 * 60 * 1000;
export const QUANTOS = 4;
export const DESCONTO = 0.1; // 10%

export function cicloAtual(agora = Date.now()) {
  const n = Math.max(0, Math.floor((agora - INICIO.getTime()) / DURACAO_MS));
  const fim = INICIO.getTime() + (n + 1) * DURACAO_MS;
  return { n, fim };
}

/** Gerador pseudo-aleatório com semente (mulberry32). */
function aleatorio(semente: number) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function temPreco(m: Modelo) {
  // O configurador ABU DHABI calcula preços por peça e fica de fora
  return m.id !== "abu-dhabi" && m.precos.some(([, p]) => /\d/.test(p));
}

export function modelosEmPromocao(agora = Date.now()): Modelo[] {
  const { n } = cicloAtual(agora);
  const r = aleatorio(20261113 + n * 7919);
  const candidatos = modelos.filter(temPreco);
  const copia = [...candidatos];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, QUANTOS);
}

export function emPromocao(id: string, agora = Date.now()) {
  return modelosEmPromocao(agora).some((m) => m.id === id);
}

/** "20,00€" → "18,00€" (aplica o desconto). Textos sem número ficam iguais. */
export function precoComDesconto(preco: string) {
  const m = preco.match(/(\d+(?:[.,]\d+)?)/);
  if (!m) return preco;
  const v = parseFloat(m[1].replace(",", ".")) * (1 - DESCONTO);
  const novo = v.toFixed(2).replace(".", ",");
  return preco.replace(m[1], novo);
}

/** Menor preço do modelo (para «desde …»). */
export function precoMinimo(m: Modelo) {
  const vals = m.precos
    .map(([, p]) => p.match(/(\d+(?:[.,]\d+)?)/))
    .filter((x): x is RegExpMatchArray => Boolean(x))
    .map((x) => parseFloat(x[1].replace(",", ".")));
  return vals.length ? Math.min(...vals) : undefined;
}

/** Preço do primeiro escalão (o que paga quem encomenda poucas unidades) e o respetivo escalão. */
export function precoBase(m: Modelo): { valor: number; escalao: string } | undefined {
  for (const [escalao, p] of m.precos) {
    const x = p.match(/(\d+(?:[.,]\d+)?)/);
    if (x) return { valor: parseFloat(x[1].replace(",", ".")), escalao };
  }
  return undefined;
}

export function formatarEuros(v: number) {
  return v.toFixed(2).replace(".", ",") + "€";
}
