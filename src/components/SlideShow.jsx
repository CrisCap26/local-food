import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import images from '../imgs/images'
import './slideshow.css'
import { destroy } from "../services/productService";
import { config } from '../config';
import { toast } from 'react-toastify';
import { useLocalStorage } from '../hooks/useLocalStorage';

function SlideShow({ platillos, reloadPlatillos, canEdit }) {
  const navigate = useNavigate();
  const { getItem: getToken } = useLocalStorage("token");

  const editPlatillo = (productId) => {
    if (canEdit) {
      navigate(`/editar-platillo/${productId}`);
    }
  }

  const onDeletePlatillo = (productId) => {
    if (window.confirm('¿Estás seguro?')) {
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
    <>
      {
        platillos && platillos.map((platillo, i) => (
          <div key={i} className="misPlatillos-card">
            <div>
              <img className="imgPlatillo" src={getImage(platillo, i)} />
              <div className="info-platillo">
                <h3 className="nombrePlatillo">{platillo.name}</h3>
                <span className="precioPlatillo"><b>Precio:</b> ${platillo.price}</span>
                {platillo.description &&
                  <span>
                    <b>Descripción: </b>{platillo.description}
                  </span>
                }
                <p className='category__item' >{platillo.category.description}</p>
              </div>
              {
                canEdit ?
                  <div className="buttons">
                    <button onClick={() => editPlatillo(platillo.id)} className="btnEditarPlatillo">Editar</button>
                    <button onClick={() => onDeletePlatillo(platillo.id)} className="btnEliminarPlatillo">Eliminar</button>
                  </div>
                  :
                  <></>
              }

            </div>
          </div>
        ))
      }
    </>
  )
}

export default SlideShow