import './MyUser.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { logout } from '../../services/authService';

const MyUser = () => {
  const navigate = useNavigate();
  const { getItem, deleteItem } = useLocalStorage('token');

  return (
    <main className="my-user">
      <h1>Mi usuario</h1>
      <button>Ver mi usuario</button>
      <button>Editar mi usuario</button>
      <button>Eliminar mi usuario</button>
    </main>
  );
}

export { MyUser };
