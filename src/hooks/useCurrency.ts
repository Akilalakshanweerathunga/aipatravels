'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getRates, Rates } from '@/lib/currency';

export function useCurrency() {
  const [currency, setCurrency] = useState('USD');
  const [rates, setRates] = useState<Rates>({ USD: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initCurrency = async () => {
      const saved = Cookies.get('NEXT_CURRENCY') || 'USD';
      setCurrency(saved);

      const fetchedRates = await getRates();
      setRates(fetchedRates);
      setLoading(false);
    };

    initCurrency();
  }, []);

  const formatPrice = (amountUSD: number): string => {
    const rate = rates[currency] || 1;
    const converted = amountUSD * rate;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  return { currency, formatPrice, loading };
}