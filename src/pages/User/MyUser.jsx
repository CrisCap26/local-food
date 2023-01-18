import './MyUser.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { destroy } from '../../services/userService';
import { toast } from 'react-toastify';

const MyUser = () => {
  const navigate = useNavigate();
  const { getItem: getToken, deleteItem: deleteToken } = useLocalStorage('token');
  const { getItem: getUserId, deleteItem: deleteUserId } = useLocalStorage('userId');

  const handleOnSee = () => {
    navigate(`/usuario/${getUserId()}`);
  }

  const handleOnDelete = () => {
    if(window.confirm('¿Estás seguro?')) {
      destroy(getToken(), getUserId()).then(data => {
        console.log('User deleted successfully', data);
        deleteToken();
        deleteUserId();
        toast.success("Usuario eliminado correctamente", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        navigate('/');
      });
    }
  }

  const handleUpdate = () => {
    navigate(`/editar-usuario/${getUserId()}`);
  }

  return (
    <main className="my-user">
      <h1>Mi usuario</h1>
      <button onClick={handleOnSee}>Ver mi usuario</button>
      <button onClick={handleUpdate}>Editar mi usuario</button>
      <button onClick={handleOnDelete}>Eliminar mi usuario</button>
    </main>
  );
}

export { MyUser };
