'use client';

import React from 'react';
import { Container, Typography, Box } from '@mui/material';


export default function DestinationPage() {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box>
                <Typography variant="h3" component="h1" gutterBottom>
                    Destination Details
                </Typography>
                <Typography variant="body1">
                    This is the destination details page. Customize this page to display information about the selected destination.
                </Typography>
            </Box>
        </Container>
    );
}