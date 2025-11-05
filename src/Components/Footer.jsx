import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Projeto de CRUD Fake (Visual). Feito com React e Tailwind CSS.</p>
        <p className="mt-1 text-gray-400">Foco no Frontend e consumo da BrasilAPI (ISBN).</p>
      </div>
    </footer>
  );
}