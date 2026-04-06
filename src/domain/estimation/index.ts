import {
  CHARS_PER_TOKEN,
  RESPONSE_TOKEN_MULTIPLIER,
  BASE_WATER_ML_PER_INTERACTION,
  REFERENCE_TOKEN_COUNT,
  RANGE_MIN_FACTOR,
  RANGE_MAX_FACTOR,
  MODEL_MULTIPLIERS,
  EQUIVALENCES,
  type Equivalence,
} from './constants';

export function estimateTokens(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return Math.max(1, Math.round(trimmed.length / CHARS_PER_TOKEN));
}

export function estimateResponseTokens(promptTokens: number): number {
  return Math.round(promptTokens * RESPONSE_TOKEN_MULTIPLIER);
}

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
  const scale = totalTokens / REFERENCE_TOKEN_COUNT;
  const modelMult = MODEL_MULTIPLIERS[modelKey]?.multiplier ?? 1.0;

  const ml = Math.round(BASE_WATER_ML_PER_INTERACTION * scale * modelMult * 100) / 100;
  const minMl = Math.round(ml * RANGE_MIN_FACTOR * 100) / 100;
  const maxMl = Math.round(ml * RANGE_MAX_FACTOR * 100) / 100;

  return { ml, minMl, maxMl };
}

export function formatWater(ml: number): { primary: string; secondary: string } {
  const roundedMl = Math.round(ml * 10) / 10;
  const liters = Math.round((ml / 1000) * 10000) / 10000;

  if (ml < 1000) {
    return {
      primary: `${roundedMl} mL`,
      secondary: `${liters.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')} L`,
    };
  }
  return {
    primary: `${(ml / 1000).toFixed(2)} L`,
    secondary: `${roundedMl} mL`,
  };
}

export function makeEquivalences(ml: number): Array<{ labelPt: string; valuePt: string }> {
  const results: Array<{ labelPt: string; valuePt: string }> = [];
  const eligible = EQUIVALENCES.filter((eq: Equivalence) => ml >= eq.minMl);

  for (const eq of eligible) {
    const count = ml / eq.mlPerUnit;
    let valuePt: string;

    if (count < 0.01) {
      valuePt = `menos de 0,01 ${eq.unitPt}`;
    } else if (count < 1) {
      valuePt = `cerca de ${count.toFixed(2).replace('.', ',')} ${eq.unitPt}`;
    } else {
      const rounded = Math.round(count * 10) / 10;
      valuePt = `cerca de ${rounded.toString().replace('.', ',')} ${eq.labelPt}`;
    }

    results.push({ labelPt: eq.labelPt, valuePt });
  }

  return results;
}

export function bestEquivalence(ml: number): { labelPt: string; valuePt: string } | null {
  const all = makeEquivalences(ml);
  if (all.length === 0) return null;

  let best = all[0];
  let bestScore = Infinity;

  for (const eq of all) {
    const match = eq.valuePt.match(/[\d,]+/);
    if (match) {
      const num = parseFloat(match[0].replace(',', '.'));
      const score = Math.abs(Math.log10(Math.max(num, 0.01)) - 0.5);
      if (score < bestScore) {
        bestScore = score;
        best = eq;
      }
    }
  }

  return best;
}
