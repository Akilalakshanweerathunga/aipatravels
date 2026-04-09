"use client";

import { Container, Typography, Box } from '@mui/material';
import BlogCard from '@/components/blog/BlogCard';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface BlogListingClientProps {
  posts: any[];
  activeLocale: string;
}

export default function BlogListingClient({ posts, activeLocale }: BlogListingClientProps) {
  const { t, i18n } = useTranslation();

  // Force i18next to sync with the URL locale
  useEffect(() => {
    if (activeLocale && i18n.language !== activeLocale) {
      i18n.changeLanguage(activeLocale);
    }
  }, [activeLocale, i18n]);

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 900,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            mb: 2 
          }}
        >
          {t('blog.title')}
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary', 
            fontWeight: 400,
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          {t('blog.description')}
        </Typography>
      </Box>

      {posts && posts.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              lg: 'repeat(3, 1fr)' 
            },
            gap: 4,
          }}
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography color="text.secondary">
            {t('blog.noPostsFound')}
          </Typography>
        </Box>
      )}
    </Container>
  );
}