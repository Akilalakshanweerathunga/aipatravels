'use client';

import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { currencies } from '@/data/config';

interface CurrencySwitcherProps {
  currentCurrency?: string;
  onChange?: (currency: string) => void; // ✅ IMPORTANT
}

export default function CurrencySwitcher({
  currentCurrency,
  onChange
}: CurrencySwitcherProps) {
  const [currency, setCurrency] = useState('USD');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // ✅ sync from props or cookie
  useEffect(() => {
    const saved =
      currentCurrency ||
      Cookies.get('NEXT_CURRENCY') ||
      'USD';

    setCurrency(saved);
  }, [currentCurrency]);

  const currentCurrencyObj = currencies.find(c => c.code === currency);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);

    // ✅ persist
    Cookies.set('NEXT_CURRENCY', selectedCurrency, {
      path: '/',
      expires: 365
    });

    // ✅ notify app (IMPORTANT for real-time conversion)
    if (onChange) {
      onChange(selectedCurrency);
    }

    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: 'white' }}>
        <Typography fontWeight={600}>
          {currentCurrencyObj?.symbol || currency}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock
      >
        {currencies.map((c) => (
          <MenuItem
            key={c.code}
            selected={c.code === currency}
            onClick={() => handleSelect(c.code)}
          >
            {c.code} ({c.symbol})
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}