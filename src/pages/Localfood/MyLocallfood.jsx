import './MyLocalfood.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { logout } from '../../services/authService';

const MyLocalfood = () => {
  const navigate = useNavigate();
  const { getItem, deleteItem } = useLocalStorage('token');

  return (
    <main className="my-localfood">
      <h1>Mi negocio</h1>
      <button>Ver mi negocio</button>
      <button>Editar mi negocio</button>
      <button>Eliminar mi negocio</button>
    </main>
  );
}

export { MyLocalfood };
