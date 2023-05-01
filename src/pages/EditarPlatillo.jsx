import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { get, getAllCategories, update } from '../services/productService';
import { toast } from 'react-toastify';
import { config } from "../config";

function EditarPlatillo() {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const { getItem } = useLocalStorage("token");
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!getItem()) {
      navigate("/login");
    } else {
      getCategories();
    }
  }, []);

  const getCategories = async () => {
    const {data} = await getAllCategories();
    setCategories(data);
  }

  useEffect(() => {
    get(getItem(), params.productId).then((response) => {
      setValue('name', response.data.name ?? '');
      setValue('description', response.data.description ?? '');
      setValue('price', response.data.price ?? 0);
      setValue('category', response.data.category.id ?? 0);
      setImage(response.data.image === "/media/images/placeholder_food.jpg" ? null : config.backendUrl + response.data.image);
      setId(response.data.id);
    })
  },[]);

  const onSubmit = (data) => {
    const product = {
      "name": data.name,
      "description": data.description,
      "price": data.price,
      "category": data.category,
    }
    if (data.image.length > 0) {
      product.image = data.image[0];
    }
    update(product, id, getItem()).then((data) => {
      console.log("Platillo created succesfully", data);
      toast.success("Platillo actualizado correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
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
      <select className='controls' id="select" {...register('category', {required: true})} >
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>{category.description}</option>
          );
        })}
      </select>
      {image && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <p>Foto del Platillo actual:</p>
        <img src={image} alt="Imagen de perfil actual del usuario" style={{width: '200px', marginTop: '8px', marginBottom: '8px'}} />
      </div>}
      <h3>Nueva foto del platillo:</h3>
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
