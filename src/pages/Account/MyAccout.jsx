import './MyAccount.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { logout } from '../../services/authService';

const MyAccount = () => {
  const navigate = useNavigate();
  const { getItem, deleteItem } = useLocalStorage('token');

  const handleLogout = () => {
    logout(getItem()).then(data => {
      console.log('Logout successfully', data);
      deleteItem();
      navigate('/');
    });
  }

  const handleOnClickProfile = () => {
    navigate('/mi-usuario');
  }

  const handleOnClickLocalfood = () => {
    navigate('/mi-negocio');
  }

  return (
    <main className="my-account">
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={handleOnClickProfile}>Ir a mi perfil</button>
      <button onClick={handleOnClickLocalfood}>Ir a mi negocio</button>
    </main>
  );
}

export { MyAccount };
