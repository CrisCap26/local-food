import React from 'react'
import { useNavigate } from "react-router-dom";
import images from '../imgs/images'
import './slideshow.css'
import { motion } from 'framer-motion'
import { destroy } from "../services/productService";

function SlideShow({platillos, token, localfoodId}) {
  const navigate = useNavigate();

  const editPlatillo = (productId) => {
    navigate(`/editar-platillo/${productId}`);
  }

  const onDeletePlatillo = (productId) => {
    if(window.confirm('¿Estás seguro?')) {
      destroy(token, productId).then(data => {
        console.log('Platillo deleted successfully', data);
        navigate(`/mi-negocio`);
      });
    }
  }

  return (
    <div className='slider-container'>
      {
        platillos && platillos.reverse().map((platillo, i) => (
          <div key={i} className='item'>
            <div onClick={() => editPlatillo(platillo.id)} >
              <img src={images[i % 3]} alt="" />
            </div>
            <p>{platillo.name}</p>
            <p>{platillo.description}</p>
            <p>{platillo.price}</p>
            <p>{platillo.category}</p>
            <button className='platillo__button--delete' onClick={() => onDeletePlatillo(platillo.id)}>Eliminar</button>
          </div>
        ))
      }
    </div>
  )
}

export default SlideShow