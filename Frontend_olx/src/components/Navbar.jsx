import React from 'react';
import './Navbar.css'; // <-- make sure this path is correct

/**
 * Navbar Component
 * Responsive top navigation bar with OLX branding, location dropdown,
 * search input, user‐avatar dropdown (with View & edit profile),
 * and "Sell" CTA button.
 */
const Navbar = () => {
  const userInitial = 'S';          // replace with your auth state
  const userName = 'Shubham Jadhav';

  return (
    <nav className="navbar navbar-expand-sm bg-light shadow-sm py-3 w-100">
      <div className="container-fluid px-4">

        {/* OLX Logo */}
        <a className="navbar-brand me-3" href="/">
          <img
            src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
            alt="OLX Logo"
            width="50"
          />
        </a>

        {/* Location Dropdown */}
        <div className="d-flex align-items-center me-3">
          <i className="bi bi-geo-alt-fill me-1 text-primary" />
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
            <i className="bi bi-search" />
          </button>
        </form>

        {/* Right Section: Avatar Dropdown + Sell */}
        <div className="d-flex align-items-center">

          {/* Avatar Dropdown */}
          <div className="nav-item dropdown me-3">
            <button
              className="btn avatar-btn bg-primary text-white border border-white p-0"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userInitial}
            </button>


            <ul
              className="dropdown-menu dropdown-menu-end p-0 shadow border-0"
              aria-labelledby="userDropdown"
            >
              {/* Header */}
              <li className="dropdown-header p-3 d-flex align-items-start border-bottom">
                <div className="avatar-btn me-2">{userInitial}</div>
                <div>
                  <strong>{userName}</strong>
                  <div>
                    <a href="/profile" className="profile-link small">
                      View &amp; edit profile
                    </a>
                  </div>
                </div>
              </li>

              {/* Menu items */}
              <li><a className="dropdown-item" href="/my-ads">My ADS</a></li>
              <li><a className="dropdown-item" href="/business-packages">Buy Business Packages</a></li>
              <li><a className="dropdown-item" href="/cart">View Cart</a></li>
              <li><a className="dropdown-item" href="/billing">Bought Packages &amp; Billing</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/help">Help</a></li>
              <li><a className="dropdown-item" href="/settings">Settings</a></li>
              <li><a className="dropdown-item" href="/install">Install OLX Lite App</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item text-danger" href="/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>

          {/* Sell Button (unchanged) */}
          <button className="btn btn-warning btn-lg text-dark d-flex align-items-center">
            <i className="bi bi-plus-lg me-1" />
            Sell
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
