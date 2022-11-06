import './User.css';
import React from "react";
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { get } from '../../services/userService';

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
    </main>
  );
}

export { User };
