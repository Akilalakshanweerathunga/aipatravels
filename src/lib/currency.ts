export type Rates = {
  [key: string]: number;
};

let cachedRates: Rates | null = null;
let lastFetch = 0;

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export async function getRates(): Promise<Rates> {
  const now = Date.now();

  // cache for 1 hour
  if (cachedRates && now - lastFetch < 1000 * 60 * 60) {
    return cachedRates;
  }

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    cachedRates = data.rates;
    lastFetch = now;

    return cachedRates || {};
  } catch (err) {
    console.error('Currency fetch failed', err);
    return cachedRates || { USD: 1 };
  }
}