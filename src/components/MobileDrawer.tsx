'use client';

import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import Link from 'next/link';
import { navLinks } from '@/data/links';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  locale: string;
}

export default function MobileDrawer({ open, onClose, locale }: MobileDrawerProps) {
  const { t } = useTranslation();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          pt:5,
          width: 280,
          backdropFilter: 'blur(20px)',
          background: 'rgba(221, 221, 221, 0.85)',
          color: '#000000',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Menu
          </Typography>

          <IconButton onClick={onClose} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Links */}
        <List sx={{ px: 1, mt: 1 }}>
          {navLinks.map((link) => {
            const fullPath = `/${locale}${link.path}`;

            return (
              <ListItemButton
                key={link.name}
                onClick={onClose}
                sx={{
                  borderRadius: '12px',
                  mb: 0.5,
                  px: 2,
                  py: 1.2,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.08)',
                    transform: 'translateX(6px)',
                  },
                }}
              >
                <Link
                  href={fullPath}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: '100%',
                  }}
                >
                  <ListItemText
                    primary={t(link.name)}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                    }}
                  />
                </Link>
              </ListItemButton>
            );
          })}
        </List>

        {/* Footer */}
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

          <Typography
            variant="body2"
            sx={{ opacity: 0.6, textAlign: 'center' }}
          >
            © {new Date().getFullYear()} AIPA Travels
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}