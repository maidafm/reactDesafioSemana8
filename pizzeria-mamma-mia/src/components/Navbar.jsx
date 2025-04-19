import React, { useContext } from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css'; 
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';


const Navbar = () => {

  const { calcularTotal } = useContext(CartContext);
  const total = calcularTotal();
  const { token, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Pizzería Mamma Mia!</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav navbar-buttons">
          <li className="nav-item">
            <Button 
            className="btn btn-dark"
            as={Link}
            to={"/"}
            >🍕 Home</Button>
          </li>
          {token ? (
            <>
              <li className="nav-item">
                <Button 
                className="btn btn-dark"
                as={Link}
                to={"/profile"}
                >🔓 Profile</Button>
              </li>
              <li className="nav-item">
                <Button 
                className="btn btn-dark"
                onClick={handleLogout}>🔒 Logout</Button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Button 
                className="btn btn-dark"
                as={Link}
                to={"/login"}
                >🔐 Login</Button>
              </li>
              <li className="nav-item">
                <Button 
                className="btn btn-dark"
                as={Link}
                to={"/register"}
                >🔐 Register</Button>
              </li>
              <li className="nav-item">
                <Button 
                className="btn btn-dark"
                as={Link}
                to={"/profile"}
                >🔐 Profile</Button>
              </li>
            </>
          )}
          <li className="nav-item total-button ml-auto">
            <Button 
            id="Total" 
            className="btn btn-transparent"
            as={Link}
            to={"/cart"}
            >🛒 Total: ${total.toLocaleString()}</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;