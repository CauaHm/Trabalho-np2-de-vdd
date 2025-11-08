import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e5ded9] p-6 flex flex-col gap-6">
      <div className="p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <h1 className="text-5xl md:text-8xl font-serif font-extrabold text-[#1a0902]">
              Acervo Virtual
            </h1>
          </div>

          <div>
            <p className="text-lg md:text-xl leading-relaxed">
              Mais que uma loja, somos o seu ponto de encontro com a próxima
              leitura. Navegue pelo nosso acervo selecionado com calma, como se
              estivesse em uma biblioteca. <br />
              <br />A diferença? Aqui, você pode escolher os seus favoritos para
              chamar de seus.
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative flex-1 rounded-2xl shadow-2xl overflow-hidden bg-cover bg-center p-8 md:p-16 flex flex-col justify-end" 
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/616ee001f76d635bd14b7249/a8d4aeb7-e200-497a-a3d9-dd7c0863ecdd/EM_210819_WEB_4127.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent/50"></div>

        <div className="relative z-10 bg-[#e5ded9] rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-3xl">
          <p className="text-lg mb-6">
            Já possui uma conta ou quer criar uma? Faça login para ver seus
            pedidos ou cadastre-se para começar sua coleção.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="px-8 py-3 text-lg font-semibold text-white bg-[#1a0902] rounded-lg shadow-md hover:border border-[#1a0902] hover:bg-transparent hover:text-[#1a0902]  transition duration-300 transform hover:scale-105"
            >
              Fazer Login
            </Link>
            <Link
              to="/cadastro"
              className="px-8 py-3 text-lg font-semibold text-[#1a0902] border border-[#1a0902] rounded-lg shadow-sm hover:bg-[#1a0902] hover:text-white transition duration-300"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}