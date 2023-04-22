import React, { useEffect, useState } from 'react'
import '../pages/verResta.css'
import { Link } from 'react-router-dom'
import { addToFav, removeFromFav } from '../services/localfoodService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';

function CardRestaurant(props) {
  const [isAddedToFav, setIsAddedToFav] = useState(props.isAddedToFav);
  const [isLoading, setIsLoading] = useState(false);

  const { getItem: getToken } = useLocalStorage('token');

  useEffect(() => {
    setIsAddedToFav(props.isAddedToFav);
  }, [props.isAddedToFav]);

  const onToggleFav = async () => {
    try {
      setIsLoading(true);
      if (getToken()) {
        if (isAddedToFav) {
          await removeFromFav(props.id, getToken());
          toast.success("Se ha removido de favoritos exitosamente", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          props.handleOnFav(props.id, false);
        } else {
          await addToFav(props.id, getToken());
          toast.success("Se ha añadido a favoritos exitosamente", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          props.handleOnFav(props.id, true);
        }
      } else {
        toast.warning("Necesitas iniciar sesión para añadir favoritos", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    } catch (e) {
      toast.error("Ha ocurrido un error, favor de intentarlo más tarde", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card-restaurant">
        <div className="img-restaurant">
          <img src={props.image} alt="" />
        </div>
        <div className="info-restaurant">
          <div className="add-fav">
            <h3>{props.name}</h3>
            <button onClick={onToggleFav} disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={isAddedToFav ? 'red' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isAddedToFav ? 'red' : 'currentColor'} className={!getToken() && "logout"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
          <div className="descr">
            <p>Descripción: </p>
            <div>{props.descr}</div>
          </div>
          <div className="cat">
            <p>Categorías:</p>
            <ul>
              {
                props.categories.map(category => (
                  <li key={category.id} className='category__item' >{category.description}</li>
                ))
              }
            </ul>
  </div>
          {/*<div className="descr">
            <p>Horario: </p>
            <div>{props.horario}</div>
          </div>
          <div className="descr">
            <p>Dirección: </p>
            <div>{props.dir}</div>
  </div>*/}
          <div className="verMas">
            <Link to={`/PerfilRestaurante/${props.id}`} className="btn-verMas">
              Ver más
            </Link>
          </div>
        </div>
      </div>
  )
}

export default CardRestaurant