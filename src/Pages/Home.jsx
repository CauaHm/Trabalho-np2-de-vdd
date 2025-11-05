import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-20 text-center bg-gray-50">
      <div className="max-w-4xl p-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          📚 Gerenciador Visual de Livros
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Este é um projeto de estudo focado no **Frontend** (React + Tailwind) e no consumo de API.
          <br/> O CRUD e as autenticações são **simulados** para fins didáticos.
        </p>
        <div className="flex justify-center space-x-6">
          <Link 
            to="/login" 
            className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Fazer Login
          </Link>
          <Link 
            to="/consumo-api" 
            className="px-8 py-3 text-lg font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300"
          >
            Acessar API Pública
          </Link>
        </div>
      </div>
    </div>
  );
}