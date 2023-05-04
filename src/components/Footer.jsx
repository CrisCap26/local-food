import React from "react";
import logo from "../imgs/logo.png"
import lugar from "../imgs/lugar.png"
import tel from "../imgs/tel.png"
import correo from "../imgs/correo.png"

function Footer() {
  return (
    <footer>
      <div className="contenedor">
        <br />
        <h2 className="titulo-seccion">Contáctanos</h2>
        <br />
      </div>
      <div className="center box">
        <div className="content">
          <div className="lugar">
            <span>
              <img
                src={lugar}
                alt="Ubicacion"
                width="20"
                height="20"
              />
            </span>
            <span className="text"> Jamay, Jalisco</span>
          </div>
          <div className="numero">
            <span>
              <img src={tel} alt="telefono" width="20" height="20" />
            </span>
            <span className="text"> +52 3319304399</span>
          </div>
          <div className="correo">
            <span>
              <img src={correo} alt="Correo" width="17" height="17" />
            </span>
            <span className="text"> LocalFood@gmail.com</span>
          </div>
          <div className="logo-footer">
            <center>
              <img
                src={logo}
                align="center"
                alt="final"
                width="110"
                height="80"
              />
            </center>
          </div>
          <div className="contenedor">
            <br />
            <p className="copy">
              Copyright © 2023 LocalFood / Todos los derechos reservados.
            </p>
            <br />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
