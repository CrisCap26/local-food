import { useState, useEffect } from "react";
import { update, get } from "../services/userService";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { expresiones } from "./utils";

function EditarUsuario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(undefined);
  const [user, setUser] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [id, setId] = useState(null);
  const { getItem } = useLocalStorage("token");
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (!getItem()) {
      navigate("/login");
    }
  }, []);

  //Traer y mostrar datos actuales en el formulario
  useEffect(() => {
    get(getItem(), params.userId).then((response) => {
      setPassword(response.data.password);
      setUser(response.data.username);
      setNombre(response.data.name);
      setApellidos(response.data.last_name);
      setTelefono(response.data.phone_number);
      setEmail(response.data.email);
      setId(response.data.id);
    });
  }, []);
  console.log(user, nombre, apellidos, email, telefono);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userToUpdate = {
      password: password,
      username: user,
      name: nombre,
      last_name: apellidos,
      phone_number: telefono,
      email: email,
    };

    update(userToUpdate, id, getItem()).then((data) => {
      console.log("User updated succesfully", data);
    });
  };

  const validarEmail = () => {
    if (email.length > 0) {
      if (!expresiones.correo.test(email)) {
        console.log("El email es invalido");
        // document.getElementById("invalidEmail").style.display = "block";
        // document.getElementById("btn-enviar").disabled = true;
      } else {
        console.log("El email es valido");
        // document.getElementById("invalidEmail").style.display = "none";
        // document.getElementById("btn-enviar").disabled = false;
      }
    }
  };

  const validarPass = () => {
    if (!expresiones.contra.test(password)) {
      console.log("la contraseña debe tener de 6 a 12 carateres");
      // document.getElementById("invalidPass").style.display = "block";
      return false;
    } else {
      console.log("contraseña correcta");
      // document.getElementById("invalidPass").style.display = "none";
      return true;
    }
  };

  return (
    <form className="user_form" onSubmit={handleSubmit} method="post">
      <center>
        <h1 className="user_form_titulo">Editar Mi Perfil</h1>
      </center>
      <br />
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
        <p id="invalidEmail" className="noCoinciden">
          El email es invalido
        </p>
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
        {/*<div className="submit">
          <center>
            <button id="btn-enviar" >Cambiar contraseña</button>
          </center>
</div>*/}
        <div className="submit">
          <center>
            <button id="btn-enviar">Actualizar</button>
          </center>
        </div>
      </div>
    </form>
  );
}

export default EditarUsuario;
