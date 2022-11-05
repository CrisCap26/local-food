import './MyUser.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { destroy } from '../../services/userService';

const MyUser = () => {
  const navigate = useNavigate();
  const { getItem: getToken, deleteItem: deleteToken } = useLocalStorage('token');
  const { getItem: getUserId, deleteItem: deleteUserId } = useLocalStorage('userId');

  const handleOnDelete = () => {
    destroy(getToken(), getUserId()).then(data => {
      console.log('User deleted successfully', data);
      deleteToken();
      deleteUserId();
      navigate('/');
    });
  }

  return (
    <main className="my-user">
      <h1>Mi usuario</h1>
      <button>Ver mi usuario</button>
      <button>Editar mi usuario</button>
      <button onClick={handleOnDelete}>Eliminar mi usuario</button>
    </main>
  );
}

export { MyUser };
