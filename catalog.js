// Функция для отображения книг на странице
function displayBooks(booksToShow) {
    const booksContainer = document.querySelector('.books-grid');
    booksContainer.innerHTML = '';
    
    // Создаем карточки для каждой книги
    booksToShow.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Автор:</strong> ${book.author}</p>
            <p><strong>Год:</strong> ${book.year}</p>
            <p><strong>Жанр:</strong> ${book.genre}</p>
            <p><strong>Страниц:</strong> ${book.pages}</p>
            <p><strong>Язык:</strong> ${book.language}</p>
            <p>${book.description}</p>
            <div class="book-actions">
                <a href="${book.link}" class="btn">Читать</a>
                <a href="${book.downloadLink}" class="btn">Скачать</a>
            </div>
        `;
        booksContainer.appendChild(bookCard);
    });
}

// Функция для пагинации
function updatePagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    // Добавляем кнопку "Предыдущая"
    const prevButton = document.createElement('button');
    prevButton.textContent = '←';
    prevButton.className = 'pagination-btn';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayBooksForPage(currentPage);
        }
    };
    paginationContainer.appendChild(prevButton);
    
    // Добавляем номера страниц
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageButton.onclick = () => displayBooksForPage(i);
        paginationContainer.appendChild(pageButton);
    }
    
    // Добавляем кнопку "Следующая"
    const nextButton = document.createElement('button');
    nextButton.textContent = '→';
    nextButton.className = 'pagination-btn';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayBooksForPage(currentPage);
        }
    };
    paginationContainer.appendChild(nextButton);
}

// Функция для отображения книг на конкретной странице
function displayBooksForPage(page) {
    const booksPerPage = 6;
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);
    
    displayBooks(booksToShow);
    updatePagination(page, Math.ceil(filteredBooks.length / booksPerPage));
}

// Инициализация при загрузке страницы
let filteredBooks = [...books]; // Копируем массив книг
document.addEventListener('DOMContentLoaded', () => {
    displayBooksForPage(1); // Отображаем первую страницу
});

// ... existing code ... 