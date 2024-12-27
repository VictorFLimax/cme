const API_URL = 'http://localhost:8000/api/material/';

// Função para cadastrar material
export const cadastrarMaterial = async (material) => {
  try {
    console.log('Enviando dados ao backend:', material);

    // Realizando a requisição
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(material), // Serializando o objeto
    });

    // Verifica se a resposta não foi bem-sucedida
    if (!response.ok) {
      const textResponse = await response.text(); // Obtém a resposta como texto
      console.error('Erro recebido do backend:', textResponse);
      // Se a resposta não for um JSON válido, o erro é lançado
      throw new Error('Erro ao cadastrar material: ' + textResponse);
    }

    // Processa a resposta bem-sucedida (tenta converter para JSON)
    const data = await response.json();
    console.log('Material cadastrado com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro no cadastro de material:', error.message);
    throw error; // Propaga o erro para ser tratado onde a função é chamada
  }
};

