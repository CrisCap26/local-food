import React from 'react'
import { useNavigate } from "react-router-dom";
import images from '../imgs/images'
import './slideshow.css'
import { motion } from 'framer-motion'
import { destroy } from "../services/productService";
import { config } from '../config';
import { toast } from 'react-toastify';

function SlideShow({platillos, token, localfoodId}) {
  const navigate = useNavigate();

  const editPlatillo = (productId) => {
    navigate(`/editar-platillo/${productId}`);
  }

  const onDeletePlatillo = (productId) => {
    if(window.confirm('¿Estás seguro?')) {
      destroy(token, productId).then(data => {
        console.log('Platillo deleted successfully', data);
        toast.success("Platillo eliminado correctamente", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        navigate(`/mi-negocio`);
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
            <button className='platillo__button--delete' onClick={() => onDeletePlatillo(platillo.id)}>Eliminar</button>
          </div>
        ))
      }
    </div>
  )
}

export default SlideShow