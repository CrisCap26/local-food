import './MyUser.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { logout } from '../../services/authService';

const MyUser = () => {
  const navigate = useNavigate();
  const { getItem, deleteItem } = useLocalStorage('token');

  const handleLogout = () => {
    logout(getItem()).then(data => {
      console.log('Logout successfully', data);
      deleteItem();
      navigate('/');
    });
  }

  return (
    <main className="my-user">
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button>Ver mi usuario</button>
      <button>Editar mi usuario</button>
      <button>Eliminar mi usuario</button>
    </main>
  );
}

export { MyUser };
