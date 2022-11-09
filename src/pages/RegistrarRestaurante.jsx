import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurante.css'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { create } from '../services/localfoodService';

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

  const { getItem } = useLocalStorage('token');
  const navigate = useNavigate();

  useEffect(() => {
    if(!getItem()) {
      navigate('/login');
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const localfood = {
      "name": nombre,
      "description": descripcion,
      "address": domicilio,
      "phone_number": telefono,
      "schedule": horario,
      "has_delivery": hasDelivery,
    }
    create(localfood, getItem()).then(data => {
      console.log('Localfood created succesfully', data);
      navigate('/mi-cuenta');
    });
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
      {/* <h3>Propietario:</h3>
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
      /> */}
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
      {/* {
        hasDelivery == true && <textarea
        id='social'
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese sus Redes Sociales"
        onChange={(e) => setSocialMedia(e.target.value)}
        value={socialMedia}
        />
      } */}
    

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
      {/* <h3>Logotipo:</h3>
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
      /> */}
      
      <input className="botons" type="submit" value="Registrar" />
    </form>
  );
}

export default RegistrarRestaurante;
