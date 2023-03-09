import React from 'react'
import './verResta.css'
import fav from '../imgs/fav.png'
import explorar from '../imgs/buscar.png'
import categ from '../imgs/categorias.png'
import CardRestaurant from '../components/CardRestaurant'
import { getAll } from '../services/localfoodService'
import localImg from '../imgs/tijuanaTacos.jpg'
import { config } from "../config";


function VerRestaurantes() {
  const [localfood, setLocalfood] = React.useState([]);

  React.useEffect(() => {
    getLocalFoods();
  },[])
  function getLocalFoods() {
    getAll().then((response) => {
      console.log(response.data)
      setLocalfood(response.data)
    }).catch(e => {
      console.log(e);
    })
  }
  return (
    <>
    <div className="bar-Restaurantes">
      <div className="fav">
        <button>
          <img src={fav} alt="" />
          <span>Favoritos</span>
        </button>
      </div>
      <div className="explorar">
        <button>
          <img src={explorar} alt="" />
          <span>Explorar</span>
        </button>
      </div>
      <div className="categ">
        <button>
          <img src={categ} alt="" />
          <span>Categorías</span>
        </button>
      </div>
    </div>
    <section className="verRestaurantes">
      {/* These 3 should be in the db */}
      {/* <CardRestaurant
        image={localImg}
        name="Tacos Tijuana"
        descr="Local de tacos, tenemos tacos de todo tipo, ven y prueba."
      />
      <CardRestaurant
        image={localImg}
        name="El Chaparrito"
        descr="Local de comida Mexicana, ven y prueba la mejor comida Mexicana."
      />
      <CardRestaurant
        image={localImg}
        name="Lonches Doña Lety"
        descr="Ven y prueba los mejores lonches de la zona, tenemos lonches de todo, los mejores precios que podras encontrar."
      /> */}

      {
        localfood.map((local, i) => (
          <CardRestaurant key={i}
            id={local.id}
            image={config.backendUrl +local.profile_image}
            name={local.name}
            descr={local.description}
            horario={local.schedule}
            dir={local.address}
            categories={local.categories}
          />
        ))
      }
    </section>
  </>
  )
}

export default VerRestaurantes
