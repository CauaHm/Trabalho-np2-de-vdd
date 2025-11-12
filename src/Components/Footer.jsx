import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1a0902] text-white p-4">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Acervo Virtual. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}