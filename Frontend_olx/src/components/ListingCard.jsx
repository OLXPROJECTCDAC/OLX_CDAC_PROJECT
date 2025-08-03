import React, { useState } from 'react';
import { Box, Image, IconButton, Badge, Text, Flex } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ListingCard = ({ data }) => {
    const [liked, setLiked] = useState(false);

    if (!data) return null;

    return (
        <Box
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            shadow="sm"
            bg="white"
            display="flex"
            flexDirection="column"
            height="100%"
            _hover={{ shadow: 'md', transform: { base: 'none', md: 'scale(1.02)' }, transition: '0.2s' }}
        >
            {/* Image */}
            <Box position="relative">
                <Image
                    src={data.image}
                    alt={data.title}
                    height={{ base: "160px", sm: "180px", md: "200px" }} // Responsive image height
                    width="100%"
                    objectFit="cover"
                    borderTopRadius="md"
                />
                <IconButton
                    icon={liked ? <FaHeart color="red" /> : <FaRegHeart />}
                    onClick={() => setLiked(!liked)}
                    aria-label="Add to Wishlist"
                    variant="ghost"
                    size="sm"
                    position="absolute"
                    top={2}
                    right={2}
                    bg="white"
                    borderRadius="full"
                    shadow="sm"
                    _hover={{ bg: 'gray.100' }}
                />
            </Box>

            {/* Content */}
            <Box p={{ base: 2, md: 3 }} flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                    {data.featured ? (
                        <Badge colorScheme="yellow" mb={2} fontSize={{ base: "xs", md: "sm" }}>
                            FEATURED
                        </Badge>
                    ) : (
                        <Box height="20px" mb={2} />
                    )}
                    <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }} mb={1}>
                        ₹ {data.price}
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} noOfLines={2} minHeight="32px">
                        {data.title}
                    </Text>
                </Box>

                <Flex justify="space-between" mt={2}>
                    <Text fontSize={{ base: "xs", md: "xs" }} color="gray.500" isTruncated>
                        {data.location}
                    </Text>
                    <Text fontSize={{ base: "xs", md: "xs" }} color="gray.500">
                        {data.date}
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};

export default ListingCard;
