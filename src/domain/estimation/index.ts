import {
  CHARS_PER_TOKEN,
  BASE_WATER_ML_PER_INTERACTION,
  REFERENCE_TOKEN_COUNT,
  RANGE_MIN_FACTOR,
  RANGE_MAX_FACTOR,
  MODEL_MULTIPLIERS,
  EQUIVALENCES,
  TASK_COMPLEXITY,
  type Equivalence,
} from './constants';

// ============================================================
// UTILITÁRIOS INTERNOS
// ============================================================

/** Formata número no padrão brasileiro (vírgula decimal, ponto milhar) */
function fmtBr(n: number): string {
  if (n < 0.01) return 'menos de 0,01';
  // Sempre arredonda pra cima — ninguém fala "2,7 latinhas"
  const ceiled = Math.ceil(n);
  return ceiled
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Pluralização simples — usa pluralForm se fornecido, senão adiciona 's' */
function plural(n: number, singular: string, pluralForm?: string): string {
  return n <= 1.4 ? singular : (pluralForm ?? singular + 's');
}

// ============================================================
// FRASES CRIATIVAS POR UNIDADE
// ============================================================
const FRASES_CRIATIVAS: Record<string, (count: number) => string> = {
  gota: (n) =>
    `${fmtBr(n)} ${plural(n, 'gotinha')} de água — parece invisível, mas some`,

  'colher de chá': (n) =>
    `${fmtBr(n)} ${plural(n, 'colher de chá', 'colheres de chá')} de água`,

  gole: (n) =>
    `${fmtBr(n)} ${plural(n, 'gole')} de água que você poderia ter bebido`,

  copo: (n) =>
    n < 1
      ? `${fmtBr(n)} copo de água — quase isso`
      : `${fmtBr(n)} ${plural(n, 'copo')} de água (200 mL cada)`,

  latinha: (n) =>
    `${fmtBr(n)} ${plural(n, 'latinha')} de refrigerante (350 mL)`,

  garrafinha: (n) =>
    n < 1
      ? `${Math.round(n * 100)}% de uma garrafinha de água mineral`
      : `${fmtBr(n)} ${plural(n, 'garrafinha')} de água mineral (500 mL)`,

  garrafão: (n) =>
    n < 1
      ? `${Math.round(n * 100)}% de um garrafão de 5 L`
      : `${fmtBr(n)} ${plural(n, 'garrafão', 'garrafões')} de água (5 L cada)`,

  'lavagem de mãos': (n) =>
    `${fmtBr(n)} ${plural(n, 'vez lavando as mãos', 'vezes lavando as mãos')}`,

  descarga: (n) =>
    `${fmtBr(n)} ${plural(n, 'descarga')} de banheiro (~6 L cada)`,

  escovação: (n) =>
    n < 1
      ? `${Math.round(n * 100)}% de uma escovação de dentes com torneira aberta`
      : `${fmtBr(n)} ${plural(n, 'escovação')} de dentes com torneira aberta`,

  'bacia de roupa': (n) =>
    `${fmtBr(n)} ${plural(n, 'bacia', 'bacias')} de roupa lavada à mão`,

  banho: (n) =>
    n < 0.1
      ? `${Math.round(n * 100)}% de um banho de 5 minutos`
      : n < 1
      ? `metade de um banho de 5 minutos`
      : `${fmtBr(n)} ${plural(n, 'banho')} completo de 5 minutos`,

  'dia de consumo pessoal': (n) =>
    n < 1
      ? `${Math.round(n * 100)}% do consumo diário de água de uma pessoa`
      : `${fmtBr(n)} ${plural(n, 'dia', 'dias')} do consumo de água de uma pessoa (média IBGE)`,

  "caixa d'água": (n) =>
    n < 1
      ? `${Math.round(n * 100)}% de uma caixa d'água residencial de 500 L`
      : `${fmtBr(n)} ${plural(n, "caixa d'água", "caixas d'água")} residencial (500 L)`,

  'semana familiar': (n) =>
    n < 1
      ? `${Math.round(n * 100)}% da água semanal de uma família brasileira`
      : `${fmtBr(n)} ${plural(n, 'semana', 'semanas')} de água para uma família de 4 pessoas`,
};

// ============================================================
// ESTIMATIVA DE TOKENS DO PROMPT
// ============================================================

export function estimateTokens(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return Math.max(1, Math.round(trimmed.length / CHARS_PER_TOKEN));
}

// ============================================================
// TOKENS DE RESPOSTA — agora via categoria de complexidade
//
// Antes: responseTokens = f(promptTokens) — impreciso para
// prompts curtos mas complexos ("crie um site completo").
// Agora: cada categoria define sua estimativa de resposta típica.
// Fallback: chat_simples (200 tokens) se a chave não existir.
// ============================================================

export function getResponseTokens(taskKey: string): number {
  return TASK_COMPLEXITY[taskKey]?.responseTokens
    ?? TASK_COMPLEXITY['chat_simples'].responseTokens;
}

// ============================================================
// ESTIMATIVA DE ÁGUA
// ============================================================

interface WaterEstimateParams {
  promptTokens: number;
  responseTokens: number;
  modelKey: string;
}

interface WaterEstimateResult {
  ml: number;
  minMl: number;
  maxMl: number;
}

export function estimateWaterMl({ promptTokens, responseTokens, modelKey }: WaterEstimateParams): WaterEstimateResult {
  const totalTokens = promptTokens + responseTokens;
  const scale       = totalTokens / REFERENCE_TOKEN_COUNT;
  const modelMult   = MODEL_MULTIPLIERS[modelKey]?.multiplier ?? 1.0;

  // Variação aleatória de ±20% — simula diferenças reais de data center,
  // horário e carga do servidor. Evita valor sempre engessado no mesmo número.
  const jitter = 0.8 + Math.random() * 0.4; // entre 0.80 e 1.20

  // Mínimo de 1 mL — mesmo prompts curtíssimos consomem algo
  const ml    = Math.max(1, Math.round(BASE_WATER_ML_PER_INTERACTION * scale * modelMult * jitter * 100) / 100);
  const minMl = Math.round(ml * RANGE_MIN_FACTOR * 100) / 100;
  const maxMl = Math.round(ml * RANGE_MAX_FACTOR * 100) / 100;

  return { ml, minMl, maxMl };
}

// ============================================================
// FORMATAÇÃO DE VOLUME
// ============================================================

export function formatWater(ml: number): { primary: string; secondary: string } {
  const roundedMl = Math.round(ml * 10) / 10;
  const liters    = Math.round((ml / 1000) * 10000) / 10000;

  if (ml < 1000) {
    return {
      primary:   `${roundedMl} mL`,
      secondary: `${liters.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')} L`,
    };
  }
  return {
    primary:   `${(ml / 1000).toFixed(2)} L`,
    secondary: `${roundedMl} mL`,
  };
}

// ============================================================
// EQUIVALÊNCIAS
// ============================================================

export function makeEquivalences(ml: number): Array<{ labelPt: string; valuePt: string }> {
  const results: Array<{ labelPt: string; valuePt: string }> = [];
  const eligible = EQUIVALENCES.filter((eq: Equivalence) => ml >= eq.minMl);

  for (const eq of eligible) {
    const count   = ml / eq.mlPerUnit;
    const fraseFn = FRASES_CRIATIVAS[eq.unitPt];

    const valuePt = fraseFn
      ? fraseFn(count)
      : count < 1
        ? `${fmtBr(count)} ${eq.unitPt}`
        : `cerca de ${fmtBr(count)} ${eq.labelPt}`;

    results.push({ labelPt: eq.labelPt, valuePt });
  }

  return results;
}

/**
 * Retorna uma equivalência aleatória entre as elegíveis para o volume dado.
 *
 * Para evitar repetição de "gotinhas" em todo volume pequeno, sorteia
 * entre as equivalências disponíveis com peso triangular: as do meio
 * da lista têm mais chance, mas todas podem aparecer.
 */
export function bestEquivalence(ml: number): { labelPt: string; valuePt: string } | null {
  const all = makeEquivalences(ml);
  if (all.length === 0) return null;
  if (all.length === 1) return all[0];

  // Filtra equivalências com número absurdo (>15 unidades da mesma coisa)
  const sensible = all.filter((eq) => {
    const match = eq.valuePt.match(/[\d.]+/);
    if (!match) return true;
    const num = parseFloat(match[0].replace(',', '.'));
    return num <= 15;
  });

  // Se filtrou tudo, usa a lista completa
  const pool = sensible.length > 0 ? sensible : all;
  if (pool.length === 1) return pool[0];

  // Peso triangular: índices do meio têm peso maior
  const weights = pool.map((_, i) => {
    const mid  = (pool.length - 1) / 2;
    const dist = Math.abs(i - mid);
    return Math.max(1, pool.length - dist);
  });

  const total = weights.reduce((a, b) => a + b, 0);
  let rand    = Math.random() * total;

  for (let i = 0; i < pool.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return pool[i];
  }

  return pool[pool.length - 1];
}
