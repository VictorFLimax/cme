import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes'; // Importando as rotas

function App() {
  return (
    <Router>
      <Navbar /> {/* A barra de navegação estará disponível em todas as páginas */}
      <div className="content">
        <AppRoutes /> {/* As rotas vão renderizar as páginas aqui */}
      </div>
    </Router>
  );
}

export default App;