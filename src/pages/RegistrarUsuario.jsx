import "./reg_usu.css";
import logo from "../imgs/logo.png";

function RegistrarUsuario() {
  return (
    <form className="user_form">
      <center>
        <h1 className="user_form_titulo">Formulario de Registro</h1>
      </center>
      <center>
        <img src={logo} alt="Logotipo" width={100} height={80} />
      </center>
      <p className="user_form__paragraph">
        ¿Ya tienes una cuenta?{" "}
        <a href="/Login" className="form__link">
          Entra aqui
        </a>
      </p>
      <br />
      <div className="formulario">
        <div className="field">
          <label>Usuario</label>
          <input
            type="text"
            name="Usuario"
            required=""
            placeholder="Nombre de Usuario"
            autoComplete=""
          />
        </div>
        <div className="field">
          <label>Nombre</label>
          <input type="text" name="Nombre" required="" autoComplete="" />
        </div>
        <div className="field">
          <label>Apellidos</label>
          <input type="text" name="Apellidos" required="" autoComplete="" />
        </div>
        <div className="field">
          <label>Telefono</label>
          <input type="text" name="Telefono" required="" autoComplete="" />
        </div>
        <div className="field">
          <label>E-mail</label>
          <input type="email" name="Correo" required="" autoComplete="" />
        </div>
        <div className="field">
          <label>Contraseña</label>
          <input
            type="password"
            name="Contraseña"
            required=""
            autoComplete=""
          />
        </div>
        <div className="privacidad">
          <input type="checkbox" required="" />
          <label>He leído y acepto la política de privacidad</label>
        </div>
        <div className="submit">
          <center>
            <button>Registrarme</button>
          </center>
        </div>
      </div>
    </form>
  );
}

export default RegistrarUsuario;
