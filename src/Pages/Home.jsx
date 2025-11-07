import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e5ded9] p-6 flex">
      <div
        className="relative flex-1 rounded-2xl shadow-2xl overflow-hidden bg-cover bg-center p-8 md:p-16 flex flex-col justify-between"
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/616ee001f76d635bd14b7249/a8d4aeb7-e200-497a-a3d9-dd7c0863ecdd/EM_210819_WEB_4127.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="text-left text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Acervo Virtual
          </h1>
          <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
            Mais que uma loja, somos o seu ponto de encontro com a próxima
            leitura. Navegue pelo nosso acervo selecionado com calma, como se
            estivesse em uma biblioteca. <br />
            <br />A diferença? Aqui, você pode escolher os seus favoritos para
            chamar de seus.
          </p>
        </div>

        <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-3xl mt-8">
          <p className="text-gray-700 text-lg mb-6">
            Já possui uma conta ou quer criar uma? Faça login para ver seus
            pedidos ou cadastre-se para começar sua coleção.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="px-8 py-3 text-lg font-semibold text-white bg-[#1a0902] rounded-lg shadow-md hover:border border-[#1a0902] hover:bg-white hover:text-[#1a0902]  transition duration-300 transform hover:scale-105"
            >
              Fazer Login
            </Link>
            <Link
              to="/cadastro"
              className="px-8 py-3 text-lg font-semibold text-[#1a0902] border border-[#1a0902] bg-white rounded-lg shadow-sm hover:bg-[#1a0902] hover:text-white transition duration-300"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}