import React, { useEffect } from "react";
import '../pages/index.css'
import logo from '../imgs/logo.png'
import iconUser from '../imgs/icon-user.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/authService";
import { toast } from "react-toastify";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";


function NavBar({isLogedIn, setIsLogedIn, hasLocalfood}) {
  const [showUserOptions, setShowUserOptions] = useState(false);

  const navigate = useNavigate();
  const { getItem: getToken, deleteItem: deleteToken } = useLocalStorage('token');
  const { deleteItem: deleteUserId } = useLocalStorage('userId');
  const { deleteItem: deleteLocalfoodId } = useLocalStorage('localfoodId');

  const closeShowOptions = () => {
    setShowUserOptions(false);
  }

  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, closeShowOptions);

  const onClickUserLogoHandler = () => {
    const toggle = !showUserOptions;
    setShowUserOptions(toggle);
  }

  // TODO toggle setIsLogedIn here and when login
  const handleLogout = () => {
    closeShowOptions();
    logout(getToken()).then(data => {
      console.log('Logout successfully', data);
      deleteToken();
      deleteUserId();
      deleteLocalfoodId();
      setIsLogedIn(false);
      toast.success("Sesión cerrada correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      navigate('/');
    }).catch(() => {
      toast.error("Error al iniciar sesión", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    });
  }

  const handleOnClickProfile = () => {
    closeShowOptions();
    navigate('/mi-usuario');
  }

  const handleOnClickLocalfood = () => {
    closeShowOptions();
    navigate('/mi-negocio');
  }

  const handleOnCreateLocalfood = () => {
    closeShowOptions();
    navigate('/RegistrarRestaurante');
  }

  return (
    <header className="nav_header">
      <div className="nav_header__logo">
        <Link to="/">
          <img
            src={logo}
            alt="Logo LocalFood"
            style={{ width: 65, height: 50 }}
          />
        </Link>
      </div>
      {isLogedIn
      ?
      <>
        <h1 className="title-localfood">LocalFood</h1>
        <div className="user__logo-container">
          <button className="user__logo-button" onClick={onClickUserLogoHandler}>
            <img
              src={iconUser}
              alt="Iniciar sesión"
              style={{ width: 25, height: 25 }}
            />
          </button>
          {showUserOptions &&
            <ul className="user__options" ref={wrapperRef}>
              <li onClick={handleOnClickProfile}>Ir a mi perfil</li>
              {hasLocalfood
                ? <li onClick={handleOnClickLocalfood}>Ir a mi negocio</li>
                : <li onClick={handleOnCreateLocalfood}>Crear un negocio</li>
              }
              <li onClick={handleLogout}>Cerrar sesión</li>
            </ul>
          }
        </div>
      </>
      : <>
          <Link className="btn-login" to='/Login'>
          Iniciar sesión
          </Link>
          <Link className="btn-login" to='/RegistrarUsuario'>
            Registrarse
          </Link>
        </>
      }
    </header>
  );
}

export default NavBar;
