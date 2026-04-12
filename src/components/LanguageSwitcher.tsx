"use client";

import React, { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import i18n from "@/i18n/i18n";
import Cookies from "js-cookie";
import { locales, Locale } from "@/i18n/settings";

const flagMap: Record<Locale, string> = {
  en: "https://flagcdn.com/w20/gb.png",
  fr: "https://flagcdn.com/w20/fr.png",
  it: "https://flagcdn.com/w20/it.png",
  kr: "https://flagcdn.com/w20/kr.png",
  cn: "https://flagcdn.com/w20/cn.png",
  ru: "https://flagcdn.com/w20/ru.png",
  jp: "https://flagcdn.com/w20/jp.png",
};

interface LanguageSwitcherProps {
  currentLocale?: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const defaultLocale: Locale =
    locales.find((loc) => pathname.startsWith(`/${loc}`)) || "en";

  const [locale, setLocale] = useState<Locale>(currentLocale || defaultLocale);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setLocale(currentLocale || defaultLocale);
    i18n.changeLanguage(currentLocale || defaultLocale);
  }, [pathname, currentLocale, defaultLocale]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (selectedLocale: Locale) => {
    setLocale(selectedLocale);
    i18n.changeLanguage(selectedLocale);
    Cookies.set("NEXT_LOCALE", selectedLocale, { path: "/", expires: 365 });

    handleClose();

    // Replace the first segment of the pathname with the selected locale
    const segments = pathname.split("/").filter(Boolean); // ["en", "about"] => ["en", "about"]
    
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = selectedLocale; // replace existing locale
    } else {
      segments.unshift(selectedLocale); // add locale at beginning if not present
    }

    const newPathname = "/" + segments.join("/");
    if (pathname !== newPathname) router.push(newPathname);
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ p: 0 }}>
        <Box sx={{ width: 24, height: 16, position: "relative" }}>
          <Image src={flagMap[locale]} alt={locale} sizes="20px" fill style={{ objectFit: "cover" }} />
        </Box>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock
      >
        {locales.map((loc) => (
          <MenuItem
            key={loc}
            onClick={() => handleSelect(loc)}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box sx={{ width: 24, height: 16, position: "relative" }}>
              <Image src={flagMap[loc]} alt={loc} fill sizes="20px" style={{ objectFit: "cover" }} />
            </Box>
            {loc.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
