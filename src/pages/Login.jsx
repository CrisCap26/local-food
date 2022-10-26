import { useState } from "react";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    document.getElementById("email").value = setEmail("");
    document.getElementById("password").value = setPassword("");
  };

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  return (
    <div className="container-form">
      <form className="form" onSubmit={handleSubmit}>
        <center>
          <h2 className="form__title">Inicia Sesión</h2>
        </center>
        <p className="form__paragraph">
          ¿Aún no tienes una cuenta?{" "}
          <a href="/RegistrarUsuario" className="form__link">
            Entra aquí
          </a>
        </p>

        <div className="form__container">
          <div className="form__group">
            <input
              type="email"
              id="email"
              className="form__input"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="email" className="form__label">
              Correo:
            </label>
            <span className="form__line"></span>
          </div>

          <div className="form__group">
            <input
              type="password"
              id="password"
              className="form__input"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <label htmlFor="password" className="form__label">
              Contraseña:
            </label>
            <span className="form__line"></span>
          </div>

          <input type="submit" className="form__submit" value="Entrar" disabled={!validateForm()}/>
        </div>
      </form>
    </div>
  );
}

export default Login;
