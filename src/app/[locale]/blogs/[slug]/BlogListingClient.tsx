"use client";

import { Container, Typography, Box, Button, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface BlogPostDetailClientProps {
  post: any;
  locale: string;
}

export default function BlogPostDetailClient({ post, locale }: BlogPostDetailClientProps) {
  const { t, i18n } = useTranslation();

  // Sync i18n language with the URL locale
  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      {/* BACK BUTTON */}
      <Box sx={{ mb: 4 }}>
        <Link href={`/${locale}/blogs`} style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ fontWeight: 600, textTransform: 'none' }}
          >
            {t('blog.backToStories') || 'Back to Stories'}
          </Button>
        </Link>
      </Box>

      {/* HEADER */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
          {post.category}
        </Typography>
        
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 900, mt: 1, mb: 3,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            lineHeight: 1.1
          }}
        >
          {post.title}
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6, fontWeight: 400 }}>
          {post.excerpt}
        </Typography>
        
        <Typography variant="caption" display="block" sx={{ mt: 3, color: 'text.disabled' }}>
          {t('blog.publishedOn')} {new Date(post.published_at).toLocaleDateString(locale)}
        </Typography>
      </Box>

      {/* IMAGE */}
      {post.image_url && (
        <Box
          component="img"
          src={post.image_url}
          alt={post.title}
          sx={{ width: '100%', height: 'auto', borderRadius: 6, mb: 8, boxShadow: 3 }}
        />
      )}

      {/* CONTENT */}
      <Box sx={{ whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: 1.8 }}>
        {post.content}
      </Box>

      <Divider sx={{ my: 10 }} />

      {/* FOOTER CTA */}
      <Box sx={{ textAlign: 'center', py: 5, bgcolor: '#f9f9f9', borderRadius: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          {t('blog.exploreMore') || 'Explore more of Sri Lanka'}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
                   {t('blog.idescription')}
        </Typography>
        <Link href={`/${locale}/itineraries`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ borderRadius: 10, px: 4, mt: 2 }}>
            {t('blog.viewItineraries') || 'View Itineraries'}
          </Button>
        </Link>
      </Box>
    </Container>
  );
}