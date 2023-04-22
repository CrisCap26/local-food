import React from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { get } from "../services/localfoodService";
import CardMisPlatillos from '../components/CardMisPlatillos';
import { config } from "../config";
import imageDefault from "../imgs/tacos.jpg"

function VerPlatillos() {

    const [platillos, setPlatillos] = React.useState([]);
    const params = useParams();
    const {item:localfoodId} = useLocalStorage('localfoodId');
    console.log(localfoodId)
    console.log(params.localfoodId)
    const isCurrentOwner = localfoodId == params.localfoodId;
    console.log(isCurrentOwner)

    function reloadPlatillos() {
      get(params.localfoodId).then((response) => {
        setPlatillos(response.data.products);
        console.log(response.data.products)
      }).catch(e => {
        console.log('/404');
      });
    }

    React.useEffect(()=> {
      reloadPlatillos();
    }, []);

    
    
    
  return (
    <div className='container-platillos'>
      <h1 className="misPlatillos-titulo">Platillos</h1>
      {
        platillos.length > 0 ?
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
                  canEdit={isCurrentOwner}
                />
              ))
            }
          </section>
          : <div className='msg-platillos'>
            <h2 className='misPlatillos-titulo-2'>No tienes platillos creados, crea uno dando clic en el boton "Añadir Platillo"</h2>
            
          </div>
      }
    </div>
  )
}

export default VerPlatillos