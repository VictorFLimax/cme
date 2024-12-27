import { Link } from 'react-router-dom';
import './style.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/cadastro">Cadastro</Link></li>
        <li><Link to="/material">Material</Link></li>
        <li><Link to="/stages">Processo</Link></li>
        <li><Link to="/traceability">Relatório</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
