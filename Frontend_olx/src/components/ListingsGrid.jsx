import React from 'react';
import { Grid, Text, Box, Center, Spinner } from '@chakra-ui/react';
import ListingCard from './ListingCard';

const ListingsGrid = ({
    items = [],
    loading = false,
    err = '',
    currentArea,
    currentKeyword,
}) => {
    const areaLabel = currentArea || 'your area';
    const kw = (currentKeyword || '').trim();

    if (loading) {
        return (
            <Center py={8}>
                <Spinner size="lg" />
            </Center>
        );
    }

    if (err) {
        return (
            <Box maxW="container.xl" mx="auto" my={{ base: 3, md: 6 }} px={{ base: 3, md: 6 }}>
                <Text color="red.500">Failed to load products: {err}</Text>
            </Box>
        );
    }

    const header = kw
        ? `Results in ${areaLabel} for "${kw}"`
        : `Fresh Recommendations — ${areaLabel}`;

    return (
        <Box maxW="container.xl" mx="auto" my={{ base: 3, md: 6 }} px={{ base: 3, md: 6 }}>
            <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold" mb={{ base: 3, md: 4 }}>
                {header}
            </Text>

            <Grid
                templateColumns={{
                    base: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
                gap={{ base: 3, md: 5 }}
                align="stretch"
            >
                {items.map((item, i) => (
                    <ListingCard key={item?.id ?? `item-${i}`} data={item} />
                ))}
            </Grid>

            {!items.length && (
                <Text mt={4} color="gray.600">
                    No products found{kw ? ` for "${kw}"` : ''} in {areaLabel}.
                </Text>
            )}
        </Box>
    );
};

export default ListingsGrid;
