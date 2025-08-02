import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Select,
  Input,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Text,
  HStack,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { FaHeart, FaBell, FaComments, FaPlus, FaBars } from 'react-icons/fa';
import { SearchIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState('left');

  const userInitial = 'S';
  const userName = 'Shubham Jadhav';

  return (
    <Box bg="gray.100" shadow="sm" py={2} px={4}>
      <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
        {/* Left Section */}
        <HStack spacing={3}>
          {/* Hamburger Menu (Mobile) */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            icon={<FaBars />}
            aria-label="Open Menu"
            variant="ghost"
            onClick={onOpen}
          />
          {/* OLX Logo */}
          <Image
            src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
            alt="OLX Logo"
            boxSize="50px"
          />
        </HStack>

        {/* Location Selector (Hidden on very small screens) */}
        <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
          <Box color="blue.500" fontSize="lg">📍</Box>
          <Select variant="unstyled" size="sm" minW="120px" fontSize="sm" defaultValue="India">
            <option>India</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
            <option>Bangalore</option>
          </Select>
        </HStack>

        {/* Search Bar (Hidden on very small screens) */}
        <Flex flex="1" mx={4} maxW="500px" display={{ base: 'none', md: 'flex' }}>
          <Input
            placeholder='Search "Jobs"'
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{ borderColor: 'blue.500' }}
          />
          <IconButton ml={2} aria-label="Search" icon={<SearchIcon />} colorScheme="blue" size="lg" />
        </Flex>

        {/* Right Side (Desktop) */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <IconButton icon={<FaHeart />} aria-label="Favorites" variant="ghost" size="lg" />
          <IconButton icon={<FaComments />} aria-label="Chat" variant="ghost" size="lg" />
          <IconButton icon={<FaBell />} aria-label="Notifications" variant="ghost" size="lg" />

          {/* User Menu */}
          <Menu>
            <MenuButton>
              <Avatar name={userInitial} size="sm" bg="purple.500" />
            </MenuButton>
            <MenuList>
              <VStack align="start" px={4} py={2} borderBottom="1px" borderColor="gray.100">
                <Avatar size="sm" name={userInitial} bg="purple.500" />
                <Box>
                  <Text fontWeight="bold">{userName}</Text>
                  <Text as="a" href="/profile" fontSize="sm" color="blue.500">
                    View & edit profile
                  </Text>
                </Box>
              </VStack>
              <MenuItem as="a" href="/my-ads">My ADS</MenuItem>
              <MenuItem as="a" href="/business-packages">Buy Business Packages</MenuItem>
              <MenuItem as="a" href="/cart">View Cart</MenuItem>
              <MenuItem as="a" href="/billing">Bought Packages & Billing</MenuItem>
              <MenuDivider />
              <MenuItem as="a" href="/help">Help</MenuItem>
              <MenuItem as="a" href="/settings">Settings</MenuItem>
              <MenuItem as="a" href="/install">Install OLX Lite App</MenuItem>
              <MenuDivider />
              <MenuItem as="a" href="/logout" color="red.500">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Sell Button */}
          <Button leftIcon={<FaPlus />} variant="outline" colorScheme="blue" borderRadius="full" px={6}>
            SELL
          </Button>
        </HStack>
      </Flex>

      {/* Drawer for Mobile */}
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Button variant="ghost" leftIcon={<FaHeart />}>Favorites</Button>
              <Button variant="ghost" leftIcon={<FaComments />}>Chat</Button>
              <Button variant="ghost" leftIcon={<FaBell />}>Notifications</Button>
              <Button variant="solid" colorScheme="blue" leftIcon={<FaPlus />}>
                SELL
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
