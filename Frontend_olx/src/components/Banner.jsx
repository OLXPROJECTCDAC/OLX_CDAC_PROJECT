import React, { useState } from 'react';
import { Box, Image, IconButton, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import bannerData from '../data/bannerData.json'; // ✅ Importing banner data from JSON

const Banner = () => {
    const banners = bannerData; // Using imported JSON data
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box
            position="relative"
            width="100%"
            maxW="container.xl"
            mx="auto"
            overflow="hidden"
            mb={{ base: 3, md: 5 }}
        >
            {/* Carousel Image (Responsive) */}
            <Image
                src={banners[currentIndex].image}
                alt={`Banner ${currentIndex + 1}`}
                width="100%"
                maxH={{ base: "180px", sm: "240px", md: "320px" }}
                objectFit="contain"  // ✅ No cropping
                borderRadius="md"
                bg="gray.200" // Fills background behind contained image
            />

            {/* Carousel Controls */}
            <Flex
                justify="space-between"
                align="center"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                px={{ base: 1, sm: 2 }}
            >
                <IconButton
                    icon={<ChevronLeftIcon boxSize={{ base: 6, md: 8 }} />}
                    onClick={prevSlide}
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    size={{ base: "sm", md: "lg" }}
                    aria-label="Previous Banner"
                />
                <IconButton
                    icon={<ChevronRightIcon boxSize={{ base: 6, md: 8 }} />}
                    onClick={nextSlide}
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    size={{ base: "sm", md: "lg" }}
                    aria-label="Next Banner"
                />
            </Flex>
        </Box>
    );
};

export default Banner;
