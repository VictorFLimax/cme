
const API_URL = 'http://localhost:8000/api/users/';

export const createUser = async (userData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar o usuário');
  }

  return await response.json();
};
