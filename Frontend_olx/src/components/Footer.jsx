import React from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  Image,
  HStack,
  VStack,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* ---------- Top Section ---------- */}
      <Box bg="gray.100" color="gray.800" py={8} px={4}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
          spacing={8}
          maxW="container.lg"
          mx="auto"
        >
          {/* Popular Locations */}
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold" fontSize="sm">
              POPULAR LOCATIONS
            </Text>
            <Link href="#" fontSize="sm" color="gray.700" _hover={{ color: "blue.500" }}>Kolkata</Link>
            <Link href="#" fontSize="sm" color="gray.700" _hover={{ color: "blue.500" }}>Mumbai</Link>
            <Link href="#" fontSize="sm" color="gray.700" _hover={{ color: "blue.500" }}>Chennai</Link>
            <Link href="#" fontSize="sm" color="gray.700" _hover={{ color: "blue.500" }}>Pune</Link>
          </VStack>

          {/* Company Information */}
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold" fontSize="sm">
              COMPANY
            </Text>
            <Link href="#" fontSize="sm" color="gray.700" _hover={{ color: "blue.500" }}>About Us</Link>
            <Link href="#" fontSize="sm" color="gray.700" _hover={{ color: "blue.500" }}>Careers</Link>
            <Link href="#" fontSize="sm" color="gray.700" _hover={{ color: "blue.500" }}>Contact Us</Link>
          </VStack>

          {/* Social Media */}
          <VStack align="start" spacing={3}>
            <Text fontWeight="bold" fontSize="sm">
              FOLLOW US
            </Text>
            <HStack spacing={4}>
              <Link href="#" color="gray.700" _hover={{ color: "blue.500" }}>
                <Icon as={FaFacebook} boxSize={5} />
              </Link>
              <Link href="#" color="gray.700" _hover={{ color: "blue.500" }}>
                <Icon as={FaTwitter} boxSize={5} />
              </Link>
              <Link href="#" color="gray.700" _hover={{ color: "blue.500" }}>
                <Icon as={FaInstagram} boxSize={5} />
              </Link>
              <Link href="#" color="gray.700" _hover={{ color: "blue.500" }}>
                <Icon as={FaYoutube} boxSize={5} />
              </Link>
            </HStack>
          </VStack>

          {/* Other Platforms */}
          <VStack align="start" spacing={3}>
            <Text fontWeight="bold" fontSize="sm">
              OTHER PLATFORMS
            </Text>
            <Link href="#" isExternal>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play Store"
                height="40px"
              />
            </Link>
            <Link href="#" isExternal>
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Apple App Store"
                height="40px"
              />
            </Link>
          </VStack>
        </SimpleGrid>
      </Box>

      {/* ---------- Bottom Bar ---------- */}
      <Box bg="blue.500" color="white" py={4} px={4}>
        <Flex
          maxW="container.xl"
          mx="auto"
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
          textAlign={{ base: "center", md: "left" }}
          gap={3}
        >
          {/* Logo */}
          <HStack justify={{ base: "center", md: "flex-start" }}>
            <Image
              src="https://statics.olx.in/external/base/img/cartrade/logo/olx_2025.svg?v=1"
              alt="OLX"
              boxSize="50px"
            />
          </HStack>

          {/* Copyright */}
          <Text fontSize="sm">All rights reserved © 2006-2025 OLX</Text>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
