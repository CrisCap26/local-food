import React from 'react'
import './verResta.css'
import fav from '../imgs/fav.png'
import explorar from '../imgs/buscar.png'
import categ from '../imgs/categorias.png'
import rest from '../imgs/tijuanaTacos.jpg'
import fav2 from '../imgs/me-gusta.svg'


function VerRestaurantes() {
  return (
    <>
    <div className="bar-Restaurantes">
      <div className="fav">
        <a href="/">
          <img src={fav} alt="" />
          Favoritos
        </a>
      </div>
      <div className="explorar">
        <a href="/">
          <img src={explorar} alt="" />
          Explorar
        </a>
      </div>
      <div className="categ">
        <a href="/">
          <img src={categ} alt="" />
          Categorías
        </a>
      </div>
    </div>
    <section className="verRestaurantes">
      <div className="card-restaurant">
        <div className="img-restaurant">
          <img src={rest} alt="" />
        </div>
        <div className="info-restaurant">
          <div className="add-fav">
            <h3>Tijuana Tacos</h3>
            <button>
              <img src={fav2} alt="" />
            </button>
          </div>
          <div className="descr">
            <p>Descripción: </p>
            <div>Local de tacos, tenemos tacos de todo tipo, ven y prueba.</div>
          </div>
          <div className="cat">
            <p>Categorías:</p>
            <ul>
              <li>cat 1, </li>
              <li>cat 2, </li>
              <li>cat 3, </li>
            </ul>
          </div>
          <div className="verMas">
            <a href="/" className="btn-verMas">
              Ver más
            </a>
          </div>
        </div>
      </div>
      <div className="card-restaurant">
        <div className="img-restaurant">
          <img src={rest} alt="" />
        </div>
        <div className="info-restaurant">
          <div className="add-fav">
            <h3>El Chaparrito</h3>
            <button>
              <img src={fav2} alt="" />
            </button>
          </div>
          <div className="descr">
            <p>Descripción: </p>
            <div>Local de comida Mexicana, ven y prueba la mejor comida Mexicana. </div>
          </div>
          <div className="cat">
            <p>Categorías:</p>
            <ul>
              <li>cat 1, </li>
              <li>cat 2, </li>
              <li>cat 3, </li>
            </ul>
          </div>
          <div className="verMas">
            <a href="/" className="btn-verMas">
              Ver más
            </a>
          </div>
        </div>
      </div>
      <div className="card-restaurant">
        <div className="img-restaurant">
          <img src={rest} alt="" />
        </div>
        <div className="info-restaurant">
          <div className="add-fav">
            <h3>Lonches Doña Lety</h3>
            <button>
              <img src={fav2} alt="" />
            </button>
          </div>
          <div className="descr">
            <p>Descripción: </p>
            <div>Local de comida Mexicana, ven y prueba la mejor comida Mexicana. </div>
          </div>
          <div className="cat">
            <p>Categorías:</p>
            <ul>
              <li>cat 1, </li>
              <li>cat 2, </li>
              <li>cat 3, </li>
            </ul>
          </div>
          <div className="verMas">
            <a href="/" className="btn-verMas">
              Ver más
            </a>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default VerRestaurantes
