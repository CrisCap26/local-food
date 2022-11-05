import axios from 'axios';
import { config } from '../config';

const create = async (user) => {
  try {
    return axios.post(`${config.backendUrl}/user/`, user);
  } catch (error) {
    console.error(error);
  }
}

export { create };
