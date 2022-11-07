import './User.css';
import React from "react";
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { get } from '../../services/userService';
import imgUser from '../../imgs/icon-user.png';

const User = () => {
  const params = useParams();
  const { getItem: getToken } = useLocalStorage('token');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    get(getToken(), params.userId).then(response => {
      setUser(response.data);
    });
  }, []);

  return (
    <main className="user">
      <h1>Hola {user?.username}</h1>
      <div className='container'>
      <img src={imgUser}></img>
      <div className='container-info-user'>
        <div className='info-user'>Nombre: <p>{user?.name}</p></div>
        <div className='info-user'>Apellidos: <p>{user?.last_name}</p></div>
        <div className='info-user'>Telefono: <p>{user?.phone_number}</p></div>
        <div className='info-user'>Email: <p>{user?.email}</p></div>
      </div>
      </div>
    </main>
  );
}

export { User };
