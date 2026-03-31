'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';


export default function DestinationPage() {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: (theme) => theme.breakpoints.values.md,
                mx: 'auto',
                px: { xs: 2, sm: 3, md: 4 }, 
                mt: 4,
            }}
        >
            <Box>
                <Typography variant="h3" component="h1" gutterBottom>
                    Destination Details
                </Typography>
                <Typography variant="body1">
                    This is the destination details page. Customize this page to display information about the selected destination.
                </Typography>
            </Box>
        </Box>
    );
}