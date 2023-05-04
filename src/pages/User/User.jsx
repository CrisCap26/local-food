import './User.css';
import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { get } from '../../services/userService';
import imgUser from '../../imgs/icon-user.png';
import { config } from '../../config';

const User = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getItem: getToken } = useLocalStorage('token');
  const [user, setUser] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(imgUser);

  React.useEffect(() => {
    get(getToken(), params.userId).then(response => {
      const fetchedUser = response.data;
      setUser(fetchedUser);
      if (fetchedUser.profile_image) {
        setProfileImage(config.backendUrl + fetchedUser.profile_image);
      } else {
        setProfileImage(imgUser);
      }
    }).catch(e => {
      navigate('/404');
    });
  }, []);

  const handleUpdate = () => {
    navigate('/editar-usuario');
  }

  return (
    <main className='user-cont'>
      <h1 className='user-title'>Hola {user?.username}</h1>
      <div className="container">
        <div className="shape">
            <div className="image">
              <img src={profileImage}></img>
            </div>
        </div>
        
        <div className='container-info-user'>
          <div className='info-user'>Nombre: <p>{user?.name}</p></div>
          <div className='info-user'>Apellidos: <p>{user?.last_name}</p></div>
          <div className='info-user'>Teléfono: <p>{user?.phone_number}</p></div>
          <div className='info-user'>Email: <p>{user?.email}</p></div>
        </div>
        <button className='editar-user' onClick={handleUpdate}>Editar</button>
      </div>
    </main>
    
  );
}

export { User };
