import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "./cambiar.css";
import { expresiones } from "./utils";
import cheque from '../imgs/cheque.png'
import mal from '../imgs/cerrar.png'

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("pass").value = setPassword("");
    document.getElementById("pass2").value = setPass2("");
  };

  const validarPass = () => {
    if (!expresiones.contra.test(password)) {
      console.log("la contraseña debe tener de 4 a 12 carateres");
      document.getElementById("invalidPass").style.display = "block";
      return false;
    } else {
      console.log("contraseña correcta");
      document.getElementById("invalidPass").style.display = "none";
      return true;
    }
  };

  const validarPass2 = () => {
    if (validarPass() === true) {
      if (password !== pass2) {
        console.log(" las contraseñas no son iguales ");
        document.getElementById("message1").style.display = "block";
        document.getElementById("message2").style.display = "none";
        document.getElementById("btn-enviar").disabled = true;
      } else {
        console.log("Las contraseñas son iguales");
        document.getElementById("message2").style.display = "block";
        document.getElementById("message1").style.display = "none";
        document.getElementById("btn-enviar").disabled = false;
      }
    } else {
      document.getElementById("message1").style.display = "none";
      document.getElementById("message2").style.display = "none";
    }
  };

  return (
    <>
      <form className="pass_datos__pla">
        <font color="black">
          <h4>Cambiar Contraseña</h4>
        </font>
        <h3>Nueva Contraseña:</h3>
        <input
          className="controls"
          type="password"
          name="password"
          id="pass"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validarPass}
          value={password}
          required
        />
        <p id="invalidPass" className="pass_noCoinciden">
          La contraseña debe tener entre 7 y 12 caracteres
        </p>
        <h3>Confirmar Contraseña:</h3>
        <input
          className="controls"
          type="password"
          name="pass2"
          id="pass2"
          onChange={(e) => {
            setPass2(e.target.value);
          }}
          onBlur={validarPass2}
          value={pass2}
          required
        />
        <p id="message1" className="pass_noCoinciden">
          Las contraseñas no coinciden
          <img className="icon" src={mal}/>
        </p>

        <p id="message2" className="pass_coinciden">
          Las contraseñas coinciden <img className="icon" src={cheque} />
        </p>

        <input id="btn-enviar" className="botons" type="submit" value="Enviar" />
      </form>
    </>
  );
}

export default ChangePassword;
