import "./reg_usu.css";
import logo from "../imgs/logo.png";
import { useState } from "react";

function RegistrarUsuario() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user, nombre, apellidos, telefono, email, password, isChecked)
    document.getElementById("usuario").value = setUser("");
    document.getElementById("nombre").value = setNombre("");
    document.getElementById("apellidos").value = setApellidos("");
    document.getElementById("tel").value = setTelefono("");
    document.getElementById("correo").value = setEmail("");
    document.getElementById("contra").value = setPassword("");
    document.getElementById("checkbox").value = setIsChecked(false);
  }; 

  return (
    <form className="user_form" onSubmit={handleSubmit}>
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
            name="Usuario"
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
            name="Nombre" 
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
            name="Apellidos" 
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
            name="Telefono" 
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
            name="Correo" 
            id="correo"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
             />
        </div>
        <div className="field">
          <label>Contraseña</label>
          <input
            type="password"
            name="Contraseña"
            id="contra"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
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
            <button>Registrarme</button>
            
          </center>
        </div>
      </div>
    </form>
  );
}

export default RegistrarUsuario;
