import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

export default function Login() {
  const [email, setEmail] = useState('teste@abc.com');
  const [senha, setSenha] = useState('123');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    
    if (login(email, senha)) {
        navigate('/dashboard'); 
    } else {
        setError('Email ou senha inválidos. Tente (teste@abc.com / 123)');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text[#1a0902] mb-6">
          Entrar
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm font-medium border border-red-200 p-2 rounded bg-red-50">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input 
              type="password" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="hover:border border-[#1a0902] hover:bg-white hover:text-[#1a0902]  transition duration-300 transform w-full flex justify-center  border-transparent rounded-md shadow-lg text-sm font-medium px-8 py-3 text-lg font-semibold text-white bg-[#1a0902] cursor-pointer"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem conta? {' '}
          <Link to="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}