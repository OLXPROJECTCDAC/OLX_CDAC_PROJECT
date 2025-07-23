import React from 'react';

// Importing modular components
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import ListingsGrid from '../components/ListingsGrid';
import Footer from '../components/Footer';

/**
 * HomePage Component
 * Combines all main sections: Navbar, Banner, Categories, Listings, Footer
 */
const HomePage = () => {
    return (
        <>
            {/* Top Navigation Bar */}
            <Navbar />

            {/* Main Page Content */}
            <div className="page-container">
                <Banner />         {/* Carousel banner at top - Ads */}
                <Categories />     {/* Scrollable category section */}
                <ListingsGrid />   {/* Grid of listing cards */}
            </div>

            {/* Bottom Footer */}
            <Footer />
        </>
    );
};

export default HomePage;
