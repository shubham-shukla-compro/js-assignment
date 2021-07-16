let sorted = 0;

// Load all books
const loadAllBooks = (booksData) => {
  let output = '';

  if (sorted === 1) {
    booksData.sort((a, b) => a.price - b.price);
  } else if (sorted === 2) {
    booksData.sort((a, b) => b.price - a.price);
  }

  booksData.map((book) => {
    output += `<tr>
                  <td>${book.id}</td>
                  <td>${book.genre}</td>
                  <td>${book.price * 10}</td>
               </tr>`;
    return output;
  });

  document.getElementById('all-books-field').innerHTML = output;
};

// Fetch all books data
const getBooksData = async () => {
  const res = await fetch('booksData.json');
  const data = await res.json();
  loadAllBooks(data);
};

// Show Similar Books
const showSimilarBooks = async (book) => {
  const res = await fetch('booksData.json');
  const data = await res.json();
  let output = '';
  data.map((similarBook) => {
    if (similarBook.genre === book.genre && similarBook.id !== book.id) {
      output += `<tr>
                    <td>${similarBook.id}</td>
                    <td>${similarBook.genre}</td>
                    <td>${similarBook.price * 10}</td>
                  </tr>`;
    }
    return output;
  });
  document.getElementById('similar-books-field').innerHTML = output;
};

// Show Examined Book
const showExaminedBook = (book) => {
  const bookId = document.getElementById('examined-book-id');
  const bookPrice = document.getElementById('examined-book-price');
  const bookGenre = document.getElementById('examined-book-genre');

  bookId.innerHTML = `<b>${book.id}</b>`;
  bookPrice.innerHTML = `<b>${book.price * 10}</b>`;
  bookGenre.innerHTML = `<b>${book.genre}</b>`;

  showSimilarBooks(book);
};

// Search Book By Id
const searchBookById = async (inputId) => {
  const res = await fetch('booksData.json');
  const data = await res.json();
  let examinedBook;
  data.map((book) => {
    if (book.id === Number(inputId)) {
      examinedBook = book;
    }
    return examinedBook;
  });

  if (!examinedBook) {
    alert("Oops can't find book with this id");
  } else {
    showExaminedBook(examinedBook);
  }
};

document.getElementById('btn-search-id').addEventListener('click', () => {
  searchBookById(document.getElementById('input-search-id').value);
});

// Search book By Genre
const searchBookByGenre = async (inputGenre) => {
  const res = await fetch('booksData.json');
  const data = await res.json();
  let examinedBook;
  data.some((book) => {
    if (book.genre.toLowerCase() === inputGenre.toLowerCase()) {
      examinedBook = book;
      return true;
    }
    return false;
  });

  if (!examinedBook) {
    alert("Oops can't find book with this genre");
  } else {
    showExaminedBook(examinedBook);
  }
};

document.getElementById('btn-search-genre').addEventListener('click', () => {
  searchBookByGenre(document.getElementById('input-search-genre').value);
});

// Search Book by Price
const searchBookByPrice = async (inputPrice) => {
  const res = await fetch('booksData.json');
  const data = await res.json();
  let examinedBook;
  data.some((book) => {
    if (book.price * 10 === Number(inputPrice)) {
      examinedBook = book;
      return true;
    }
    return false;
  });

  if (!examinedBook) {
    alert("Oops can't find book with this price");
  } else {
    showExaminedBook(examinedBook);
  }
};

document.getElementById('btn-search-price').addEventListener('click', () => {
  searchBookByPrice(document.getElementById('input-search-price').value);
});

// Sorting Price (Asc/Dsc)
const sortPriceEle = document.getElementById('sort-price-icon-all');

sortPriceEle.addEventListener('click', () => {
  if (sorted === 0 || sorted === 2) {
    sorted = 1;
    sortPriceEle.innerHTML = `
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-sort-up"
                              viewBox="0 0 16 16"
                            >
                            <path
                              d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
                            />
                            </svg>
                            `;
  } else if (sorted === 1) {
    sorted = 2;
    sortPriceEle.innerHTML = `
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                              <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                            </svg>
                              `;
  }
  getBooksData(sorted);
});

getBooksData();
