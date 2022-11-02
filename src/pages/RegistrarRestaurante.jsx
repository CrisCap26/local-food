import { useState } from 'react';
import './restaurante.css'
import {expresiones} from './utils'
import axios from 'axios';

function RegistrarRestaurante() {

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nombre, descripcion, telefono, domicilio, horario, hasDelivery, logoRest, fotoLocal, socialMedia, owner)
    document.getElementById("nombre").value = setNombre("");
    document.getElementById("descripcion").value = setDescripcion("");
    document.getElementById("domicilio").value = setDomicilio("");
    document.getElementById("tel").value = setTelefono("");
    document.getElementById("horario").value = setHorario("");
    document.getElementById("select").value = setHasDelivery(false);
    document.getElementById("logoRes").value = setLogoRest("");
    document.getElementById("foto").value = setFotoLocal("");
    document.getElementById("social").value = setSocialMedia("");
    document.getElementById("owner").value = setOwner(null);

    const usuario = {
      "name": nombre,
      "description": descripcion,
      "address": domicilio,
      "phone_number": telefono,
      "schedule": horario,
      "has_delivery": hasDelivery,
      "social_media": null,
      "owner": owner
    }
    console.log(usuario)
    const baseURL = '127.0.0.1:8000/api/v1/user/'
    await axios.post('http://127.0.0.1:8000/api/v1/admin/localfood/', {
      "name": nombre,
      "description": descripcion,
      "address": domicilio,
      "phone_number": telefono,
      "schedule": horario,
      "has_delivery": hasDelivery,
      "social_media": socialMedia,
      "owner": owner
    }).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }; 

  return (
    <form className='datos' onSubmit={handleSubmit} method='post'>
      <font color="black">
        <h4>Registro de Restaurante</h4>
      </font>
      <input
        className="controls"
        type="text"
        name="Nombre del negocio"
        id="nombre"
        placeholder="Ingrese el Nombre"
        onChange={(e) => setNombre(e.target.value)}
        value={nombre}
        required
      />
      <textarea
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese la Descripcion"
        name='Descripcion'
        id='descripcion'
        onChange={(e) => setDescripcion(e.target.value)}
        value={descripcion}
        required
      />
      <h3>Propietario:</h3>
      <input
        className="controls"
        type="number"
        name="Owner"
        id="owner"
        min={0}
        placeholder=""
        onChange={(e) => setOwner(e.target.value)}
        value={owner}
        required
      />
      <h3>Domicilio: </h3>
      <input
        className="controls"
        type="text"
        name="Domicilio"
        id="domicilio"
        placeholder="Ingrese el Domicilio"
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
        placeholder="Ingrese el Telefono"
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
      className='controls'
      name="select"
      id='select'   
      onChange={() => setHasDelivery(!hasDelivery)}
      value={hasDelivery}
      required   
      >
        <option value={true}>Sí</option>
        <option value={false}>No</option>
      </select>
      {
        hasDelivery == true && <textarea
        id='social'
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese sus Redes Sociales"
        onChange={(e) => setSocialMedia(e.target.value)}
        value={socialMedia}
        />
      }
    

     {/*} <input
        className="controls"
        type="text"
        name="Envio"
        id="Envio"
        placeholder="¿Cuenta con servicio a domicilio?"
      />
      <textarea
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese sus Redes Sociales"
        defaultValue={""}
  /> */ }
      <h3>Logotipo:</h3>
      <input
        id='logoRes'
        className="controls"
        type="file"
        name="Logotipo"
        accept=".pdf,.jpg,.png"
        multiple=""
      />
      <h3>Foto del Local:</h3>
      <input
        id='foto'
        className="controls"
        type="file"
        name="Imagen Portada"
        accept=".pdf,.jpg,.png"
        multiple=""
      />
      
      <input className="botons" type="submit" value="Registrar" />
    </form>
  );
}

export default RegistrarRestaurante;
