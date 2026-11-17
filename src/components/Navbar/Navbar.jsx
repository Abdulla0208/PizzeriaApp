import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import logo from "../../assets/pizzeria-logo.png";

import "./Navbar.css";

function Navbar() {

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { currentUser, isLoggedIn, logout } = useAuth();
  const firstName = currentUser?.name?.split(" ")[0];

  const { cartCount} = useCart();

  const navigate = useNavigate();

  return (
    <>

    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
          {/* Logo */}
          <NavLink to="/" className="navbar-brand">
            <img
              src={logo}
              alt="Pizzeria Logo"
              className="logo"
            />
          </NavLink>

          {/* Navigation */}
          <div className="navbar-nav mx-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/order" className="nav-link">
              Order Pizza
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className="nav-btn login-btn"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="nav-btn register-btn"
                >
                  Register
                </NavLink>
              </>
              ) : (
              <>
                <span className="username">
                  Hi, {firstName}
                </span>
                <button className="logout-btn" onClick={() => setShowLogoutPopup(true)}>
                  Logout
                </button>
              </>
            )}
            <NavLink
              to="/cart"
              className="cart-btn"
            >
              <FaShoppingCart />
              {
                cartCount > 0 && (
                  <span className="cart-count">
                    {cartCount}
                  </span>
                )
              }
            </NavLink>
          </div>
        </div>
      </nav>
      {
        showLogoutPopup && (
          <ConfirmationModal
              icon=""
              title="Logout"
              message="Are you sure you want to logout?"
              confirmText="Logout"
              cancelText="Stay"
              onConfirm={() => {
                  logout();
                  setShowLogoutPopup(false);
                  navigate("/");
              }}
              onCancel={() => setShowLogoutPopup(false)}
          />
        )
      }  
  </>
  );
}

export default Navbar;