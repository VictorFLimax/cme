import { useState, useEffect } from 'react';
import { fetchTraceability, downloadReport } from '../../services/traceabilityService';
import './style.css';

function Traceability() {
  const [serial, setSerial] = useState('');
  const [traceabilityData, setTraceabilityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchTraceability = async () => {
    setLoading(true);
    try {
      const data = await fetchTraceability(serial);
      setTraceabilityData(data);
    } catch (error) {
      console.error('Erro ao buscar rastreabilidade:', error);
      alert('Erro ao carregar os dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTraceability(serial);
        setTraceabilityData(data);
      } catch (error) {
        console.error('Erro ao buscar rastreabilidade:', error);
        alert('Erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serial]);

  return (
    <div className="container">
      <h1>Rastreabilidade</h1>

      {/* Filtro por Serial */}
      <div>
        <input
          type="text"
          placeholder="Digite o serial"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
        />
        <button onClick={handleFetchTraceability} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Tabela de Rastreabilidade */}
      <table>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Etapa</th>
            <th>Executado por</th>
            <th>Data/Hora</th>
            <th>Falha</th>
          </tr>
        </thead>
        <tbody>
          {traceabilityData.length > 0 ? (
            traceabilityData.map((record) => (
              <tr key={record.id}>
                <td>{record.material_serial}</td>
                <td>{record.stage.name}</td>
                <td>{record.performed_by_username}</td>
                <td>{new Date(record.timestamp).toLocaleString()}</td>
                <td>{record.failure || 'Nenhuma'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum dado encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Botões para Relatórios */}
      <div className="button-group">
        <button onClick={() => downloadReport('pdf')}>Gerar PDF</button>
        <button onClick={() => downloadReport('xlsx')}>Gerar XLSX</button>
      </div>
    </div>
  );
}

export default Traceability;
