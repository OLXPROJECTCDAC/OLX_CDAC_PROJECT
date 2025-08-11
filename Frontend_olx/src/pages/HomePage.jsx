// src/pages/HomePage.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { Box, VStack, useToast } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import ListingsGrid from '../components/ListingsGrid';
import Footer from '../components/Footer';
import { apiFetch } from '../utils/api';

const DEFAULT_AREA = 'PUNE_CITY';

const HomePage = () => {
    const toast = useToast();
    const [area, setArea] = useState(DEFAULT_AREA);
    const [keyword, setKeyword] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const fetchProducts = useCallback(async (a, k) => {
        const params = new URLSearchParams();
        params.set('area', a || DEFAULT_AREA);
        if (k && k.trim()) params.set('keyword', k.trim());

        try {
            setLoading(true);
            setErr('');
            const res = await apiFetch(`/products/search?${params.toString()}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            const normalized = (Array.isArray(data) ? data : []).map(p => ({
                id: p.id ?? p.productId ?? p.product_id,
                image: p.imageUrl ?? p.image ?? p.thumbnailUrl ?? (Array.isArray(p.photos) && p.photos[0]?.url) ?? '',
                title: p.title ?? p.name ?? 'Untitled',
                price: p.price ?? 0,
                location: p.area ?? a,
                date: (p.createdAt ?? p.created_at ?? '').toString().slice(0, 10),
                featured: Boolean(p.featured),
            }));

            setItems(normalized);
        } catch (e) {
            const message = e.message || 'Failed to load';
            setErr(message);
            toast({
                status: 'error',
                title: 'Failed to fetch products',
                description: message,
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchProducts(area, keyword);
    }, [fetchProducts]);

    const handleSearch = (nextArea, nextKeyword) => {
        setArea(nextArea || DEFAULT_AREA);
        setKeyword(nextKeyword || '');
        fetchProducts(nextArea || DEFAULT_AREA, nextKeyword || '');
    };

    return (
        <Box>
            <Navbar
                selectedArea={area}
                initialKeyword={keyword}
                onSearch={handleSearch}
            />

            <VStack spacing={{ base: 4, md: 6 }} align="stretch" mt={2}>
                <Banner />
                <Categories />
                <ListingsGrid
                    items={items}
                    loading={loading}
                    err={err}
                    currentArea={area}
                    currentKeyword={keyword}
                />
            </VStack>

            <Footer />
        </Box>
    );
};

export default HomePage;
