import React from 'react';
import { Grid, Text, Box } from '@chakra-ui/react';
import ListingCard from './ListingCard';
import listingData from '../data/listingData.json';

const ListingsGrid = () => {
    return (
        <Box maxW="container.xl" mx="auto" my={{ base: 3, md: 6 }} px={{ base: 3, md: 6 }}>
            {/* Section Heading */}
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={{ base: 3, md: 4 }}>
                Fresh Recommendations
            </Text>

            {/* Responsive Grid */}
            <Grid
                templateColumns={{
                    base: "1fr",             // Mobile: 1 column
                    sm: "repeat(2, 1fr)",    // Tablets: 2 columns
                    md: "repeat(3, 1fr)",    // Medium screens: 3 columns
                    lg: "repeat(4, 1fr)"     // Desktop: 4 columns
                }}
                gap={{ base: 3, md: 5 }}    // Adaptive gaps
                align="stretch"
            >
                {listingData.map((item) => (
                    <ListingCard key={item.id} data={item} />
                ))}
            </Grid>
        </Box>
    );
};

export default ListingsGrid;
