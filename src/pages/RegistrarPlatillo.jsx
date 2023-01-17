import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { create } from '../services/productService';
import './reg_platillo.css'

function RegistrarPlatillo() {

  const [nombre, setNombre] = useState("");
  const [descrPlatillo, setDescrPlatillo] = useState("");
  const [foto, setFoto] = useState("");
  const [precio, setPrecio] = useState(0);

  const { getItem } = useLocalStorage('token');
  const navigate = useNavigate();

  useEffect(() => {
    if(!getItem()) {
      navigate('/login');
    }
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    const product = {
      "name": data.name,
      "description": data.description,
      "price": data.price,
      "category": 1,
    }
    if (data.image.length > 0) {
      product.image = data.image[0];
    }
    create(product, getItem()).then(data => {
      console.log('Platillo created succesfully', data);
      navigate('/mi-negocio');
    });
  };

  return (
    <form className="datos__pla" onSubmit={handleSubmit(onSubmit)}>
      <font color="black">
        <h4>Registro de Platillos</h4>
      </font>
      <h3>Nombre del Platillo:</h3>
      <input
        className="controls"
        id="nombrePlat"
        placeholder="Ingrese el Nombre"
        {...register('name', {
          required: true
        })}
      />
      <h3>Descripción: </h3>
      <textarea
        id='descripcionPlat'
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese la Descripcion"
        {...register('description')}
      />
      <h3>Precio:</h3>
      <input
        id="precio"
        className="controls"
        type="number"
        placeholder="Ingrese el Precio"
        {...register('price', {
          min: 0
        })}
      />
      <h3>Elegir categoria: </h3>
      <select className='controls' name="select" id="select" >
        <option value={1}>categoria 1</option>
        {/* <option value={2}>categoria 2</option>
        <option value={3}>categoria 3</option> */}
      </select>
      {/* <h3>Foto del Platillo:</h3>
      <input
        id='fotoPlat'
        className="controls"
        type="file"
        name="Imagen Platillo"
        accept=".pdf,.jpg,.png"
        multiple=""
      /> */}
      <h3>Imagen:</h3>
      <input
        id='logoRes'
        className="controls"
        type="file"
        {...register('image')}
      />
      <button id="btn-enviar" className='botons' type="submit" >Registrar</button>
    </form>
  );
}

export default RegistrarPlatillo;
