import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import "./login.css";

function Login() {
  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    contra: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { getItem: getToken, saveItem: saveToken } = useLocalStorage('token');
  const { saveItem: saveUserId } = useLocalStorage('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if(getToken()) {
      navigate('/mi-cuenta');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    login(username, password).then(data => {
      console.log('Login succesfully', data);
      saveToken(data.token);
      saveUserId(data.user.id);
    });
  };

  function validate () {
    return username.length > 0 && password.length > 0
  }
/*
  function validarEmail(e) {
    if(!expresiones.correo.test(username)) {
      document.getElementById("avisoUsername").style.display = "block";
      setUsername(e.target.value)
      console.log("algun campo username esta incorrecto")
    }
  }

  function validarPass(e) {
    if(!expresiones.contra.test(password)) {
      document.getElementById("avisoPass").style.display = "block";
      setPassword(e.target.value)
      console.log("algun campo pass esta incorrecto")
    }
  }*/

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
              type="text"
              id="username"
              className="form__input"
              placeholder=" "
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label htmlFor="username" className="form__label">
              Correo:
            </label>
            <p id="avisoUsername" className="aviso">Escriba un username valido</p>
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
            <p id="avisoPass" className="aviso" >Escriba una contraseña valida</p>
            <span className="form__line"></span>
          </div>

          <input type="submit" className="form__submit" value="Entrar" disabled={!validate} />
        </div>
      </form>
    </div>
  );
}

export default Login;
