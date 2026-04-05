'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Select,
  MenuItem
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuIcon from '@mui/icons-material/Menu';

import MobileDrawer from './MobileDrawer';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';
import { navLinks } from '@/data/links';
import { company } from '@/data/company';
import { currencies } from '@/data/config';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface NavbarProps {
  locale?: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [currency, setCurrency] = useState('LKR');

  const [currentLocale, setCurrentLocale] = useState(locale || 'en');

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setShrink(current > 80);
      setShowTopBar(current < lastScroll || current < 50);
      setLastScroll(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const forceWhiteBgRoutes = [
    `/${currentLocale}/about-us`,
    `/${currentLocale}/itineraries`,
    `/${currentLocale}/tailor-made`,
    `/${currentLocale}/contact-us`,
    `/${currentLocale}/privacy-policy`,
    `/${currentLocale}/terms-and-conditions`,
    
  ];

  const forceWhiteBg = forceWhiteBgRoutes.includes(pathname);
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: showTopBar ? 0 : -40,
          width: '100%',
          height: 40,
          bgcolor: '#657a42',
          color: 'white',
          display: 'flex',
          justifyContent: { xs: 'flex-end', sm: 'space-between'},
          px: 3,
          alignItems: 'center',
          transition: '0.3s',
          zIndex: 1300
        }}
      >
        <Box
          display="flex"
          gap={1}
          sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'flex' } }}
          onClick={() => window.open(`https://wa.me/${company.whatsapp}`)}
        >
          <WhatsAppIcon fontSize="small" />
          <Typography variant="body2">{t('nav.chatWithUs')}</Typography>
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          <Typography variant="body2">{company.phone}</Typography>
          <Typography variant="body2">{company.email}</Typography>

          <LanguageSwitcher />
        </Box>
      </Box>

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: showTopBar ? 40 : 0,
          bgcolor: scrolled || forceWhiteBg ? 'white' : 'transparent',
          color: scrolled || forceWhiteBg ? 'black' : 'white',
          borderColor: scrolled || forceWhiteBg ? '#ddd' : '#fff',
          borderBottom: '1px solid',
          transition: '0.3s'
        }}
      >
        <Toolbar
          sx={{
            minHeight: shrink ? 60 : 80,
            transition: '0.3s',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', width: '100%' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Image
                src={company.logo}
                alt={company.name}
                width={shrink ? 100 : 110}
                height={40}
                priority
                style={{ objectFit: 'contain', transition: '0.3s' }}
              />
            </Box>
            {navLinks.map((link) => {
              const fullPath = `/${currentLocale}${link.path}`;
              const isActive = pathname === fullPath;
              return (
                <Button
                  key={link.name}
                  component={Link}
                  href={fullPath}
                  sx={{
                    color: 'inherit',
                    borderBottom: isActive ? '2px solid' : 'none'
                  }}
                >
                  {t(link.name)}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Image
              src={company.logo}
              alt={company.name}
              width={shrink ? 100 : 110}
              height={40}
              priority
              style={{ objectFit: 'contain', transition: '0.3s' }}
            />
          </Box>
          <Box display="flex" alignItems="center">

            <IconButton
              sx={{ display: { md: 'none' }, color: scrolled || forceWhiteBg ? 'black' : 'white', }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        locale={currentLocale}
      />

      <Box height={100} />
    </>
  );
}