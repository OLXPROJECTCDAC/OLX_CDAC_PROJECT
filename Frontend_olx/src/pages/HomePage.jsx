import React from 'react';
import { Box, VStack } from '@chakra-ui/react';

// Importing modular components
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import ListingsGrid from '../components/ListingsGrid';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <Box>
            {/* Top Navigation Bar */}
            <Navbar />

            {/* Main Page Content */}
            <VStack spacing={{ base: 4, md: 6 }} align="stretch" mt={2}>
                <Banner />         {/* Carousel banner at top - Ads */}
                <Categories />     {/* Scrollable category section */}
                <ListingsGrid />   {/* Grid of listing cards */}
            </VStack>

            {/* Bottom Footer */}
            <Footer />
        </Box>
    );
};

export default HomePage;
