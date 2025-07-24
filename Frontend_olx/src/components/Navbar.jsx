import React from 'react';

/**
 * Navbar Component
 * Responsive top navigation bar with OLX branding, location dropdown,
 * search input, login link, and "Sell" CTA button.
 */
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-light shadow-lg py-3 w-100">
      <div className="container-fluid px-4">

        {/* OLX Logo */}
        <a className="navbar-brand me-3" href="/">
          <img
            src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
            alt="OLX Logo"
            width="50"
          />
        </a>

        {/* Location Dropdown with Geo Icon */}
        <div className="d-flex align-items-center me-3">
          <i className="bi bi-geo-alt-fill me-1 text-primary"></i>
          <select className="form-select form-select-lg" style={{ width: '150px' }}>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
            <option>Bangalore</option>
          </select>
        </div>

        {/* Search Bar */}
        <form className="d-flex flex-grow-1 me-3">
          <input
            className="form-control form-control-lg me-2"
            type="search"
            placeholder="Find Cars, Mobile Phones and more..."
          />
          <button className="btn btn-dark btn-lg" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Right Section: Login Link and Sell Button */}
        <div className="d-flex align-items-center">
          <a href="#" className="nav-link me-3">
            Login
          </a>
          <button className="btn btn-warning btn-lg text-dark d-flex align-items-center">
            <i className="bi bi-plus-lg me-1"></i>
            Sell
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
