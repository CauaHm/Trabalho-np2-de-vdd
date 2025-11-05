// src/pages/BuscaLivroISBN.jsx

import React, { useState } from 'react';
import { fetchBookByISBN } from '../Api/isbnApi';
import { useLibrary } from '../hooks/useLibrary';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function BookDetailsCard({ book, handleAddBook }) {
    return (
        <div className="mt-8 p-6 bg-white border-l-4 border-teal-500 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-lg text-indigo-600 mb-4">
                {book.authors?.join(' / ') || 'Autor Desconhecido'}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Editora:</strong> {book.publisher || 'N/A'}</p>
                <p><strong>Ano:</strong> {book.year || 'N/A'}</p>
                <p><strong>Páginas:</strong> {book.page_count || 'N/A'}</p>
                <p className="col-span-2 sm:col-span-3">
                    <strong>Formato:</strong> {book.format || 'N/A'}
                </p>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold text-gray-700">Sinopse</h4>
                <p className="text-gray-500 italic mt-1 text-sm">
                    {book.synopsis || 'Sinopse não disponível.'}
                </p>
            </div>

            <button
                onClick={handleAddBook} 
                className="mt-6 w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
            >
                Adicionar à Biblioteca (CREATE)
            </button>
        </div>
    );
}

export default function BuscaLivroISBN() {
  const [isbn, setIsbn] = useState(''); 
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addBook } = useLibrary();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
  }

  function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBookData(null); 

    fetchBookByISBN(isbn)
        .then(data => setBookData(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
  }

  function handleAddBook() {
      addBook(bookData);
      alert(`"${bookData.title}" adicionado com sucesso à sua biblioteca!`);
      navigate('/dashboard'); 
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        🔎 Busca de Livros por ISBN (BrasilAPI)
      </h1>

      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="Digite o ISBN (ex: 9788545702870)"
          className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`shrink-0 py-3 px-6 rounded-lg font-bold text-white shadow-md transition duration-300 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
          `}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      <div className="max-w-xl mx-auto">
        {error && (
          <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {bookData && !error && (
          <BookDetailsCard book={bookData} handleAddBook={handleAddBook} />
        )}
        
        {!bookData && !error && !loading && (
          <p className="text-center mt-10 text-gray-500">
              Use o campo acima para buscar os detalhes de um livro!
          </p>
        )}
      </div>
    </div>
  );
}