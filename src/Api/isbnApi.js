const BASE_URL = 'https://brasilapi.com.br/api/isbn/v1/';

export async function fetchBookByISBN(isbn) {
  try {
    const cleanIsbn = isbn.replace(/-/g, '').trim();
    const response = await fetch(`${BASE_URL}${cleanIsbn}`);
    
    if (!response.ok) {
      throw new Error("Não foi possível buscar o livro. Verifique o ISBN.");
    }
    
    return await response.json();
    
  } catch (error) {
    console.error("Erro na busca por ISBN:", error.message);
    throw error;
  }
}