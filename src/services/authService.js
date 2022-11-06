import axios from 'axios';
import { config } from '../config';

const login = async (username, password) => {
  const body = {
    username,
    password,
  }

  try {
    const response = await fetch(`${config.backendUrl}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch {
    console.error('Error trying to login');
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
