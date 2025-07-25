import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

/**
 * ListingCard Component
 * Displays a product listing card with image, title, price, location, and wishlist toggle.
 *
 * Props:
 * - data: {
 *     image: string,
 *     title: string,
 *     price: number,
 *     location: string,
 *     date: string,
 *     featured: boolean
 *   }
 */
const ListingCard = ({ data }) => {
    const [liked, setLiked] = useState(false); // Track heart/wishlist toggle

    if (!data) return null; // Prevent rendering if no data passed

    return (
        <div className="card h-100 border-0 shadow-sm listing-card">

            {/* Image Section */}
            <div className="position-relative">
                <img
                    src={data.image}
                    alt={data.title}
                    className="card-img-top"
                    style={{
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                    }}
                />

                {/* Wishlist Button (Heart icon) */}
                <button
                    className="btn btn-light position-absolute top-0 end-0 m-2 p-1 rounded-circle"
                    onClick={() => setLiked(!liked)}
                    title="Add to Wishlist"
                >
                    {liked ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
            </div>

            {/* Content Section */}
            <div className="card-body p-2">

                {/* Featured Badge */}
                {data.featured && (
                    <span className="badge bg-warning text-dark mb-2">FEATURED</span>
                )}

                {/* Price */}
                <h6 className="card-title fw-bold mb-1">₹ {data.price}</h6>

                {/* Title */}
                <p className="card-text mb-2 text-truncate">{data.title}</p>

                {/* Location & Date Row */}
                <div className="d-flex justify-content-between">
                    <small className="text-muted">{data.location}</small>
                    <small className="text-muted">{data.date}</small>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
