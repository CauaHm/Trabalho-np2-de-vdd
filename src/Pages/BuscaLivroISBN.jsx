import React, { useState } from 'react';
import { searchBooksByTerm } from '../Api/isbnApi'; 
import { useLibrary } from '../hooks/useLibrary';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function BookSearchResultCard({ book, onSelect }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-xl transition duration-300 border-t-4 border-teal-600 flex flex-col justify-between h-full">
            <div className="flex space-x-4">
                <div className="flex-shrink-0">
                    {book.coverImageUrl ? (
                        <img 
                            src={book.coverImageUrl} 
                            alt={`Capa do livro ${book.title}`} 
                            className="w-16 h-24 object-cover rounded shadow-md"
                        />
                    ) : (
                        <div className="w-16 h-24 bg-gray-200 flex items-center justify-center text-center text-xs text-gray-500 rounded border border-gray-300 p-1">
                            Sem Capa
                        </div>
                    )}
                </div>
                
                <div className="flex-grow min-w-0">
                    <h3 className="text-xl font-extrabold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-indigo-600 mb-3 font-medium line-clamp-1">
                        {book.authors?.join(' / ') || 'Autor Desconhecido'}
                    </p>
                </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600 space-y-1">
                <p>ISBN-13: <span className="font-medium text-gray-800">{book.isbn || 'N/A'}</span></p>
                <p>Ano: <span className="font-medium text-gray-800">{book.year || 'N/A'}</span></p>
                <p>Editora: <span className="font-medium text-gray-800">{book.publisher || 'N/A'}</span></p>
            </div>
            
            <button
                onClick={() => onSelect(book)}
                className="mt-4 w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
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

  function executeSearch(term) {
    if (!term) {
        setError('Por favor, digite um termo de busca.');
        return;
    } 

    setLoading(true);
    setError(null);
    setSearchResults(null); 

    searchBooksByTerm(term)
        .then(results => {
            if (results.length === 0) {
                setError('Nenhum livro encontrado para o termo: ' + term);
            }
            setSearchResults(results);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
  }

  function handleSearch(e) {
    e.preventDefault();
    executeSearch(searchTerm.trim());
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

      <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col gap-3">
              <div className="flex sm:flex-row gap-3">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Digite título, autor ou termo..."
                    className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150"
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
              </div>
          </form>
      </div>

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
              Digite um termo de busca para encontrar livros.
          </p>
        )}
      </div>
    </div>
  );
}