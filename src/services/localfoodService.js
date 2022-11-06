import axios from 'axios';
import { config } from '../config';

const get = async (token, localfoodId) => {
  return axios.get(`${config.backendUrl}/localfood/${localfoodId}`, {
    headers: {
      'Authorization': `Token ${token}`,
    }
  });
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

export { get, create };
