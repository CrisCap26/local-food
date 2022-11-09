import "./reg_usu.css";
import { useNavigate } from 'react-router-dom';
import logo from "../imgs/logo.png";
import { useState } from "react";
import {expresiones} from './utils'
import cheque from '../imgs/cheque.png'
import mal from '../imgs/cerrar.png'
import { create } from '../services/userService';

function RegistrarUsuario() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [user, setUser] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userToRegister = {
      password: password,
      username: user,
      name: nombre,
      last_name: apellidos,
      phone_number: telefono,
      email: email,
    };

    create(userToRegister).then(data => {
      console.log('User created succesfully', data);
      navigate('/login');
    });

  };

  const validarEmail = () => {
    if(email.length > 0) {
      if(!expresiones.correo.test(email)) {
        console.log('El email es invalido')
        // document.getElementById("invalidEmail").style.display = "block";
        // document.getElementById("btn-enviar").disabled = true;
      } else {
        console.log('El email es valido')
        // document.getElementById("invalidEmail").style.display = "none";
        // document.getElementById("btn-enviar").disabled = false;
      }
    }
  }

  const validarPass = () => {
    if(!expresiones.contra.test(password)) {
      console.log("la contraseña debe tener de 6 a 12 carateres")
      // document.getElementById("invalidPass").style.display = "block";
      return false

    } else {
      console.log("contraseña correcta")
      // document.getElementById("invalidPass").style.display = "none";
      return true
    }
  }

  const validarPass2 = () => {
    if(validarPass() === true) {
      if(password !== password2) {
        console.log(' las contraseñas no son iguales ')
        // document.getElementById("message1").style.display = "block";
        // document.getElementById("message2").style.display = "none";
        // document.getElementById("btn-enviar").disabled = true;
      } else {
        console.log('Las contraseñas son iguales')
        // document.getElementById("message2").style.display = "block";
        // document.getElementById("message1").style.display = "none";
        // document.getElementById("btn-enviar").disabled = false;
      }
    } else {
      // document.getElementById("message1").style.display = "none";
      // document.getElementById("message2").style.display = "none";
    }
  }

  /*function createUser() {
    const usuario = {
      "password": password,
      "username": user,
      "name": nombre,
      "last_name": apellidos,
      "phone_number": telefono,
      "email": email,
    }
    console.log(usuario)

    axios.post('http://127.0.0.1:8000/usuarios/', {
      "password": password,
      "username": user,
      "name": nombre,
      "last_name": apellidos,
      "phone_number": telefono,
      "email": email,
    })
    .then(function (response){
      console.log(response);
      console.log(response.data);
    })
  }*/

  const onCheckedChange = () => {
    const toggle = !isChecked;
    setIsChecked(toggle);
  }


  return (
    <form className="user_form" onSubmit={handleSubmit} method="post">
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
      <br/>
      <div className="formulario">
        <div className="field">
          <label>Usuario</label>
          <input
            type="text"
            name="user"
            id="usuario"
            placeholder="Nombre de Usuario"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>
        <div className="field">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
        </div>
        <div className="field">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            id="apellidos"
            onChange={(e) => setApellidos(e.target.value)}
            value={apellidos}
            />
        </div>
        <div className="field">
          <label>Telefono</label>
          <input
            type="text"
            name="telefono"
            id="tel"
            onChange={(e) => setTelefono(e.target.value)}
            value={telefono}
            />
        </div>
        <div className="field">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            id="correo"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validarEmail}
            value={email}
          />
        </div>
        <p id="invalidEmail" className="noCoinciden">El email es invalido</p>
        <div className="field">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            id="contra"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validarPass}
            value={password}
            required
          />
        </div>
        {/* <p id="invalidPass" className="noCoinciden">La contraseña debe tener entre 6 y 12 caracteres</p> */}
        <div className="field">
          <label>Repetir contraseña</label>
          <input
            type="password"
            name="Contraseña2"
            id="contra2"
            onChange={(e) => {
              setPassword2(e.target.value)
            }
          }
            onBlur={validarPass2}
            value={password2}
            required
          />
        </div>

        <p id="message1" className="noCoinciden">Las contraseñas no coinciden
        <img className="icon" src={mal}/>
        </p>

        <p id="message2" className="coinciden">Las contraseñas coinciden
        <img className="icon" src={cheque} />
        </p>

        <div className="privacidad">
          <input
          id="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={onCheckedChange}
          required />
          <label>He leído y acepto la política de privacidad</label>
        </div>
        <div className="submit">
          <center>
            <button id="btn-enviar" disabled={!isChecked}>Registrarme</button>
          </center>
        </div>
      </div>
    </form>
  );
}

export default RegistrarUsuario;
