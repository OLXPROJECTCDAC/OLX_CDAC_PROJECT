import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Spinner, Center } from '@chakra-ui/react';

const Categories = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/categories/all'); // via Vite proxy
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        console.log("API /categories/all:", raw);

        const norm = (Array.isArray(raw) ? raw : []).map(c => ({
          id: c.categoryId ?? c.category_id ?? c.id,
          label: c.categoryName ?? c.category_name ?? c.name ?? "Unnamed",
          details: c.categoryDetails ?? c.category_details ?? "",
          active: typeof c.active === "boolean" ? c.active : c.active === 1 || c.active === "1",
        }));
        setCats(norm);
      } catch (e) {
        console.error(e);
        setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Center py={6}><Spinner size="lg" /></Center>;
  }

  if (err) {
    return (
      <Box maxW="container.lg" mx="auto" my={4}>
        <Text color="red.500">Failed to load categories: {err}</Text>
      </Box>
    );
  }

  if (cats.length === 0) {
    return (
      <Box maxW="container.lg" mx="auto" my={4}>
        <Text>No categories found.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="container.lg" mx="auto" my={4}>
      <Text fontSize="lg" fontWeight="bold" mb={3}>Browse Categories</Text>
      <Flex overflowX="auto" gap={3}>
        {cats.map(cat => (
          <Box
            key={cat.id}
            textAlign="center"
            px={3}
            py={2}
            borderWidth="1px"
            borderRadius="md"
            minW="120px"
            cursor="pointer"
            _hover={{ boxShadow: 'md', transform: 'scale(1.05)', transition: '0.2s' }}
            flexShrink={0}
          >
            <Text fontSize="sm" mt={1}>{cat.label}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
