'use client';

import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

type Props = {
  headTitle: string;
  title: string;
  subtitle?: string;
  image: string;
};

export default function HeroBanner({ headTitle, title, subtitle, image }: Props) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '120px']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Animation controls for typing effect
  const titleControls = useAnimation();
  const headControls = useAnimation();
  const subtitleControls = useAnimation();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      headControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } });
      subtitleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' } });
      titleControls.start(i => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05 + 0.3,
        },
      }));
    }
  }, [inView, headControls, subtitleControls, titleControls]);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        height: '100dvh',
        display: 'flex',
        top: -60,
        alignItems: { xs: 'center', md: 'flex-end' },
        justifyContent: { xs: 'center', md: 'flex-start' },
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y,
          scale,
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: '100%',
            height: '120%',
            objectFit: 'cover',
          }}
        />
      </motion.div>

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.2))',
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: (theme) => theme.breakpoints.values.xl,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <motion.div style={{ y: textY, opacity }}>
          <Box
            sx={{
              color: '#fff',
              textAlign: { xs: 'center', md: 'left' },
              pb: { xs: 0, md: 10 },
              maxWidth: { md: '60%' },
            }}
          >
            {/* Head Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headControls}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.8rem' },
                  mb: 1,
                }}
              >
                {headTitle}
              </Typography>
            </motion.div>

            {/* Title with typing animation */}
            <Typography
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: '2.5rem',
                  sm: '3.5rem',
                  md: '5.5rem',
                },
                lineHeight: 1.1,
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {Array.from(title).map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={titleControls}
                >
                  {char}
                </motion.span>
              ))}
            </Typography>

            {/* Subtitle */}
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={subtitleControls}
              >
                <Typography
                  mt={2}
                  sx={{
                    opacity: 0.9,
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                  }}
                >
                  {subtitle}
                </Typography>
              </motion.div>
            )}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}