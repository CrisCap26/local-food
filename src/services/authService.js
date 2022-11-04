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

export { login };
