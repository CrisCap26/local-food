import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { create, getAllCategories } from '../services/productService';
import { toast } from 'react-toastify';
import './reg_platillo.css'

function RegistrarPlatillo() {
  const [categories, setCategories] = useState([]);
  const { getItem } = useLocalStorage('token');
  const navigate = useNavigate();

  useEffect(() => {
    if(!getItem()) {
      navigate('/login');
    } else {
      getCategories();
    }
  }, []);

  const getCategories = async () => {
    const {data} = await getAllCategories();
    setCategories(data);
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    const product = {
      "name": data.name,
      "description": data.description,
      "price": data.price,
      "category": data.category,
    }
    if (data.image.length > 0) {
      product.image = data.image[0];
    }
    create(product, getItem()).then(data => {
      console.log('Platillo created succesfully', data);
      toast.success("Platillo creado correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      navigate('/mi-negocio');
    });
  };

  return (
    <div className="datos__pla">
      <form onSubmit={handleSubmit(onSubmit)}>
      <font color="black">
        <h4>Registro de Platillos</h4>
      </font>
      <h3>Nombre del Platillo:</h3>
      <span className="campo_requerido_res">* Este campo es requerido</span>
      <input
        className="controls"
        id="nombrePlat"
        placeholder="Ingrese el Nombre"
        {...register('name', {
          required: true
        })}
      />
      <h3>Descripción: </h3>
      <span className="campo_requerido_res">* Este campo es requerido</span>
      <textarea
        id='descripcionPlat'
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese la Descripcion"
        {...register('description')}
      />
      <h3>Precio:</h3>
      <span className="campo_requerido_res">* Este campo es requerido</span>
      <input
        id="precio"
        className="controls"
        type="number"
        placeholder="Ingrese el Precio"
        {...register('price', {
          min: 0
        })}
      />
      <h3>Elegir categoría: </h3>
      <span className="campo_requerido_res">* Este campo es requerido</span>
      <select className='controls' id="select" {...register('category', {required: true})} >
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>{category.description}</option>
          );
        })}
      </select>
      <h3>Foto del Platillo:</h3>
      <input
        id='fotoPlat'
        className="controls"
        type="file"
        {...register('image')}
      />
      <button id="btn-enviar" className='botons' type="submit" >Registrar</button>
    </form>
    </div>
  );
}

export default RegistrarPlatillo;
