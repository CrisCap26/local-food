import './MyLocalfood.css';
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { destroy } from '../../services/localfoodService';
import { toast } from 'react-toastify';

const MyLocalfood = () => {
  const navigate = useNavigate();
  const { getItem: getToken} = useLocalStorage('token');
  const { getItem: getLocalfoodId } = useLocalStorage('localfoodId');

  useEffect(() => {
    if(!getToken()) {
      navigate('/login');
    } else if(!getLocalfoodId()) {
      navigate('/RegistrarRestaurante');
    }
  }, []);

  const handleOnClickSee = () => {
    console.log(getLocalfoodId())
    navigate(`/PerfilRestaurante/${getLocalfoodId()}`)
  }

  const handleOnDelete = () => {
    if(window.confirm('¿Estás seguro?')) {
      destroy(getToken(), getLocalfoodId()).then(data => {
        console.log('Negocio deleted successfully', data);
        toast.success("Negocio eliminado correctamente", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      });
    }
  }

  const handleUpdate = () => {
    navigate('/editar-negocio')
  }

  return (
    <main className="my-localfood">
      <h1>Mi negocio</h1>
      <button onClick={handleOnClickSee}>Ver mi negocio</button>
      <button onClick={handleUpdate}>Editar mi negocio</button>
      <button onClick={handleOnDelete}>Eliminar mi negocio</button>
    </main>
  );
}

export { MyLocalfood };
