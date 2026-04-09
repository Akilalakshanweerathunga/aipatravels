'use client';

import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';

export default function BlogCard({ post }: { post: BlogPost }) {
  const { t,i18n } = useTranslation();
  const locale = i18n.language.split('-')[0];

  // Formatting date safely
  const formattedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString(locale) 
    : '';

  return (
    <Card
      component={Link}
      href={`/${locale}/blogs/${post.slug}`}
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        textDecoration: 'none',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.35s ease',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        },
        '&:hover img': { transform: 'scale(1.08)' }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="240"
          image={post.image_url || '/images/placeholder.jpg'}
          alt={post.title}
          sx={{ transition: 'transform 0.6s ease', height: 240, objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
        <Chip
          label={post.category}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
            fontWeight: 600,
          }}
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Typography variant="caption" color="text.secondary">
          {formattedDate}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, mb: 1, color: 'text.primary' }}>
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 14, color: 'primary.main' }}>
          {t('blog.readMore')} <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
        </Box>
      </CardContent>
    </Card>
  );
}