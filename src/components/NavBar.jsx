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
import { get } from "../services/userService"
import { config } from '../config';


function NavBar({isLogedIn, setIsLogedIn, hasLocalfood}) {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [userImage, setUserImage] = useState(iconUser);

  const navigate = useNavigate();
  const { getItem: getToken, deleteItem: deleteToken } = useLocalStorage('token');
  const { deleteItem: deleteUserId } = useLocalStorage('userId');
  const { deleteItem: deleteLocalfoodId } = useLocalStorage('localfoodId');
  const { getItem: idUser } = useLocalStorage('userId');

  function getImageUser() {
    get(getToken(), idUser()).then((response) => {
      console.log(response.data.profile_image);
      setUserImage(response.data.profile_image);
      if (response.data.profile_image) {
        setUserImage(config.backendUrl + response.data.profile_image);
      } else {
        setUserImage(iconUser);
      }
    });
  }
  

  useEffect(() => {
    setShowButtons(!(window.location.pathname === '/Login' || window.location.pathname === '/RegistrarUsuario'));
    getImageUser();
  }, [window.location.pathname]);

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
        <div className="cont-img">
          <Link to="/">
            <img
              src={logo}
              alt="Logo LocalFood"
              style={{ width: "auto", height: 31 }}
            />
          </Link>
        </div>
        <div className="cont-title">
        <Link to="/">
            <h1 className="title-localfood">LocalFood</h1>
        </Link>
      </div>
      </div>
      {isLogedIn
      ?
      <>
        <div className="user__logo-container">
          <button className="user__logo-button" onClick={onClickUserLogoHandler}>
            <img
              src={userImage}
              alt="Iniciar sesión"
              style={{ width: 35, height: 33 }}
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
      : showButtons && <>
          <div className="container-botones">
            <Link className="btn-login" to='/Login'>
            Iniciar sesión
            </Link>
            <Link className="btn-login" to='/RegistrarUsuario'>
              Registrarse
            </Link>
          </div>
        </>
      }
    </header>
  );
}

export default NavBar;
