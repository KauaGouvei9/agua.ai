export const CHARS_PER_TOKEN = 4;

export const RESPONSE_TOKEN_MULTIPLIER = 3;

export const BASE_WATER_ML_PER_INTERACTION = 25;

export const REFERENCE_TOKEN_COUNT = 100;

export const RANGE_MIN_FACTOR = 0.5;
export const RANGE_MAX_FACTOR = 2.0;

export const MODEL_MULTIPLIERS: Record<string, { label: string; multiplier: number }> = {
  chatgpt: { label: 'ChatGPT', multiplier: 1.0 },
  gemini:  { label: 'Gemini',  multiplier: 0.95 },
  grok:    { label: 'Grok',    multiplier: 1.05 },
};

export interface Equivalence {
  labelPt: string;
  unitPt: string;
  mlPerUnit: number;
  minMl: number;
}

export const EQUIVALENCES: Equivalence[] = [
  {
    labelPt: 'copos de agua (200 mL)',
    unitPt: 'copo',
    mlPerUnit: 200,
    minMl: 0,
  },
  {
    labelPt: 'garrafas de 500 mL',
    unitPt: 'garrafa',
    mlPerUnit: 500,
    minMl: 100,
  },
  {
    labelPt: 'vezes escovando os dentes (torneira aberta ~12 L)',
    unitPt: 'escovacao',
    mlPerUnit: 12_000,
    minMl: 5_000,
  },
  {
    labelPt: 'banhos de 5 minutos (~45 L)',
    unitPt: 'banho',
    mlPerUnit: 45_000,
    minMl: 20_000,
  },
];
