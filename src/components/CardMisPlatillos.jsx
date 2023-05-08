import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../pages/verMisPlatillos.css'
import tacos from "../imgs/tacos.jpg"
import { destroy } from '../services/productService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';


function CardMisPlatillos(props) {
  const navigate = useNavigate();
  const { getItem: getToken } = useLocalStorage('token');
  const editarPlatillo = (id) => {
    navigate(`/editar-platillo/${id}`)
  }
  const onDeletePlatillo = (productId) => {
    if (window.confirm('¿Estás seguro?')) {
      destroy(getToken(), productId).then(data => {
        console.log('Platillo deleted successfully', data);
        toast.success("Platillo eliminado correctamente", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        props.reloadPlatillos();
      });
    }
  }
  return (
    <div className="misPlatillos-card">
      <img className="imgPlatillo" src={props.image} />
      <div className="info-platillo">
        <h3 className="nombrePlatillo">{props.name}</h3>
        <span className="precioPlatillo"><b>Precio:</b> ${props.precio}</span>
        {props.descr &&
          <span>
            <b>Descripción: </b>{props.descr}
          </span>
        }
        <p className='category__item' >{props.categoryText}</p>
      </div>
      {
        props.canEdit ?
          <div className="buttons">
            <button onClick={() => editarPlatillo(props.id)} className="btnEditarPlatillo">Editar</button>
            <button onClick={() => onDeletePlatillo(props.id)} className="btnEliminarPlatillo">Eliminar</button>
          </div>
          : <></>
      }

    </div>
  )
}

export default CardMisPlatillos