import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import bandeja from "../imgs/bandeja.png";

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <main>
        <section className="hero">
          <h1 className="hero__title">LocalFood</h1>
          <input
            type="text"
            className="hero__barra-busqueda"
            placeholder="¿Qué estás buscando?"
          />
          <h2 className="hero__subtitle">
            "Recetas especiales para personas especiales"
          </h2>
        </section>
        <section className="info">
          <h2 className="info__title">¡Nos preocupamos por ti!</h2>
          <center>
            <img
              src={bandeja}
              style={{ align: "center", width: "80", height: "70" }}
              alt="Unos tacos"
              className="info__image"
            />
          </center>

          <center>
            <a href="#" className="info__button">
              Mirar los platillos
            </a>
          </center>
        </section>

        <section className="nego">
          <p className="text">
            ¡Apoya a estos increibles negocios donde podras degustar una gran
            variedad de platillos hasta la puerta de tu casa!
          </p>
          <br />
          <center>
            <img
              src="./res.png"
              align="center"
              className="res__info"
              width="190"
              height="90"
            />
            <a href="#" className="res__button">
              Ver restaurantes
            </a>
          </center>
        </section>

        <section className="regis">
          <center className="regis__title">
            <font size={6} face="impact" color="#f82510">
              Únete a LocalFood
            </font>
          </center>
          <br />
          <center>
            <img
              src="./unete2.jpg"
              className="info__reg"
              width={200}
              height={90}
              align="middle"
            />
          </center>
          <br />
          <center>
            <a href="/AcercaDeNosotros" className="reg__button">
              Conocer mas
            </a>
          </center>
        </section>

        <section className="restaurant">
          <br />
          <center>
            {" "}
            <img
              src="./rest.jpg"
              className="reg__res"
              width={200}
              height={90}
              align="middle"
            />
          </center>
          <br />
          <p className="texto">
            Presume tus platillos para que los usuarios prueben el verdadero
            sabor de la comida mexicana.
          </p>
          <br />
          <center>
            <a
              href="./RegistrarRestaurante"
              className="resta__button"
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
