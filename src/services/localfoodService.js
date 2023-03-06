import axios from 'axios';
import { config } from '../config';

const get = async (localfoodId) => {
  return axios.get(`${config.backendUrl}/localfood/${localfoodId}`);
}

const getAll = async () => {
  return axios.get(`${config.backendUrl}/localfood/`)
}

const create = async (localfood, token) => {
  const formData = new FormData();

  Object.keys(localfood).forEach(key => {
    formData.append(key, localfood[key]);
  });

  return axios.post(`${config.backendUrl}/localfood/`, formData, {
    headers: {
      'Authorization': `Token ${token}`,
    }
  });
}

const destroy = (token, localfoodId) => {
  return axios.delete(`${config.backendUrl}/localfood/${localfoodId}`, {
    headers: {
      'Authorization': `Token ${token}`,
    }
  });
}

const update = async (localfood, id, token) => {
  try {
    const formData = new FormData();

    Object.keys(localfood).forEach(key => {
      formData.append(key, localfood[key]);
    });

    return axios.put(`${config.backendUrl}/localfood/${id}/`,
    formData, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export { get, create, destroy , update, getAll};