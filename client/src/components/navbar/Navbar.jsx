import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="logo.svg" alt="Girman Technologies Logo" className="logo" />
        <div className="company-name">
          <h1 className="girman">Girman</h1>
          <p className="technologies">TECHNOLOGIES</p>
        </div>
      </div>

      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li className="nav-item">
          <a href="#search" className="nav-link search-link">
            Search
          </a>
        </li>
        <li className="nav-item">
          <a href="https://girmantech.com" className="nav-link">
            Website
          </a>
        </li>
        <li className="nav-item">
          <a
            href="https://www.linkedin.com/company/girmantech"
            className="nav-link"
          >
            LinkedIn
          </a>
        </li>
        <li className="nav-item">
          <a href="mailto:contact@girmantech.com" className="nav-link">
            Contact
          </a>
        </li>
      </ul>

      <button className="hamburger" onClick={toggleMenu}>
        &#9776;
      </button>
    </nav>
  );
};

export default Navbar;
