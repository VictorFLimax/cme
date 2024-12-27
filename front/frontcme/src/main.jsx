// import { BrowserRouter as Router } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import AppRoutes from './routes/AppRoutes'; // Importando as rotas

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* A barra de navegação estará disponível em todas as páginas */}
//       <div className="content">
//         <AppRoutes /> {/* As rotas vão renderizar as páginas aqui */}
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import ReactDOM from 'react-dom/client'; // Alteração para 'react-dom/client'
import './index.css';
import App from './app.jsx'; // Importando o componente App, que contém as rotas

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Componente principal que inclui as rotas */}
  </React.StrictMode>
);




// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import AppRoutes from './routes/AppRoutes';
// // import Cadatro from './pages/Cadastro'
// // import Material from './pages/Material'
// // import Rastreabilidade from './pages/Rastreabilidade'
// // import Stages from './pages/Stages'
// createRoot(document.getElementById('root')).render(
//   <StrictMode>

//     <AppRoutes />
//     {/* <Material/> */}
//     {/* <Cadatro /> */}
//     {/* <Rastreabilidade/> */}
//     {/* <Stages/> */}
//   </StrictMode>,
// )
