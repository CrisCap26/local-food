import React from 'react'
import '../pages/verResta.css'
import fav2 from '../imgs/me-gusta.svg'
import { Link } from 'react-router-dom'

function CardRestaurant(props) {
  return (
    <div className="card-restaurant">
        <div className="img-restaurant">
          <img src={props.image} alt="" />
        </div>
        <div className="info-restaurant">
          <div className="add-fav">
            <h3>{props.name}</h3>
            <button>
              <img src={fav2} alt="" />
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
                  <li key={category.id}>{category.description}</li>
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