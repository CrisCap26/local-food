import React from "react";
import "./perfil.css";
import fotoPerfil from "../imgs/foto_perfil.jpg";
import SlideShow from '../components/SlideShow'
import NavBar from '../components/NavBar'

function PerfilRestaurante({ logo, nombre, descripcion }) {
  return (
    <>
      <NavBar></NavBar>
      <section className="cover">
        <div className="cover-wrapper">
          <div className="cover-photo-container">
            <img
              src={fotoPerfil}
              alt="Logotipo"
              className="cover-photo"
              height={200}
            />
          </div>
          <div className="cover-text">
            <h2 className="cover-title">MexicanFood</h2>
          </div>
        </div>
      </section>

      <section id="aboutme" className="aboutme">
        <header>
          <h1 className="title-underlime">
            <span>Descripcion</span>
          </h1>
        </header>

        <div className="cover-drescrption">
          <p>
            Chapulín es un lugar en donde la palabra México cobra sentido, es un
            restaurante en donde podrás conocer la riqueza y tradición de la
            cocina mexicana a través de los diferentes olores, texturas y
            sabores de los platillos que prepara nuestra Chef Josefina López
            Méndez y su equipo.
          </p>
          <p>
            Su diseño arquitectónico y oferta gastronómica se conjugan para
            tener una experiencia muy agradable.
          </p>
        </div>
      </section>

      <section id="info" className="info">
        <header>
          <h1 className="title-underlime">
            <span>Mas Informacion</span>
          </h1>
        </header>
        <br />
        <div className="block">
          <ul className="list">
            <li>
              <b>Correo: </b>MexicanFood@gmail.com
            </li>
            <li>
              <b>Domicilio: </b> Hidalgo #130 poniente.
            </li>
            <li>
              {" "}
              <b>Telefono:</b> 3911203467.{" "}
            </li>
            <li>
              {" "}
              <b>Horario: </b> 09:00 a.m. - 10:00 p.m.
            </li>
          </ul>
        </div>
        <br />
      </section>

      <h1 className="title-underlime">
        <span>Platillos</span>
      </h1>
      <SlideShow />
    </>
  );
}

export default PerfilRestaurante;
