// src/components/Banner.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
    return (
        <div id="olxBanner" className="carousel slide mb-4" data-bs-ride="carousel">

            {/* Carousel Images */}
            <div className="carousel-inner">

                {/* Banner 1 - Active */}
                <div className="carousel-item active">
                    <img
                        src="https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg"
                        className="d-block w-100"
                        alt="Banner 1"
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                </div>

                {/* Banner 2 */}
                <div className="carousel-item">
                    <img
                        src="https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-aws.jpg"
                        className="d-block w-100"
                        alt="Banner 2"
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                </div>

                {/* Banner 3 */}
                <div className="carousel-item">
                    <img
                        src="https://www.brafton.com/wp-content/uploads/2024/04/types-of-banner-hero.png"
                        className="d-block w-100"
                        alt="Banner 3"
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* Carousel Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#olxBanner"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" />
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#olxBanner"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" />
            </button>
        </div>
    );
};

export default Banner;
