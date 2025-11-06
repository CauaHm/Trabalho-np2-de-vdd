const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const BRASILAPI_URL = 'https://brasilapi.com.br/api/isbn/v1/';

function mapGoogleBookData(googleBook) {
  const info = googleBook.volumeInfo;
  
  let isbn = null;
  const identifiers = info.industryIdentifiers;
  if (identifiers) {
    const isbn13 = identifiers.find(id => id.type === 'ISBN_13');
    const isbn10 = identifiers.find(id => id.type === 'ISBN_10');
    isbn = isbn13 ? isbn13.identifier : (isbn10 ? isbn10.identifier : null);
  }

  return {
    title: info.title || 'Título Desconhecido',
    authors: info.authors || ['Autor Desconhecido'],
    publisher: info.publisher || 'N/A',
    year: info.publishedDate ? info.publishedDate.substring(0, 4) : 'N/A',
    isbn: isbn, 
    
    page_count: info.pageCount || 'N/A',
    synopsis: info.description || 'Sinopse não disponível.',
    format: info.printType || 'N/A', 
    
    apiId: googleBook.id 
  };
}

export async function searchBooksByTerm(query) {
  try {
    const cleanQuery = encodeURIComponent(query.trim());
    const response = await fetch(`${GOOGLE_BOOKS_URL}${cleanQuery}`);
    
    if (!response.ok) {
      throw new Error("Não foi possível buscar livros. Verifique o termo de pesquisa.");
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
        return [];
    }

    // Mapeia e retorna os 10 primeiros resultados
    return data.items.slice(0, 10).map(mapGoogleBookData);
    
  } catch (error) {
    console.error("Erro na busca por termo (Google Books):", error.message);
    throw error;
  }
}

export async function fetchBookByISBN(isbn) {
  try {
    const cleanIsbn = isbn.replace(/-/g, '').trim();
    const response = await fetch(`${BRASILAPI_URL}${cleanIsbn}`);
    
    if (!response.ok) {
      throw new Error("Não foi possível buscar o livro. Verifique o ISBN.");
    }
    
    return await response.json();
    
  } catch (error) {
    console.error("Erro na busca por ISBN (BrasilAPI):", error.message);
    throw error;
  }
}