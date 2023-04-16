import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import bandeja from "../imgs/bandeja.png";
import './index.css'
import Searcher from "../components/Searcher";

function Home() {
  const navigate = useNavigate();

  const onSearch = (keywords) => {
    navigate(`/verRestaurantes?buscar=${encodeURIComponent(keywords)}`);
  }

  return (
    <>
      <main>
        <section className="inicio_hero">
          <h1 className="inicio_hero__title">LocalFood</h1>
          <Searcher onSearch={onSearch} />
          <h2 className="inicio_hero__subtitle">
            "Recetas especiales para personas especiales"
          </h2>
        </section>
        <section className="inicio_info">
          <h2 className="inicio_info__title">¡Nos preocupamos por ti!</h2>
          <center>
            <img
              src={bandeja}
              style={{ align: "center", width: "80", height: "70" }}
              alt="Unos tacos"
              className="inicio_info__image"
            />
          </center>

          <center>
            {/* <a href="#" className="inicio_info__button">
              Mirar los platillos
            </a> */}
          </center>
        </section>

        <section className="inicio_nego">
          <p className="inicio_text">
            ¡Apoya a estos increibles negocios donde podras degustar una gran
            variedad de platillos hasta la puerta de tu casa!
          </p>
          <br />
          <div className="container_negocios">
            <img
              src="./res.png"
              align="center"
              className="inicio_res__info"
              width="190"
              height="90"
            />
            <Link to="/verRestaurantes" className="inicio_res__button">
              Ver restaurantes
            </Link>
          </div>
        </section>

        <section className="inicio_regis">
          <center className="inicio_regis__title">
            {/*<font size={6} face="impact" color="#f82510">
              Únete a LocalFood
          </font>*/}
            <h3>Únete a LocalFood</h3>
          </center>
          <br />
          <div className="inicio_regis__container">
          <center>
            <img
              src="./unete2.jpg"
              className="inicio_info__reg"
              width={200}
              height={90}
              align="middle"
            />
          </center>
          <br />
          <center>
            <a href="/AcercaDeNosotros" className="inicio_reg__boton">
              Conocer mas
            </a>
          </center>
          </div>
        </section>

        <section className="inicio_restaurant">
          <br />
          <center>
            {" "}
            <img
              src="./rest.jpg"
              className="inicio_reg__res"
              width={200}
              height={90}
              align="middle"
            />
          </center>
          <br />
          <div className="inicio_restaurant_container">
          <p className="inicio_texto">
            Presume tus platillos para que los usuarios prueben el verdadero
            sabor de la comida mexicana.
          </p>
          <br />
          <center>
            <a
              href="./RegistrarRestaurante"
              className="inicio_resta__button"
            >
              Registrar restaurante
            </a>
          </center>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
