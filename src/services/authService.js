import axios from 'axios';
import { config } from '../config';

const login = async (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  try {
    const response = await axios.post(`${config.backendUrl}/login/`, formData);

    if (response.status !== 200) {
      throw new Error();
    }

    return response.data;
  } catch {
    console.error('Error trying to login');
    throw new Error();
  }
}

const logout = async (token) => {
  const formData = new FormData();

  formData.append('token', token);

  try {
    const response = await axios.post(`${config.backendUrl}/logout/`, formData);

    if (response.status !== 200) {
      throw new Error();
    }

    return response.data;
  } catch {
    console.error('Error trying to logout');
    throw new Error();
  }
}

const getInfoFromToken = (token) => {
  return axios.get(`${config.backendUrl}/token/about/`, {
    headers: {
      'Authorization': `Token ${token}`,
    }
  });
}

export { login, logout, getInfoFromToken };
