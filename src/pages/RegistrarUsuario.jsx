import "./reg_usu.css";
import logo from "../imgs/logo.png";
import { useState } from "react";
import {expresiones} from './utils'
import cheque from '../imgs/cheque.png'
import mal from '../imgs/cerrar.png'
import axios from "axios";

function RegistrarUsuario() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [user, setUser] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, nombre, apellidos, telefono, email, password, isChecked, password2)
    document.getElementById("usuario").value = setUser("");
    document.getElementById("nombre").value = setNombre("");
    document.getElementById("apellidos").value = setApellidos("");
    document.getElementById("tel").value = setTelefono("");
    document.getElementById("correo").value = setEmail("");
    document.getElementById("contra").value = setPassword("");
    document.getElementById("contra2").value = setPassword2("");
    document.getElementById("checkbox").value = setIsChecked(false);
    document.getElementById("message2").style.display = "none"
    document.getElementById("invalidEmail").style.display = "none";

    const baseURL = 'http://127.0.0.1:8000/api/v1/user/';
    await axios.post(baseURL, {
      password: password,
      username: user,
      name: nombre,
      last_name: apellidos,
      phone_number: telefono,
      email: email,
    }).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })

  }; 

  const validarEmail = () => {
    if(email.length > 0) {
      if(!expresiones.correo.test(email)) {
        console.log('El email es invalido')
        document.getElementById("invalidEmail").style.display = "block";
        document.getElementById("btn-enviar").disabled = true;
      } else {
        console.log('El email es valido')
        document.getElementById("invalidEmail").style.display = "none";
        document.getElementById("btn-enviar").disabled = false;
      }
    }
  }

  const validarPass = () => {
    if(!expresiones.contra.test(password)) {
      console.log("la contraseña debe tener de 4 a 12 carateres")
      document.getElementById("invalidPass").style.display = "block";
      return false
      
    } else {
      console.log("contraseña correcta")
      document.getElementById("invalidPass").style.display = "none";
      return true
    }
  }

  const validarPass2 = () => {
    if(validarPass() === true) {
      if(password !== password2) {
        console.log(' las contraseñas no son iguales ')
        document.getElementById("message1").style.display = "block";
        document.getElementById("message2").style.display = "none";
        document.getElementById("btn-enviar").disabled = true;
      } else {
        console.log('Las contraseñas son iguales')
        document.getElementById("message2").style.display = "block";
        document.getElementById("message1").style.display = "none";
        document.getElementById("btn-enviar").disabled = false;
      }
    } else {
      document.getElementById("message1").style.display = "none";
        document.getElementById("message2").style.display = "none";
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
            required
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
            required
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
            required
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
            required
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
        <p id="invalidPass" className="noCoinciden">La contraseña debe tener entre 7 y 12 caracteres</p>
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
          onChange={()=> setIsChecked(!isChecked)}
          required />
          <label>He leído y acepto la política de privacidad</label>
        </div>
        <div className="submit">
          <center>
            <button id="btn-enviar" disabled>Registrarme</button>
            
          </center>
        </div>
      </div>
    </form>
  );
}

export default RegistrarUsuario;
