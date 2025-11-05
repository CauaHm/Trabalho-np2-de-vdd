import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const LIBRARY_KEY = 'userLibrary';

export function useLibrary() {
  const { currentUser, isLoggedIn } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (isLoggedIn && currentUser?.id) {
      const allLibraries = JSON.parse(localStorage.getItem(LIBRARY_KEY) || '{}');
      const userBooks = allLibraries[currentUser.id] || [];
      setBooks(userBooks);
    } else {
      setBooks([]);
    }
  }, [isLoggedIn, currentUser]);

  function saveBooks(newBooks) {
    const allLibraries = JSON.parse(localStorage.getItem(LIBRARY_KEY) || '{}');
    allLibraries[currentUser.id] = newBooks;
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(allLibraries));
    setBooks(newBooks);
  }

  // CREATE
  function addBook(bookData) {
    if (books.some(b => b.isbn === bookData.isbn)) {
      alert("Este livro já está na sua biblioteca!");
      return;
    }
    const newBook = { ...bookData, customStatus: 'Desejado', customId: Date.now() };
    saveBooks([...books, newBook]);
  }
  
  // DELETE
  function deleteBook(customId) {
    const newBooks = books.filter(b => b.customId !== customId);
    saveBooks(newBooks);
  }
  
  // UPDATE
  function updateBookStatus(customId, newStatus) {
      const newBooks = books.map(b => 
          b.customId === customId ? { ...b, customStatus: newStatus } : b
      );
      saveBooks(newBooks);
  }

  return { books, addBook, deleteBook, updateBookStatus };
}