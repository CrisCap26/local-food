import React from 'react'
import { useNavigate } from "react-router-dom";
import images from '../imgs/images'
import './slideshow.css'
import { destroy } from "../services/productService";
import { config } from '../config';
import { toast } from 'react-toastify';
import { useLocalStorage } from '../hooks/useLocalStorage';

function SlideShow({platillos, reloadPlatillos, canEdit}) {
  const navigate = useNavigate();
  const { getItem: getToken } = useLocalStorage("token");

  const editPlatillo = (productId) => {
    if (canEdit) {
      navigate(`/editar-platillo/${productId}`);
    }
  }

  const onDeletePlatillo = (productId) => {
    if(window.confirm('¿Estás seguro?')) {
      destroy(getToken(), productId).then(data => {
        console.log('Platillo deleted successfully', data);
        toast.success("Platillo eliminado correctamente", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        reloadPlatillos();
      });
    }
  }

  const getImage = (platillo, index) => {
    if (!platillo.image) {
      return images[index % 3];
    }
    return config.backendUrl + platillo.image;
  }

  return (
    <div className='slider-container'>
      {
        platillos && platillos.reverse().map((platillo, i) => (
          <div key={i} className='item'>
            <div className='item__image-container' onClick={() => editPlatillo(platillo.id)} >
              <img src={getImage(platillo, i)} alt="" />
            </div>
            <p>{platillo.name}</p>
            <p>{platillo.description}</p>
            <p>{platillo.price}</p>
            <p>{platillo.category.description}</p>
            {canEdit && <button className='platillo__button--delete' onClick={() => onDeletePlatillo(platillo.id)}>Eliminar</button>}
          </div>
        ))
      }
    </div>
  )
}

export default SlideShow