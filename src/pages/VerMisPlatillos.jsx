import React, { useEffect } from 'react'
import CardMisPlatillos from '../components/CardMisPlatillos'
import { getInfoFromToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import imageDefault from "../imgs/tacos.jpg"
import './verMisPlatillos.css'
import { config } from "../config";
import notfood from '../imgs/notfood.png'

function VerMisPlatillos() {
  const [platillos, setPlatillos] = React.useState([]);
  const { getItem: getToken } = useLocalStorage('token');
  const navigate = useNavigate();

  useEffect(() => {
    getInfoFromToken(getToken()).then((response) => {
      console.log(response.data.products)
      setPlatillos(response.data.products)
    })
  }, [])
  function reloadPlatillos() {
    getInfoFromToken(getToken()).then((response) => {
      setPlatillos(response.data.products)
    })
      .catch(e => {
        navigate('/404');
      });
  }
  function addPlatillo() {
    navigate('/RegistrarPlatillo')
  }

  return (
    <div className='container-platillos'>
      <h1 className="misPlatillos-titulo">Mis Platillos</h1>
      {
        platillos?.length < 3 ?
          <section className="misPlatillos oneItem">
            {
              platillos.map((platillo, i) => (
                <CardMisPlatillos key={i}
                  id={platillo.id}
                  image={
                    platillo.image ? config.backendUrl + platillo.image
                      : imageDefault
                  }
                  name={platillo.name}
                  precio={platillo.price}
                  descr={platillo.description}
                  reloadPlatillos={reloadPlatillos}
                  canEdit={true}
                />
              ))
            }
          </section>
          : 
          <section className="misPlatillos">
            {
              platillos.map((platillo, i) => (
                <CardMisPlatillos key={i}
                  id={platillo.id}
                  image={
                    platillo.image ? config.backendUrl + platillo.image
                      : imageDefault
                  }
                  name={platillo.name}
                  precio={platillo.price}
                  descr={platillo.description}
                  reloadPlatillos={reloadPlatillos}
                  canEdit={true}
                />
              ))
            }
          </section>
      }

      {
        platillos.length <= 0 ? 
        <div className='msg-platillos'>
        <h2 className='misPlatillos-titulo-2'>No tienes platillos creados, crea uno dando clic en el boton "Añadir Platillo"</h2>
        <img src={notfood}></img>
      </div>
      : <></>
      }
      <div className="container-agregar">
        <button onClick={addPlatillo} className="agregarPlatillo">Añadir Platillo</button>
      </div>
    </div>
  )
}

export default VerMisPlatillos