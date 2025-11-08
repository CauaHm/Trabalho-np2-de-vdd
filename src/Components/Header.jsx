import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="sticky top-4 z-10 mb-4">
      <div className="container mx-auto flex justify-between items-center bg-white p-4 shadow-lg rounded-xl">
        <Link
          to="/"
          className="text-2xl font-bold text-[#1a0902] hover:text-gray-700 transition flex items-center space-x-3"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/613/613167.png"
            alt="Logo Acervo Virtual"
            className="h-8 w-8"
          />
          <span className='font-serif'>Acervo Virtual</span>
        </Link>

        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-[#1a0902] hover:text-gray-700 transition hidden sm:inline font-medium"
          >
            Início
          </Link>
          <Link
            to="/consumo-api"
            className="text-[#1a0902] hover:text-gray-700 transition hidden sm:inline font-medium"
          >
            API ISBN
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-[#1a0902] hover:text-gray-700 transition hidden sm:inline font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-[#1a0902] text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-150 shadow-sm text-sm sm:text-base"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:border border-[#1a0902] hover:bg-white hover:text-[#1a0902]  transition duration-300 transform bg-[#1a0902] text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-150 shadow-sm text-sm sm:text-base"
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