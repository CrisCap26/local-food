import './MyLocalfood.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getInfoFromToken } from '../../services/authService';

const MyLocalfood = () => {
  const navigate = useNavigate();
  const { getItem: getToken} = useLocalStorage('token');
  const [localfoodId, setLocalfoodId] = React.useState(null);

  React.useEffect(() => {
    getInfoFromToken(getToken()).then(response => {
      setLocalfoodId(response.data.localfood.id);
    });
  }, []);

  const handleOnClickSee = () => {
    if (localfoodId) {
      navigate(`/restaurante/${localfoodId}`);
    }
  }

  return (
    <main className="my-localfood">
      <h1>Mi negocio</h1>
      <button onClick={handleOnClickSee}>Ver mi negocio</button>
      <button>Editar mi negocio</button>
      <button>Eliminar mi negocio</button>
    </main>
  );
}

export { MyLocalfood };
