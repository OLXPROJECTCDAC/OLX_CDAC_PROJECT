import React from "react";

/**
 * Footer Component
 * Contains:
 * - Popular Locations
 * - Company Info (About, Careers, Contact)
 * - Social Media Links
 * - Bottom Bar with Logo & Copyright
 */
const Footer = () => {
    return (
        <>
            {/* ---------- Top Section ---------- */}
            <div className="bg-light text-dark py-4">
                <div className="container">
                    <div className="row justify-content-center">

                        {/* Popular Locations Column */}
                        <div className="col-md-4">
                            <h6 className="fw-bold">POPULAR LOCATIONS</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-decoration-none text-dark">Kolkata</a></li>
                                <li><a href="#" className="text-decoration-none text-dark">Mumbai</a></li>
                                <li><a href="#" className="text-decoration-none text-dark">Chennai</a></li>
                                <li><a href="#" className="text-decoration-none text-dark">Pune</a></li>
                            </ul>
                        </div>

                        {/* Company Information Column */}
                        <div className="col-md-4">
                            <h6 className="fw-bold">COMPANY</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-decoration-none text-dark">About Us</a></li>
                                <li><a href="#" className="text-decoration-none text-dark">Careers</a></li>
                                <li><a href="#" className="text-decoration-none text-dark">Contact Us</a></li>
                            </ul>
                        </div>

                        {/* Social Media Icons Column */}
                        <div className="col-md-4">
                            <h6 className="fw-bold">FOLLOW US</h6>
                            <div className="d-flex gap-3 mb-3">
                                <a href="#" className="text-dark"><i className="bi bi-facebook fs-5"></i></a>
                                <a href="#" className="text-dark"><i className="bi bi-twitter fs-5"></i></a>
                                <a href="#" className="text-dark"><i className="bi bi-instagram fs-5"></i></a>
                                <a href="#" className="text-dark"><i className="bi bi-youtube fs-5"></i></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ---------- Bottom Bar Section ---------- */}
            <div className="bg-primary text-white py-3 mt-2">
                <div className="container-fluid px-5 d-flex flex-column flex-md-row justify-content-between align-items-center">

                    {/* OLX Logo */}
                    <div className="d-flex gap-4 align-items-center mb-2 mb-md-0">
                        <img
                            src="https://statics.olx.in/external/base/img/cartrade/logo/olx_2025.svg?v=1"
                            alt="OLX"
                            width="50"
                        />
                    </div>

                    {/* Copyright */}
                    <div>
                        <small className="text-white">
                            All rights reserved © 2006-2025 OLX
                        </small>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Footer;
