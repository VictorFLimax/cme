import { useState } from 'react';
import { cadastrarMaterial } from '../../services/materialService';
import './style.css';

function Material() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Função para gerar o serial automaticamente
  const gerarSerial = (nomeMaterial) => {
    return nomeMaterial.toUpperCase().replace(/\s+/g, '_') + '_' + new Date().getTime();
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!nome || !tipo || !dataValidade) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setError('');
    const generatedSerial = gerarSerial(nome);

    // Dados a serem enviados ao backend
    const material = {
      name: nome,
      type: tipo,
      expiration_date: dataValidade,
      serial: generatedSerial,
    };

    try {
      const response = await cadastrarMaterial(material);

      if (response) {
        setSuccess(`Cadastrado com sucesso!`);
        // Limpa os campos após sucesso
        setNome('');
        setTipo('');
        setDataValidade('');

        // Exibir o código do produto (serial) ao usuário
        alert(`Material cadastrado com sucesso! Código do produto: ${generatedSerial}`);

        // Limpar a mensagem de sucesso após 3 segundos
        setTimeout(() => setSuccess(''), 1000);
      }
    } catch (error) {
      console.error(error);
      setError('Falha ao cadastrar material. Tente novamente.');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="material">
      <h2>Cadastro de Material</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Material</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Tipo do Material</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Data de Validade</label>
          <input
            type="date"
            value={dataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
            required
          />
        </div>

        {/* O campo de serial foi removido da tela */}
        {/* <div>
          <label>Serial (Automático)</label>
          <input
            type="text"
            value={gerarSerial(nome)} // Serial gerado automaticamente
            disabled
          />
        </div> */}

        <button type="submit">Cadastrar Material</button>
      </form>
    </div>
  );
}

export default Material;
