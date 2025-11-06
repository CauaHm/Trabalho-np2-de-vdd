const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

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
    
    coverImageUrl: info.imageLinks?.thumbnail || null, 
    
    page_count: info.pageCount || 'N/A',
    synopsis: info.description || 'Sinopse não disponível.',
    format: info.printType || 'N/A', 
    
    apiId: googleBook.id 
  };
}

export async function searchBooksByTerm(query) {
  try {
    const cleanQuery = encodeURIComponent(query.trim());
    const response = await fetch(`${GOOGLE_BOOKS_BASE_URL}?q=${cleanQuery}&maxResults=40&startIndex=0`);
    
    if (!response.ok) {
      throw new Error("Não foi possível buscar livros. Verifique o termo de pesquisa.");
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
        return [];
    }

    return data.items.map(mapGoogleBookData);
    
  } catch (error) {
    console.error("Erro na busca por termo (Google Books):", error.message);
    throw error;
  }
}