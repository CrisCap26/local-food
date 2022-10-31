import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import bandeja from "../imgs/bandeja.png";
import './index.css'

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <main>
        <section className="inicio_hero">
          <h1 className="inicio_hero__title">LocalFood</h1>
          <input
            type="text"
            className="inicio_hero__barra-busqueda"
            placeholder="¿Qué estás buscando?"
          />
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
            <a href="#" className="inicio_info__button">
              Mirar los platillos
            </a>
          </center>
        </section>

        <section className="inicio_nego">
          <p className="inicio_text">
            ¡Apoya a estos increibles negocios donde podras degustar una gran
            variedad de platillos hasta la puerta de tu casa!
          </p>
          <br />
          <center>
            <img
              src="./res.png"
              align="center"
              className="inicio_res__info"
              width="190"
              height="90"
            />
            <a href="#" className="inicio_res__button">
              Ver restaurantes
            </a>
          </center>
        </section>

        <section className="inicio_regis">
          <center className="inicio_regis__title">
            <font size={6} face="impact" color="#f82510">
              Únete a LocalFood
            </font>
          </center>
          <br />
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
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
