import React, { useState } from 'react';
import { searchBooksByTerm } from '../Api/isbnApi'; 
import { useLibrary } from '../hooks/useLibrary';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function BookSearchResultCard({ book, onSelect }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 border-l-4 border-teal-400 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-indigo-600 mb-3 line-clamp-1">
                    {book.authors?.join(' / ') || 'Autor Desconhecido'}
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                    <p>ISBN-13: {book.isbn || 'N/A'}</p>
                    <p>Ano: {book.year || 'N/A'}</p>
                    <p>Editora: {book.publisher || 'N/A'}</p>
                </div>
            </div>
            <button
                onClick={() => onSelect(book)}
                className="mt-4 w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700 transition duration-200 text-sm"
            >
                Adicionar à Biblioteca
            </button>
        </div>
    );
}


export default function BuscaLivroISBN() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [searchResults, setSearchResults] = useState(null); 
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
    setSearchResults(null); 

    searchBooksByTerm(searchTerm)
        .then(results => {
            if (results.length === 0) {
                setError('Nenhum livro encontrado para o termo: ' + searchTerm);
            }
            setSearchResults(results);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
  }

  function handleAddBook(book) {
      addBook(book);
      alert(`"${book.title}" adicionado com sucesso à sua biblioteca!`);
      navigate('/dashboard'); 
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        🔎 Busca de Livros (Google Books API)
      </h1>

      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite título, autor ou termo..."
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

      <div className="max-w-6xl mx-auto mt-8">
        {error && (
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg max-w-xl mx-auto">
            {error}
          </div>
        )}

        {searchResults && searchResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map(book => (
                    <BookSearchResultCard 
                        key={book.apiId} 
                        book={book} 
                        onSelect={handleAddBook} 
                    />
                ))}
            </div>
        )}
        
        {!searchResults && !error && !loading && (
          <p className="text-center mt-10 text-gray-500">
              Use o campo acima para buscar livros por título ou autor!
          </p>
        )}
      </div>
    </div>
  );
}