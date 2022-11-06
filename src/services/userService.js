import axios from 'axios';
import { config } from '../config';
import { logout } from './authService';

const get = async (token, userId) => {
  return axios.get(`${config.backendUrl}/user/${userId}`, {
    headers: {
      'Authorization': `Token ${token}`,
    }
  });
}

const create = async (user) => {
  return axios.post(`${config.backendUrl}/user/`, user);
}

const destroy = async (token, userId) => {
  try {
    const response = await axios.delete(`${config.backendUrl}/user/${userId}`, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    });

    await logout(token);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export { get, create, destroy };
