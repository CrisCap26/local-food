import axios from 'axios';
import { config } from '../config';

const create = async (product, token) => {
  try {
    const formData = new FormData();

    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });

    return axios.post(`${config.backendUrl}/product/`, formData, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export { create };
