// src/pages/Dashboard.jsx

import React from 'react';
import { useLibrary } from '../hooks/useLibrary';
import { useAuth } from '../hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';

function BookCard({ book, onDelete, onUpdateStatus }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-xl border-t-4 border-indigo-500 flex flex-col justify-between h-full">
            <div>
                <h3 className="text-xl font-bold text-gray-800 line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{book.authors?.join(', ') || 'Autor Desconhecido'}</p>
            </div>
            
            <div className="space-y-2 text-sm">
                <p className="text-gray-500">ISBN: {book.isbn}</p>
                <p className={`font-semibold ${book.customStatus === 'Lido' ? 'text-green-600' : book.customStatus === 'Em Leitura' ? 'text-blue-600' : 'text-orange-500'}`}>
                    Status: {book.customStatus}
                </p>
            </div>
            
            <div className="mt-4 space-y-2">
                <select
                    value={book.customStatus}
                    onChange={(e) => onUpdateStatus(book.customId, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500"
                >
                    <option value="Desejado">Desejado</option>
                    <option value="Em Leitura">Em Leitura</option>
                    <option value="Lido">Lido</option>
                </select>
                <button
                    onClick={() => onDelete(book.customId)}
                    className="w-full py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition"
                >
                    Remover (DELETE)
                </button>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { books, deleteBook, updateBookStatus } = useLibrary();
    const { currentUser, isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Minha Biblioteca de {currentUser.nome}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                📖 Gerencie seus {books.length} livros.
            </p>

            <Link 
                to="/consumo-api"
                className="inline-block py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition mb-6 shadow-md"
            >
                + Adicionar Novo Livro (Consumo API)
            </Link>

            {books.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-xl shadow-lg mt-8 border-l-4 border-indigo-200">
                    <p className="text-xl text-gray-500">Sua biblioteca está vazia. Use o botão acima para começar!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map(book => (
                        <BookCard 
                            key={book.customId} 
                            book={book} 
                            onDelete={deleteBook}
                            onUpdateStatus={updateBookStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}