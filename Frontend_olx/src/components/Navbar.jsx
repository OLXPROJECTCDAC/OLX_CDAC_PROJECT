import React from 'react';
import './Navbar.css';    // make sure this path is correct

const Navbar = () => {
  const userInitial = 'S';          // your user’s initial
  const userName = 'Shubham Jadhav';

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2">
      <div className="container-fluid px-4">

        {/* OLX Logo */}
        <a className="navbar-brand me-3" href="/">
          <img
            src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
            alt="OLX Logo"
            width="50"
          />
        </a>

        {/* Location selector */}
        <div className="d-flex align-items-center me-3">
          <i className="bi bi-geo-alt-fill text-primary me-1"></i>
          <select className="form-select form-select-sm nav-select">
            <option>India</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
            <option>Bangalore</option>
          </select>
        </div>

        {/* Search bar */}
        <form className="d-flex flex-grow-1 me-3">
          <input
            className="form-control form-control-lg"
            type="search"
            placeholder='Search "Jobs"'
          />
          <button className="btn btn-dark ms-2" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Right‑side items */}
        <ul className="navbar-nav align-items-center">



          {/* Favorites */}
          <li className="nav-item me-3">
            <a className="nav-link text-dark" href="#">
              <i className="bi bi-heart"></i>
            </a>
          </li>

          {/* Chat */}
          <li className="nav-item me-3">
            <a className="nav-link text-dark" href="#">
              <i className="bi bi-chat-dots"></i>
            </a>
          </li>

          {/* Notifications */}
          <li className="nav-item me-3">
            <a className="nav-link text-dark" href="#">
              <i className="bi bi-bell"></i>
            </a>
          </li>

          {/* User avatar dropdown */}
          <li className="nav-item dropdown me-3">
            <button
              className="btn avatar-btn bg-primary text-white border border-white"
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
                  <strong>{userName}</strong><br />
                  <a href="/profile" className="profile-link small">
                    View &amp; edit profile
                  </a>
                </div>
              </li>
              {/* Links */}
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
          </li>

          {/* Sell button */}
          <li className="nav-item">
            <button className="btn btn-outline-primary rounded-pill px-4 py-1">
              <i className="bi bi-plus-lg me-1"></i>
              SELL
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
