import { useState, useEffect } from 'react';
import './style.css';
import { getAllStages, updateStageStatus, getMaterialBySerial } from '../../services/StagesService';

const Stages = () => {
  const [traceabilityData, setTraceabilityData] = useState({
    materialSerial: '', // Serial do material
    traceabilityRecords: [], // Armazenar os status de rastreabilidade
    materialInfo: null, // Informações do material
    stages: [] // Etapas do processo
  });

  const [loading, setLoading] = useState(false); // Controle de carregamento
  const [error, setError] = useState(null); // Controle de erros

  // Buscar etapas ao carregar o componente
  useEffect(() => {
    const fetchStages = async () => {
      try {
        setError(null); // Limpa erros anteriores
        const stagesData = await getAllStages();
        if (stagesData && Array.isArray(stagesData)) {
          setTraceabilityData((prevState) => ({
            ...prevState,
            stages: stagesData,
            traceabilityRecords: stagesData.map((stage) => ({
              stageId: stage.id,
              status: 'Não Definido' // Inicia todas as etapas como 'Não Definido'
            }))
          }));
        } else {
          throw new Error('Dados de etapas inválidos ou ausentes.');
        }
      } catch (error) {
        console.error('Erro ao buscar as etapas:', error);
        setError('Erro ao carregar as etapas. Tente novamente.');
      }
    };

    fetchStages();
  }, []);

  // Função para buscar material pelo serial
  const handleSearchMaterial = async () => {
    if (!traceabilityData.materialSerial.trim()) {
      alert('Por favor, insira um serial válido');
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const material = await getMaterialBySerial(traceabilityData.materialSerial);

      console.log('Material retornado:', material); // Log dos materiais retornados

      // Verificar se material é válido
      if (!material) {
        throw new Error('Nenhum material encontrado.');
      }

      // Atualizar as informações do material e os registros de rastreabilidade
      setTraceabilityData((prevState) => ({
        ...prevState,
        materialInfo: material,
        traceabilityRecords: prevState.stages.map((stage) => ({
          stageId: stage.id,
          status: 'Não Definido' // Inicia todos os status das etapas como 'Não Definido'
        }))
      }));

    } catch (error) {
      console.error('Erro ao buscar o material:', error.message);
      alert('Erro ao buscar o material: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar o status da etapa
  const handleStageStatusChange = async (stageId, newStatus) => {
    try {
      // Atualizando o status no estado local
      setTraceabilityData((prevState) => ({
        ...prevState,
        traceabilityRecords: prevState.traceabilityRecords.map((record) =>
          record.stageId === stageId ? { ...record, status: newStatus } : record
        )
      }));

      // Atualizar no backend
      await updateStageStatus(stageId, newStatus);
      console.log(`Status da etapa ${stageId} atualizado para ${newStatus}`);
    } catch (error) {
      console.error('Erro ao atualizar o status da etapa:', error);
      alert('Erro ao atualizar o status da etapa. Verifique sua conexão.');
    }
  };

  return (
    <div className="traceability-container">
      <h2>Rastreabilidade do Material</h2>

      <div className="material-info">
        <label>Serial do Material:</label>
        <input
          type="text"
          value={traceabilityData.materialSerial}
          onChange={(e) =>
            setTraceabilityData({ ...traceabilityData, materialSerial: e.target.value })
          }
          placeholder="Digite o Serial do Material"
        />
        <button onClick={handleSearchMaterial} disabled={loading}>
          {loading ? 'Buscando...' : 'Pesquisar'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {traceabilityData.materialInfo ? (
        <div className="material-details">
          <h3>Informações do Material</h3>
          <p><strong>Nome:</strong> {traceabilityData.materialInfo.name || 'Nome não disponível'}</p>
          <p><strong>Tipo:</strong> {traceabilityData.materialInfo.type || 'Tipo não disponível'}</p>
          <p><strong>Data de Validade:</strong> {traceabilityData.materialInfo.expiration_date || 'Data não disponível'}</p>

          <div className="stages">
            <h3>Etapas do Processo</h3>
            {traceabilityData.traceabilityRecords.length > 0 ? (
              traceabilityData.traceabilityRecords.map((record) => {
                const stage = traceabilityData.stages.find((s) => s.id === record.stageId);
                return (
                  <div key={record.stageId} className="stage">
                    <h4>{stage?.name || 'Nome da etapa não disponível'}</h4>
                    <p>{stage?.description || 'Descrição não disponível'}</p>
                    <button
                      onClick={() => handleStageStatusChange(record.stageId, 'Concluído')}
                      style={{ backgroundColor: 'green', color: 'white' }}
                    >
                      Concluído
                    </button>
                    <button
                      onClick={() => handleStageStatusChange(record.stageId, 'Falha')}
                      style={{ backgroundColor: 'red', color: 'white' }}
                    >
                      Falha
                    </button>
                    <div>Status: {record.status}</div>
                  </div>
                );
              })
            ) : (
              <p>Não há etapas disponíveis.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Por favor, pesquise um material.</p>
      )}
    </div>
  );
};

export default Stages;