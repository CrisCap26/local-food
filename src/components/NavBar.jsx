import React from "react";
import '../pages/index.css'
import logo from '../imgs/logo.png'
import iconUser from '../imgs/icon-user.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/authService";
import { toast } from "react-toastify";
import { useLocalStorage } from "../hooks/useLocalStorage";


function NavBar({isLogedIn}) {
  const [showUserOptions, setShowUserOptions] = useState(false);

  const navigate = useNavigate();
  const { getItem: getToken, deleteItem: deleteToken } = useLocalStorage('token');
  const { deleteItem: deleteUserId } = useLocalStorage('userId');

  const onClickUserLogoHandler = () => {
    const toggle = !showUserOptions;
    setShowUserOptions(toggle);
  }

  // TODO toggle setIsLogedIn here and when login
  const handleLogout = () => {
    logout(getToken()).then(data => {
      console.log('Logout successfully', data);
      deleteToken();
      deleteUserId();
      toast.success("Sesión cerrada correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      navigate('/');
    });
  }

  return (
    <header className="nav_header">
      <div className="nav_header__logo">
        <a href="/">
          <img
            src={logo}
            alt="Logo LocalFood"
            style={{ width: 65, height: 50 }}
          />
        </a>
      </div>
      {isLogedIn
      ?
        <div className="user__logo-container">
          <button onClick={onClickUserLogoHandler}>
            <img
              src={iconUser}
              alt="Iniciar sesión"
              style={{ width: 25, height: 25 }}
            />
          </button>
          {showUserOptions &&
            <ul className="user__options">
              <li onClick={handleLogout}>Cerrar sesión</li>
            </ul>
          }
        </div>
      : <Link to={'/Login'}>
          Iniciar sesión
        </Link>
      }
    </header>
  );
}

export default NavBar;
