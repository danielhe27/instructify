// client/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/instructify-logo.png'; // Import the logo



const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (you can replace this with your actual authentication logic)
    const userLoggedIn = false; // Replace with actual login check
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    // Handle logout logic here
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
          <span className="title">instructify</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link to="/login" className="btn btn-secondary nav-link">Login</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto auth-buttons">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-secondary nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-secondary nav-link">Sign Up</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-secondary nav-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
