import './MyLocalfood.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { destroy, restore } from '../../services/localfoodService';
import { toast } from 'react-toastify';
import { getInfoFromToken } from '../../services/authService';

const MyLocalfood = () => {
  const [wasLocalfoodDeleted, setWasLocalfoodDeleted] = useState(false);
  const navigate = useNavigate();
  const { getItem: getToken} = useLocalStorage('token');
  const { getItem: getLocalfoodId } = useLocalStorage('localfoodId');

  useEffect(() => {
    if(!getToken()) {
      navigate('/login');
    } else if(!getLocalfoodId()) {
      navigate('/RegistrarRestaurante');
    } else {
      getInfoFromToken(getToken()).then(response => {
        setWasLocalfoodDeleted(response.data.localfood.is_deleted);
      });
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
        setWasLocalfoodDeleted(true);
      });
    }
  }

  const handleUpdate = () => {
    navigate('/editar-negocio')
  }

  const handleOnRestore = () => {
    if(window.confirm('¿Estás seguro?')) {
      restore(getLocalfoodId(), getToken()).then(data => {
        console.log('Negocio restored successfully', data);
        toast.success("Negocio restaurado correctamente", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        setWasLocalfoodDeleted(false);
      });
    }
  }

  return (
    <main className="my-localfood">
      <h1>Mi negocio</h1>
      {!wasLocalfoodDeleted
        ? <>
          <button onClick={handleOnClickSee}>Ver mi negocio</button>
          <button onClick={handleUpdate}>Editar mi negocio</button>
          <button onClick={handleOnDelete}>Eliminar mi negocio</button>
        </>
        : <>
          <p>Parece que tu negocio ha sido eliminado, ¿deseas restaurarlo?</p>
          <button onClick={handleOnRestore}>Restaurar mi negocio</button>
        </>
      }
    </main>
  );
}

export { MyLocalfood };
