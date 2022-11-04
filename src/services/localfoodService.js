import axios from 'axios';
import { config } from '../config';

const create = async (localfood, token) => {
  try {
    const formData = new FormData();

    Object.keys(localfood).forEach(key => {
      formData.append(key, localfood[key]);
    });

    return axios.post(`${config.backendUrl}/localfood/`, formData, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export { create };
