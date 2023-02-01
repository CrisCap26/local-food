import React, { useEffect } from "react";
import '../pages/index.css'
import logo from '../imgs/logo.png'
import iconUser from '../imgs/icon-user.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getInfoFromToken, logout } from "../services/authService";
import { toast } from "react-toastify";
import { useLocalStorage } from "../hooks/useLocalStorage";


function NavBar({isLogedIn, setIsLogedIn}) {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [localfoodId, setLocalfoodId] = React.useState(null);

  const navigate = useNavigate();
  const { getItem: getToken, deleteItem: deleteToken } = useLocalStorage('token');
  const { deleteItem: deleteUserId } = useLocalStorage('userId');

  useEffect(() => {
    getInfoFromToken(getToken()).then(response => {
      setLocalfoodId(response.data.localfood.id);
    });
  }, []);

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
      setIsLogedIn(false);
      toast.success("Sesión cerrada correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      navigate('/');
    });
  }

  const handleOnClickProfile = () => {
    navigate('/mi-usuario');
  }

  const handleOnClickLocalfood = () => {
    navigate('/mi-negocio');
  }

  const handleOnCreateLocalfood = () => {
    navigate('/RegistrarRestaurante');
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
          <button className="user__logo-button" onClick={onClickUserLogoHandler}>
            <img
              src={iconUser}
              alt="Iniciar sesión"
              style={{ width: 25, height: 25 }}
            />
          </button>
          {showUserOptions &&
            <ul className="user__options">
              <li onClick={handleOnClickProfile}>Ir a mi perfil</li>
              {localfoodId
                ? <li onClick={handleOnClickLocalfood}>Ir a mi negocio</li>
                : <li onClick={handleOnCreateLocalfood}>Crear un negocio</li>
              }
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
