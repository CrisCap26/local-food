import './MyAccount.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { logout, getInfoFromToken } from '../../services/authService';
import { toast } from 'react-toastify';

// @deprecated
const MyAccount = () => {
  const navigate = useNavigate();
  const { getItem: getToken, deleteItem: deleteToken } = useLocalStorage('token');
  const { deleteItem: deleteUserId } = useLocalStorage('userId');
  const [localfoodId, setLocalfoodId] = React.useState(null);

  React.useEffect(() => {
    getInfoFromToken(getToken()).then(response => {
      setLocalfoodId(response.data.localfood.id);
    });
  }, []);

  const handleLogout = () => {
    logout(getToken()).then(data => {
      console.log('Logout successfully', data);
      deleteToken();
      deleteUserId();
      toast.success("Sesión cerrada correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      navigate('/');
    });
  }

  const handleOnClickProfile = () => {
    navigate('/mi-usuario');
  }

  const handleOnClickLocalfood = () => {
    navigate('/mi-negocio');
  }

  const handleOnCreateLocalfood = () => {
    navigate('/RegistrarRestaurante');
  }

  return (
    <main className="my-account">
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={handleOnClickProfile}>Ir a mi perfil</button>
      {localfoodId
        ? <button onClick={handleOnClickLocalfood}>Ir a mi negocio</button>
        : <button onClick={handleOnCreateLocalfood}>Crear un negocio</button>
      }
    </main>
  );
}

export { MyAccount };
