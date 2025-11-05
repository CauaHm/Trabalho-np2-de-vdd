import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-indigo-600 p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-indigo-200 transition">
          📚 Biblioteca Fake
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-indigo-200 transition hidden sm:inline">Início</Link>
          <Link to="/consumo-api" className="text-white hover:text-indigo-200 transition hidden sm:inline">API ISBN</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-indigo-200 transition hidden sm:inline">Dashboard</Link>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-150 shadow-md text-sm sm:text-base"
              >
                Sair
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition duration-150 shadow-md text-sm sm:text-base"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;