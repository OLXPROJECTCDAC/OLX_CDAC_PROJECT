import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from '../data/categories.json'; // Import JSON data

const Categories = () => {
    return (
        <div className="container my-4">
            {/* Section Title */}
            <h5 className="mb-3">Browse Categories</h5>

            {/* Scrollable category cards */}
            <div className="d-flex overflow-auto gap-3">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="text-center px-3 py-2 border rounded"
                        style={{ minWidth: '100px', cursor: 'pointer' }}
                    >
                        {/* Emoji Icon */}
                        <div style={{ fontSize: '1.8rem' }}>{category.icon}</div>

                        {/* Category Label */}
                        <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>
                            {category.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
