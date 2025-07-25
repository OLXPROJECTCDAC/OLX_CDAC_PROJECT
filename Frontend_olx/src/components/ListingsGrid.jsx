import React from 'react';
import ListingCard from './ListingCard';
import listingData from '../data/listingData.json';

/**
 * ListingsGrid Component
 * Displays a responsive grid of listing cards using data from JSON.
 */
const ListingsGrid = () => {
    return (
        <div className="container-fluid my-4">
            {/* Section Heading */}
            <h5>Fresh Recommendations</h5>

            {/* Responsive Grid */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                {listingData.map((item) => (
                    <div className="col" key={item.id}>
                        <ListingCard data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListingsGrid;
