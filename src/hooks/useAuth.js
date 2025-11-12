import { useState, useEffect } from 'react';

const STORAGE_KEY = 'fakeUsersDB';
const LOGGED_USER_KEY = 'loggedUser';

function getFakeUsers() { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
function setFakeUsers(users) { localStorage.setItem(STORAGE_KEY, JSON.stringify(users)); }

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem(LOGGED_USER_KEY))
  );
  const isLoggedIn = !!currentUser;

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setFakeUsers([{ id: 1, nome: "Admin", email: "teste@abc.com", senha: "123" }]);
    }
  }, []);

  function login(email, senha) {
    const users = getFakeUsers();
    const user = users.find(u => u.email === email && u.senha === senha);
    
    if (user) {
      const { senha: _, ...userData } = user;
      localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(userData));
      setCurrentUser(userData);
      return true;
    }
    return false;
  }

  function register(nome, email, senha) {
    const users = getFakeUsers();
    if (users.some(u => u.email === email)) {
      return false;
    }
    
    const newUser = { id: Date.now(), nome, email, senha };
    users.push(newUser);
    setFakeUsers(users);
    
    const { senha: _, ...userData } = newUser;
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  }

  function logout() {
    localStorage.removeItem(LOGGED_USER_KEY);
    setCurrentUser(null);
  }

  return { currentUser, isLoggedIn, login, register, logout };
}