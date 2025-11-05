import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes de Layout
import Header from './Components/Header'; 
import Footer from './Components/Footer'; 

// Páginas
import Home from './Pages/Home';
import Login from './Pages/Login';
import CadastroUsuario from './Pages/CadastroUsuario';
import BuscaLivroISBN from './Pages/BuscaLivroISBN';
import Dashboard from './Pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <Header /> 
        
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />
            <Route path="/consumo-api" element={<BuscaLivroISBN />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
          </Routes>
        </main>
        
        <Footer />
        
      </div>
    </Router>
  );
}