
import './style.css';
import { useState } from 'react';
import { createUser } from '../../services/userService';

function Cadastro() {
  const [formData, setFormData] = useState({
    username: '',
    role: 'TECH',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username) {
      setError('Nome de usuário é obrigatório');
      return;
    }

    try {
      const data = await createUser(formData);
      console.log('Usuário cadastrado:', data);
      setError('');
      setSuccess('Usuário cadastrado com sucesso!');
      setFormData({ username: '', role: 'TECH' });
    } catch (err) {
      console.error(err);
      setError('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Usuários</h1>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nome de Usuário"
        />
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="TECH"
              checked={formData.role === 'TECH'}
              onChange={handleChange}
            />
            Técnico
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="NURSE"
              checked={formData.role === 'NURSE'}
              onChange={handleChange}
            />
            Enfermagem
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="ADMIN"
              checked={formData.role === 'ADMIN'}
              onChange={handleChange}
            />
            Administrativo
          </label>
        </div>
        <button type="submit">Cadastrar</button>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
}

export default Cadastro;


