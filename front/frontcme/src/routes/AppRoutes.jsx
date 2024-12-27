import { Routes, Route } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Material from '../pages/Material';
import Stages from '../pages/Stages';
import Traceability from '../pages/Traceability';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />  {/* Página inicial agora é o Cadastro */}
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/material" element={<Material />} />
      <Route path="/stages" element={<Stages />} />
      <Route path="/traceability" element={<Traceability />} />
    </Routes>
  );
};

export default AppRoutes;
