import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./perfil.css";
import fotoPerfil from "../imgs/foto_perfil.jpg";
import SlideShow from "../components/SlideShow";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { get } from "../services/localfoodService";

function PerfilRestaurante({ logo, nombre, descripcion }) {
  const navigate = useNavigate();
  const [localfood, setLocalfood] = React.useState(null);
  const { getItem: getToken } = useLocalStorage("token");
  const params = useParams();

  React.useEffect(() => {
    get(getToken(), params.localfoodId).then((response) => {
      setLocalfood(response.data);
    });
  }, []);

  function hasDelivery() {
    if(localfood) {
      if(localfood.has_delivery) {
        return "Sí"
      } else {
        return "No"
      }
    }
  }

  const addPlatillo = () => {
    navigate('/RegistrarPlatillo');
  }

  return (
    <>
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
            <h2 className="cover-title">{localfood?.name}</h2>
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
          <p>{localfood?.description}</p>
          {/*<p>
            Chapulín es un lugar en donde la palabra México cobra sentido, es un
            restaurante en donde podrás conocer la riqueza y tradición de la
            cocina mexicana a través de los diferentes olores, texturas y
            sabores de los platillos que prepara nuestra Chef Josefina López
            Méndez y su equipo.
          </p>
          <p>
            Su diseño arquitectónico y oferta gastronómica se conjugan para
            tener una experiencia muy agradable.
  </p>*/}
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
              <b>Domicilio: </b> {localfood?.address}
            </li>
            <li>
              {" "}
              <b>Telefono:</b> {localfood?.phone_number}
            </li>
            <li>
              {" "}
              <b>Horario: </b> {localfood?.schedule}
            </li>
            <li>
              <b>¿Entrega a domicilio?: </b> {hasDelivery()}
            </li>
            {/*<li>
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
</li>*/}
          </ul>
        </div>
        <br />
      </section>

      <h1 className="title-underlime">
        <span>Platillos</span>
        <button className="add-platillo" onClick={addPlatillo}>+</button>
      </h1>
      <SlideShow platillos={localfood?.products} token={getToken()} localfoodId={localfood?.id} />
    </>
  );
}

export default PerfilRestaurante;
