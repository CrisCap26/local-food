import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./perfil.css";
import fotoPerfil from "../imgs/foto_perfil.jpg";
import SlideShow from "../components/SlideShow";
import { get } from "../services/localfoodService";
import { config } from "../config";
import Comentarios from "../components/Comentarios";
import AddComentario from "../components/AddComentario";
import VerMisPlatillos from "./VerMisPlatillos";

function PerfilRestaurante({ localfoodOwnerId }) {
  const navigate = useNavigate();
  const [localfood, setLocalfood] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(fotoPerfil);
  const [platillos, setPlatillos] = React.useState(null);
  const params = useParams();
  const isCurrentOwner = localfoodOwnerId == params.localfoodId;

  const [comentarios, setComentarios] = React.useState([]);

  const addComentario = (newComentario) => {
    const newComentarios = [newComentario, ...comentarios];
    setComentarios(newComentarios);
  }

  React.useEffect(() => {
    reloadPlatillos();
  }, []);

  function reloadPlatillos() {
    get(params.localfoodId).then((response) => {
      setLocalfood(response.data);
      setComentarios(response.data.comments);
      setPlatillos(response.data.products);
      console.log(response.data)
      if (response.data.profile_image) {
        setProfileImage(config.backendUrl + response.data.profile_image)
      }
    }).catch(e => {
      navigate('/404');
    });
  }

  function hasDelivery() {
    if (localfood) {
      if (localfood.has_delivery) {
        return "Sí"
      } else {
        return "No"
      }
    }
  }

  return (
    <>
      <section className="cover">
        <div className="cover-wrapper">
          <div className="cover-photo-container">
            <img
              src={profileImage}
              alt="Logotipo"
              className="cover-photo"
              height={200}
              width={200}
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
            <span>Descripción</span>
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
            <span>Más Información</span>
          </h1>
        </header>
        <div className="block">
          <ul className="list">
            {localfood?.address &&
              <li>
                <b>Domicilio: </b> {localfood?.address}
              </li>
            }
            {localfood?.phone_number &&
              <li>
                {" "}
                <b>Teléfono:</b> {localfood?.phone_number}
              </li>
            }
            {localfood?.schedule &&
              <li>
                {" "}
                <b>Horario: </b> {localfood?.schedule}
              </li>
            }
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
      </section>

      <h1 className="title-underlime">
        <span>Platillos</span>
      </h1>
      {
        localfood?.products <= 0 ?
          <div className='noPlatillos'>
            <h2>Aún no hay platillos</h2>
          </div>
          :
          <>
            {
              platillos?.length < 3 ?
                <>
                  <section className="sect-platillos oneItem-sect">
                    <SlideShow platillos={localfood?.products} localfoodId={localfood?.id} reloadPlatillos={reloadPlatillos} canEdit={isCurrentOwner} />
                  </section>
                  <div className='cont-btn'>
                    <Link to={`/mis-platillos/${localfood?.id}`} className='btn-verMasPlat'>Ver más</Link>
                  </div>
                </>
                :
                <>
                  <section className="sect-platillos">
                    <SlideShow platillos={localfood?.products} localfoodId={localfood?.id} reloadPlatillos={reloadPlatillos} canEdit={isCurrentOwner} />
                  </section>
                  <div className='cont-btn'>
                    <Link to={`/mis-platillos/${localfood?.id}`} className='btn-verMasPlat'>Ver más</Link>
                  </div>
                </>
            }
          </>
      }

      <h1 className="title-underlime">
        <span>Comentarios</span>
      </h1>
      <section className="sect-coment">
        <Comentarios comentarios={comentarios}></Comentarios>
        <AddComentario addComentario={addComentario}></AddComentario>
      </section>
    </>
  );
}

export default PerfilRestaurante;
