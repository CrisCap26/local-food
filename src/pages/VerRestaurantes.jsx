import React from 'react'
import './verResta.css'
import fav from '../imgs/fav.png'
import explorar from '../imgs/buscar.png'
import categ from '../imgs/categorias.png'
import msg from '../imgs/no-connection2.png'
import CardRestaurant from '../components/CardRestaurant'
import { getAll } from '../services/localfoodService'
import localImg from '../imgs/tijuanaTacos.jpg'
import { config } from "../config";
import { useSearchParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getMyFavLocalfoods } from '../services/userService'

function VerRestaurantes() {
  const [localfood, setLocalfood] = React.useState([]);
  const [onlyFavs, setOnlyFavs] = React.useState(false);

  const { getItem: getToken } = useLocalStorage('token');
  const { getItem: getUserId } = useLocalStorage('userId');

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (searchParams.get('favoritos')) {
      setOnlyFavs(true);
    } else {
      setOnlyFavs(false);
    }
  }, [searchParams]);

  React.useEffect(() => {
    getLocalFoods(searchParams.get('buscar'), onlyFavs);
  }, [onlyFavs]);

  function getLocalFoods(keywords = null, onlyFavs = false) {
    if (onlyFavs) {
      getMyFavLocalfoods(getUserId(), getToken()).then((response) => {
        setLocalfood(response.data);
      }).catch(e => {
        console.log(e);
      });
    } else {
      getAll(keywords, getToken()).then((response) => {
        setLocalfood(response.data);
      }).catch(e => {
        console.log(e);
      });
    }
  }

  const onClickFav = () => {
    setSearchParams({ favoritos: true });
  }

  const onClickExplore = () => {
    setSearchParams({});
  }

  const handleOnFav = (localfoodId, wasAdded) => {
    //hide from fav section
    if (onlyFavs && !wasAdded) {
      const localfoodsWithoutLastRemoved = localfood.filter(lf => lf.id !== localfoodId);
      setLocalfood(localfoodsWithoutLastRemoved);
      return;
    }

    const favUpdatedLocalfood = localfood.map(lf => {
      if (lf.id === localfoodId) {
        return {
          ...lf,
          added_to_fav: wasAdded
        }
      }
      return lf;
    });
    setLocalfood(favUpdatedLocalfood);
  }

  return (
    <>
      <div className="bar-Restaurantes">
        <div className="fav">
          <button className='bar-Resta-btn' onClick={onClickFav}>
            <img src={fav} alt="" />
            <span>Favoritos</span>
          </button>
        </div>
        <div className="explorar">
          <button className='bar-Resta-btn' onClick={onClickExplore}>
            <img src={explorar} alt="" />
            <span>Explorar</span>
          </button>
        </div>
        <div className="categ">
          <button className='bar-Resta-btn'>
            <img src={categ} alt="" />
            <span>Categorías</span>
          </button>
        </div>
      </div>
      {
        localfood.length > 0 ?
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
                  image={config.backendUrl + local.profile_image}
                  name={local.name}
                  descr={local.description}
                  horario={local.schedule}
                  dir={local.address}
                  categories={local.categories}
                  isAddedToFav={local.added_to_fav}
                  handleOnFav={handleOnFav}
                />
              ))
            }
          </section>
          : <div className='msg-local'>
              <h2>No hay Restaurantes registrados</h2>
              <img src={msg}></img>
            </div>
      }
    </>
  )
}

export default VerRestaurantes
