import axios from 'axios';
import { config } from '../config';

const get = async (token, productId) => {
  return axios.get(`${config.backendUrl}/product/${productId}/`, {
    headers: {
      'Authorization': `Token ${token}`,
    }
  });
}

const getAllCategories = async (token, productId) => {
  return axios.get(`${config.backendUrl}/product/category/`);
}

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

const update = async (product, id,token) => {
  try {
    const formData = new FormData();

    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });

    return axios.put(`${config.backendUrl}/product/${id}/`, formData, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const destroy = (token, productId) => {
  return axios.delete(`${config.backendUrl}/product/${productId}`, {
    headers: {
      'Authorization': `Token ${token}`,
    }
  });
}

export { get, getAllCategories, create, update, destroy };
