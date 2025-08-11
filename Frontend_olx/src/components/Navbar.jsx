// src/components/Navbar.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box, Flex, Image, Input, IconButton, Button, Menu,
  MenuButton, MenuList, MenuItem, MenuDivider, Avatar, Text,
  HStack, VStack, Drawer, DrawerOverlay, DrawerContent,
  DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, Stack
} from '@chakra-ui/react';
import { FaHeart, FaPlus, FaBars } from 'react-icons/fa';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import locationsData from '../data/locations.json';
import { getAuth, isLoggedIn, clearAuth, getUserInitial, isSessionValid, logout } from '../utils/auth';


const API_BASE = "http://localhost:8080";

const formatArea = (s = '') =>
  s.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const Navbar = ({ selectedArea, initialKeyword = '', onSearch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState('left');
  const navigate = useNavigate();

  const [area, setArea] = useState(selectedArea || '');
  const [keyword, setKeyword] = useState(initialKeyword || '');

  const [auth, setAuthState] = useState(getAuth());
  const loggedIn = !!(auth && auth.accessToken);
  const userInitial = getUserInitial();
  const userName = [auth?.firstName, auth?.lastName].filter(Boolean).join(' ') || auth?.email || 'User';

  // react to login/logout from other components/tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'olx_auth' || e.key === 'olx_auth_ping') {
        setAuthState(getAuth());
      }
    };
    window.addEventListener('storage', onStorage);

    // drop expired session on mount + periodic check
    const dropIfExpired = () => {
      const a = getAuth();
      if (a?.accessToken && !isSessionValid()) {
        clearAuth();
        localStorage.setItem("olx_auth_ping", String(Date.now()));
        setAuthState(null);
      }
    };
    dropIfExpired();
    const id = setInterval(dropIfExpired, 60000);

    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(id);
    };
  }, []);

  const areaOptions = useMemo(() => {
    const seen = new Set();
    return locationsData
      .map(l => (l?.area || '').trim())
      .filter(a => a && !seen.has(a.toLowerCase()) && seen.add(a.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));
  }, []);

  const goToLogin = () => navigate('/login');
  const goToPostAd = () => (isLoggedIn() ? navigate('/post-ad') : goToLogin());

  const triggerSearch = () => {
    const finalArea = area || selectedArea || areaOptions[0] || 'PUNE_CITY';
    onSearch?.(finalArea, keyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') triggerSearch();
  };

  const handleLogout = async () => {
    await logout({ serverLogout: true, apiBase: API_BASE });
    setAuthState(null);
    navigate('/login', { replace: true });
  };

  const goWishlist = () => {
    if (!isLoggedIn()) return goToLogin();
    navigate('/wishlist');
  };

  return (
    <Box bg="gray.100" shadow="sm" py={2} px={4}>
      <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
        <HStack spacing={3}>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            icon={<FaBars />}
            aria-label="Open Menu"
            variant="ghost"
            onClick={onOpen}
          />
          <Image
            src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
            alt="OLX Logo"
            boxSize="50px"
            onClick={() => navigate('/')}
            cursor="pointer"
          />
        </HStack>

        <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
          <Box color="blue.500" fontSize="lg">📍</Box>
          <Menu matchWidth>
            <MenuButton
              as={Button}
              variant="ghost"
              size="sm"
              rightIcon={<ChevronDownIcon />}
              minW="220px"
              justifyContent="flex-start"
              fontWeight="normal"
            >
              <Box as="span" color={area ? 'inherit' : 'gray.500'}>
                {area ? formatArea(area) : (selectedArea ? formatArea(selectedArea) : 'Select area')}
              </Box>
            </MenuButton>
            <MenuList maxH="280px" overflowY="auto" py={0}>
              {areaOptions.map(opt => (
                <MenuItem key={opt} onClick={() => setArea(opt)} fontSize="sm" py={2.5}>
                  {formatArea(opt)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>

        <Flex flex="1" mx={4} maxW="500px" display={{ base: 'none', md: 'flex' }}>
          <Input
            placeholder='Search Products'
            size="lg"
            borderRadius="md"
            bg="white"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            _focus={{ borderColor: 'blue.500' }}
          />
          <IconButton
            ml={2}
            aria-label="Search"
            icon={<SearchIcon />}
            colorScheme="blue"
            size="lg"
            onClick={triggerSearch}
          />
        </Flex>

        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <IconButton icon={<FaHeart />} aria-label="Favorites" variant="ghost" size="lg" onClick={goWishlist} />

          {loggedIn ? (
            <>
              <Menu>
                <MenuButton>
                  <Avatar name={userInitial} size="sm" bg="purple.500" />
                </MenuButton>
                <MenuList>
                  <VStack align="start" px={4} py={2} borderBottom="1px" borderColor="gray.100">
                    <Avatar size="sm" name={userInitial} bg="purple.500" />
                    <Box>
                      <Text fontWeight="bold">{userName}</Text>
                      <Text as="a" href="/profile" fontSize="sm" color="blue.500">View & edit profile</Text>
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
                  <MenuItem onClick={handleLogout} color="red.500">Logout</MenuItem>
                </MenuList>
              </Menu>

              <Button
                leftIcon={<FaPlus />}
                variant="outline"
                colorScheme="blue"
                borderRadius="full"
                px={6}
                onClick={goToPostAd}
              >
                SELL
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={goToLogin}>Login</Button>
              <Button
                leftIcon={<FaPlus />}
                variant="outline"
                colorScheme="blue"
                borderRadius="full"
                px={6}
                onClick={goToLogin}
              >
                SELL
              </Button>
            </>
          )}
        </HStack>
      </Flex>

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Button variant="ghost" leftIcon={<FaHeart />} onClick={goWishlist}>Wishlist</Button>
              {loggedIn ? (
                <>
                  <Button variant="ghost" onClick={() => navigate('/my-ads')}>My ADS</Button>
                  <Button variant="solid" colorScheme="blue" leftIcon={<FaPlus />} onClick={goToPostAd}>
                    SELL
                  </Button>
                  <Button variant="outline" colorScheme="red" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="solid" colorScheme="blue" onClick={goToLogin}>Login</Button>
                  <Button variant="outline" colorScheme="blue" leftIcon={<FaPlus />} onClick={goToLogin}>
                    SELL
                  </Button>
                </>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
