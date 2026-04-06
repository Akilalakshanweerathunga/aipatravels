import { getRates } from './currency';

export async function convertPriceValue(
  amountUSD: number,
  targetCurrency: string
): Promise<number> {
  const rates = await getRates();

  const rate = rates[targetCurrency] || 1;

  return amountUSD * rate;
}