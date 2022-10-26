import React from "react";
import '../index.css'
import logo from '../imgs/logo.png'
import iconUser from '../imgs/icon-user.png'


function NavBar() {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">
          <img
            src={logo}
            alt="Logo LocalFood"
            style={{ width: 65, height: 50 }}
          />
        </a>
      </div>
      <a className="header__login" href={"/Login"}>
        <img
          src={iconUser}
          alt="Iniciar sesión"
          style={{ width: 25, height: 25 }}
        />
      </a>
    </header>
  );
}

export default NavBar;
