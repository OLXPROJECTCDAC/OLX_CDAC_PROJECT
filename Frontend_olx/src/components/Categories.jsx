import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import categories from '../data/categories.json'; // Import JSON data

const Categories = () => {
  return (
    <Box maxW="container.lg" mx="auto" my={4}>
      {/* Section Title */}
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        Browse Categories
      </Text>

      {/* Scrollable category cards */}
      <Flex overflowX="auto" gap={3}>
        {categories.map((category, index) => (
          <Box
            key={index}
            textAlign="center"
            px={3}
            py={2}
            borderWidth="1px"
            borderRadius="md"
            minW="100px"
            cursor="pointer"
            _hover={{ boxShadow: 'md', transform: 'scale(1.05)', transition: '0.2s' }}
            flexShrink={0}
          >
            {/* Emoji Icon */}
            <Text fontSize="2xl">{category.icon}</Text>

            {/* Category Label */}
            <Text fontSize="sm" mt={1}>
              {category.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
