import type { RandomSource } from '@/types/draw';

const UINT32_RANGE = 2 ** 32;

export const cryptoRandom: RandomSource = () => {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / UINT32_RANGE;
};

export function randomInt(maxExclusive: number, random = cryptoRandom) {
  return Math.floor(random() * maxExclusive);
}

export function shuffle<T>(items: readonly T[], random = cryptoRandom) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1, random);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
