import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { update } from "../services/localfoodService";

function EditarRestaurante() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [horario, setHorario] = useState("");
  const [hasDelivery, setHasDelivery] = useState(false);
  const [logoRest, setLogoRest] = useState("");
  const [fotoLocal, setFotoLocal] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [owner, setOwner] = useState(null);
  const [id, setId] = useState(null);
  const { getItem } = useLocalStorage("token");
  const navigate = useNavigate();

  {
    useEffect(() => {
    if (!getItem()) {
      navigate("/login");
    }
  }, []);
  }

  //Traer y mostrar datos actuales
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/localfood/2").then((response) => {
      setNombre(response.data.name);
      setDescripcion(response.data.description);
      setTelefono(response.data.phone_number);
      setDomicilio(response.data.address);
      setHorario(response.data.schedule);
      setHasDelivery(response.data.has_delivery);
      setId(response.data.id);
    });
  }, []);
  console.log(nombre, descripcion, telefono, domicilio, horario, hasDelivery);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localfood = {
      name: nombre,
      description: descripcion,
      address: domicilio,
      phone_number: telefono,
      schedule: horario,
      has_delivery: hasDelivery,
    };

    update(localfood, id, getItem()).then(data => {
        console.log('User updated succesfully', data);
      });
  };

  return (
    <form className="datos" onSubmit={handleSubmit} method="post">
      <font color="black">
        <h4>Editar el Restaurante</h4>
      </font>
      <input
        className="controls"
        type="text"
        name="Nombre del negocio"
        id="nombre"
        placeholder="Editar el Nombre"
        onChange={(e) => setNombre(e.target.value)}
        value={nombre}
        required
      />
      <textarea
        className="controls"
        cols={20}
        rows={5}
        placeholder="Editar la Descripcion"
        name="Descripcion"
        id="descripcion"
        onChange={(e) => setDescripcion(e.target.value)}
        value={descripcion}
        required
      />
      <h3>Domicilio: </h3>
      <input
        className="controls"
        type="text"
        name="Domicilio"
        id="domicilio"
        placeholder="Editar Domicilio"
        onChange={(e) => setDomicilio(e.target.value)}
        value={domicilio}
        required
      />
      <h3>Telefono:</h3>
      <input
        className="controls"
        type="tel"
        name="Telefono"
        id="tel"
        placeholder="Editar Telefono"
        onChange={(e) => setTelefono(e.target.value)}
        value={telefono}
        required
      />
      <h3>Horario:</h3>
      <input
        className="controls"
        type="text"
        name="Horario"
        id="horario"
        placeholder="9:00am - 3:00pm"
        onChange={(e) => setHorario(e.target.value)}
        value={horario}
        required
      />
      <h3>¿Cuenta con servicio a domicilio?</h3>
      <select
        className="controls"
        name="select"
        id="select"
        onChange={() => setHasDelivery(!hasDelivery)}
        value={hasDelivery}
        required
      >
        <option value={true}>Sí</option>
        <option value={false}>No</option>
      </select>

      <input className="botons" type="submit" value="Editar" />
    </form>
  );
}

export default EditarRestaurante;
