import axios from 'axios';
import { config } from '../config';
import { logout } from './authService';

const create = async (user) => {
  try {
    return axios.post(`${config.backendUrl}/user/`, user);
  } catch (error) {
    console.error(error);
  }
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

export { create, destroy };
