import "./conocenos.css"
import logo from "../imgs/logo.png"
import fam from "../imgs/fam.png"
import objetivo from "../imgs/objetivo.png"
import imgFinal from "../imgs/nueva.png"
import NavBar from "../components/NavBar";

function AcercaDeNostros() {
  return (
    <>
      <section className="about_info">
        <center>
          <img
            src={fam}
            alt="Unete a nuestra familia"
            className="about_info__image"
            width={80}
            height={70}
            align="middle"
          />
        </center>
      </section>
      <section className="about_title">
        <h1 className="about_hero__title">Unete a la familia "LocalFood"</h1>
      </section>
      <section className="about_logoo">
        <center>
          <img
            src={logo}
            alt="Logo"
            className="about_info__logo"
            width={80}
            height={70}
            align="middle"
          />
        </center>
      </section>
      <section className="about_que_es">
        <font color="#ce0a31">
          <h1 className="about_title__que">¿Que es LocalFood?</h1>
        </font>
        <p className="about_text">
          LocalFood es una plataforma web que busca apoyar a los pequeños y
          medianos negocios de comida a promocionar sus platillos hacia todos
          los usuarios cerca de su zona que visiten la plataforma.
        </p>
        <br />
      </section>
      <section className="about_fin">
        <center>
          <img
            src={objetivo}
            alt="objetivo"
            className="about_info__obj"
            width={80}
            height={70}
            align="middle"
          />
        </center>
        <p className="about_obj">
          Con un negocio cada vez más orientado a la tecnología, se tendrá una
          mayor productividad donde pretendemos facilitar la exposición de
          nuevos materiales y platillos orientados a conocer y abordar las
          necesidades de los clientes y sea un beneficio para ambas partes.
        </p>
        <center>
          <img
            src={imgFinal}
            alt="final"
            className="about_info__fin"
            width={80}
            height={70}
            align="middle"
          />
        </center>
      </section>
    </>
  );
}

export default AcercaDeNostros;
