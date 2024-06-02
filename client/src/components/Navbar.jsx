import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/instructify-logo.png';
import Auth from '../utils/auth';
// importing Search bar to use but it wont be IN the navbar, but under it
import SearchBar from './search/SearchBar';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navbarCollapseRef = useRef(null);
  // adding a variable to define useNavigate to use later on in when searching 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userLoggedIn = Auth.loggedIn();
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    Auth.logout();
    handleNavItemClick();
  };

  const handleNavItemClick = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 991) {
      const collapseElement = new window.bootstrap.Collapse(navbarCollapseRef.current);
      collapseElement.hide();
    }
  };

  // handling of searching in navbar.
  // user will be redirected to all tutorial page
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/all');
  };

  // using a variable to exclude the searchbar from showing up on certain pages. 
  // easier to maintain if deciding to add more pages in the future- you can add the pages into this array
  const excludedRoutes = ['/signup', '/login', '/about', '/donate'];


  return (
    <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
        <span className="title">Instructify</span>
      </Link>
      <button
          style={{'border':'none'}}
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
      <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
        <ul className="navbar-nav me-auto" id="navbar-left">
          <li className="nav-item">
            <Link className="nav-link navbar-link" to="/about" onClick={handleNavItemClick}>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-link" to="/videoSearch" onClick={handleNavItemClick}>Search Videos</Link>
          </li>
            <li className="nav-item">
              <Link className="nav-link navbar-link" to="/donate" onClick={handleNavItemClick}>Donate</Link>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto" id="navbar-right">
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link navbar-link" to="/login" id="navbar-login" onClick={handleNavItemClick}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-link" to="/signup" id="navbar-signup" onClick={handleNavItemClick}>Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link navbar-link" to="/tutorial" id="navbar-create-tutorial" onClick={handleNavItemClick}>Create Tutorial</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-link" to="/dashboard" id="navbar-dashboard" onClick={handleNavItemClick}>Dashboard</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link navbar-link btn" onClick={handleLogout} id="navbar-logout">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
    <li style={{ listStyleType: 'none' }}>
  {/* adding search bar to navbar so user can search at any time! Adding useState to take affect. Navbar only shows up on select pages (see above. Added no style to remove dot from li) */}
  {!excludedRoutes.includes(location.pathname) && (

<SearchBar handleSearchSubmit={handleSearchSubmit} />
)} 
</li>
    </React.Fragment> 
  );
};

export default Navbar;