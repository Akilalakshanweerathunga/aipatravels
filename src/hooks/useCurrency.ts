'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { convertPriceValue } from '@/lib/convertPrice';

export function useCurrency() {
  const [currency, setCurrency] = useState('USD');
  const [ratesReady, setRatesReady] = useState(false);

  useEffect(() => {
    const saved = Cookies.get('NEXT_CURRENCY') || 'USD';
    setCurrency(saved);
    setRatesReady(true);
  }, []);

  const convertPrice = async (amountUSD: number): Promise<string> => {
    const converted = await convertPriceValue(amountUSD, currency);

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(converted);
  };

  return { currency, convertPrice, ratesReady };
}