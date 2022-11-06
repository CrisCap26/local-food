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

const update = async (user, id, token) => {
  try {
    const formData = new FormData();

    Object.keys(user).forEach(key => {
      formData.append(key, user[key]);
    });

    return axios.put(`${config.backendUrl}/user/${id}/`,
    formData, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export { get, create, destroy, update };
