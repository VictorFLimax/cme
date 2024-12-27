const API_MATERIAL_URL = 'http://localhost:8000/api/material/';
const API_STAGE_URL = 'http://localhost:8000/api/stage/';

// Função para buscar material pelo serial
export const getMaterialBySerial = async (serial) => {
  try {
    const response = await fetch(`${API_MATERIAL_URL}?serial=${serial}`);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Erro recebido do backend ao buscar material:', errorResponse);
      throw new Error(errorResponse.detail || 'Erro ao buscar material');
    }

    const data = await response.json();
    console.log('Material obtido com sucesso:', data);

    // Verificar se os dados são válidos
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Nenhum material encontrado.');
    }

    const material = data.find(item => item.serial === serial);
    if (!material) {
      throw new Error('Material não encontrado para o serial fornecido.');
    }

    return material;
  } catch (error) {
    console.error('Erro ao buscar material:', error.message);
    throw new Error('Erro ao buscar material no backend: ' + error.message);
  }
};

// Função para buscar todas as etapas
export const getAllStages = async () => {
  try {
    const response = await fetch(API_STAGE_URL);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Erro recebido do backend ao buscar etapas:', errorResponse);
      throw new Error(errorResponse.detail || 'Erro ao obter etapas');
    }

    const data = await response.json();
    console.log('Etapas obtidas com sucesso:', data);

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Nenhuma etapa encontrada.');
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar etapas:', error.message);
    throw new Error('Erro ao buscar etapas no backend: ' + error.message);
  }
};

// Função para atualizar o status de uma etapa
export const updateStageStatus = async (stageId, status) => {
  try {
    console.log(`Atualizando status da etapa ${stageId} para ${status}`);

    const response = await fetch(`${API_STAGE_URL}${stageId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Erro recebido do backend ao atualizar status da etapa:', errorResponse);
      throw new Error(errorResponse.detail || 'Erro ao atualizar o status da etapa');
    }

    const data = await response.json();
    console.log('Status da etapa atualizado com sucesso:', data);

    if (!data || !data.status) {
      throw new Error('Falha ao atualizar o status da etapa.');
    }

    return data;
  } catch (error) {
    console.error('Erro ao atualizar status da etapa:', error.message);
    throw new Error('Erro ao atualizar status da etapa no backend: ' + error.message);
  }
};
