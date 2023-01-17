import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { get, update } from '../services/productService';

function EditarPlatillo() {
  const [id, setId] = useState(null);
  const { getItem } = useLocalStorage("token");
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!getItem()) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    get(getItem(), params.productId).then((response) => {
      setValue('name', response.data.name ?? '');
      setValue('description', response.data.description ?? '');
      setValue('price', response.data.price ?? 0);
      setId(response.data.id);
    })
  },[]);

  const onSubmit = (data) => {
    const product = {
      "name": data.name,
      "description": data.description,
      "price": data.price,
      "category": 1,
    }
    if (data.image.length > 0) {
      product.image = data.image[0];
    }
    update(product, id, getItem()).then((data) => {
      console.log("Platillo created succesfully", data);
      navigate('/mi-negocio');
    });
  };

  return (
    <form className="datos__pla" onSubmit={handleSubmit(onSubmit)}>
      <font color="black">
        <h4>Editar Platillo</h4>
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
      <select className="controls" name="select" id="select">
        <option value={1}>categoria 1</option>
        {/* <option value={2}>categoria 2</option>
      <option value={3}>categoria 3</option> */}
      </select>
      <h3>Foto del Platillo:</h3>
      <input
        id='fotoPlat'
        className="controls"
        type="file"
        {...register('image')}
      />
      <button id="btn-enviar" className='botons' type="submit" >Actualizar</button>
    </form>
  );
}

export default EditarPlatillo;
