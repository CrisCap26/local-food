import axios from 'axios';
import { config } from '../config';

const get = async (localfoodId) => {
  return axios.get(`${config.backendUrl}/localfood/${localfoodId}`);
}

const getAll = async (keywords = null, token = undefined) => {
  let queryParams = '?categories=true';
  if (!!keywords) queryParams += '&keywords=' + keywords;

  let requestConfig = undefined;
  if (!!token) {
    requestConfig = {
      headers: {
        'Authorization': `Token ${token}`,
      }
    };
  }

  return axios.get(`${config.backendUrl}/localfood/${queryParams}`, requestConfig);
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

const restore = async (id, token) => {
  try {
    return axios.post(`${config.backendUrl}/localfood/${id}/restore/`, undefined, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const addToFav = async (id, token) => {
  try {
    return axios.post(`${config.backendUrl}/localfood/${id}/fav/`, undefined, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const removeFromFav = async (id, token) => {
  try {
    return axios.delete(`${config.backendUrl}/localfood/${id}/fav/`, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const addComment = async (id, token, comment) => {
  

  return axios.post(`${config.backendUrl}/localfood/${id}/comment/`, {text: comment}, {
    headers: {
      'Authorization': `Token ${token}`,
    }
  })
}

export { get, create, destroy , update, getAll, restore, addToFav, removeFromFav, addComment};