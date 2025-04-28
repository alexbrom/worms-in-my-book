//Данные о книгах (можешь заменить на fetch к API)
const allBooks = [
  { id: 1, title: "Книга 1", author: "Автор 1" },
  { id: 2, title: "Книга 2", author: "Автор 2" },
  // ... всего 12+ книг для примера
  { id: 12, title: "Книга 12", author: "Автор 12" }
];

// Настройки пагинации
let currentPage = 1;
const booksPerPage = 6;

// Элементы DOM
const booksContainer = document.getElementById('books-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

// Функция отрисовки книг
function renderBooks() {
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const booksToShow = allBooks.slice(start, end);

  booksContainer.innerHTML = booksToShow.map(book => `
    <div class="book">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
    </div>
  `).join('');

  // Обновляем статус кнопок
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= allBooks.length;

  // Меняем текст страницы
  pageInfo.textContent = `Страница ${currentPage}`;
}

// Обработчики кнопок
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderBooks();
  }
});

nextBtn.addEventListener('click', () => {
  const maxPage = Math.ceil(allBooks.length / booksPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderBooks();
  }
});

// Первая загрузка
renderBooks();