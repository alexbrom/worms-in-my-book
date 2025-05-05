/**
 * Полная реализация страницы книги с:
 * - Загрузкой данных книги
 * - Скачиванием
 * - Чтением онлайн
 * - Отображением похожих книг
 * - Системой отзывов
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Получаем ID книги из URL
    const bookId = getBookIdFromUrl();
    if (!bookId) return redirectToCatalog();
  
    try {
      // Загружаем данные книги
      const book = await fetchBookData(bookId);
      if (!book) return redirectToCatalog();
  
      // Отображаем данные книги
      renderBookDetails(book);
  
      // Инициализируем функционал
      initDownloadButton(book);
      initReadButton(book);
      initFavoriteButton(book);
      loadSimilarBooks(book);
      loadReviews(bookId);
      setupReviewForm(bookId);
  
    } catch (error) {
      console.error('Ошибка загрузки страницы книги:', error);
      showError('Не удалось загрузить информацию о книге');
    }
  });
  
  // ======================
  // Основные функции
  // ======================
  
  /**
   * Получает ID книги из URL
   */
  function getBookIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }
  
  /**
   * Перенаправляет в каталог
   */
  function redirectToCatalog() {
    window.location.href = 'catalog.html';
  }
  
  /**
   * Загружает данные книги с сервера
   */
  async function fetchBookData(bookId) {
    const response = await fetch(`/api/books/${bookId}`);
    
    if (!response.ok) {
      throw new Error('Книга не найдена');
    }
  
    return await response.json();
  }
  
  /**
   * Отображает данные книги на странице
   */
  function renderBookDetails(book) {
    // Основная информация
    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('bookAuthor').textContent = book.author;
    document.getElementById('bookDescription').textContent = book.description || 'Описание отсутствует';
    
    // Мета-данные
    document.getElementById('bookYear').textContent = book.year || '—';
    document.getElementById('bookPages').textContent = book.pages ? `${book.pages} стр.` : '—';
    document.getElementById('bookGenre').textContent = book.genre || '—';
    document.getElementById('bookFormat').textContent = book.format || '—';
    document.getElementById('bookIsbn').textContent = book.isbn || '—';
    document.getElementById('bookPublisher').textContent = book.publisher || '—';
    document.getElementById('bookLanguage').textContent = book.language || '—';
    
    // Обложка
    const coverElement = document.getElementById('bookCover');
    if (book.coverUrl) {
      coverElement.innerHTML = `<img src="${book.coverUrl}" alt="${book.title}">`;
    } else {
      coverElement.textContent = book.title.split(' ').map(w => w[0]).join('');
      coverElement.style.backgroundColor = getRandomColor();
    }
    
    // Статистика
    if (book.downloads) {
      document.getElementById('downloadCount').textContent = `${book.downloads} скачиваний`;
    }
  }
  
  // ======================
  // Функционал кнопок
  // ======================
  
  /**
   * Инициализирует кнопку скачивания
   */
  function initDownloadButton(book) {
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!book.fileUrl) {
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Недоступно для скачивания';
      return;
    }
  
    downloadBtn.addEventListener('click', async () => {
      try {
        // Логируем скачивание
        await fetch(`/api/books/${book._id}/download`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        // Скачиваем файл
        const link = document.createElement('a');
        link.href = book.fileUrl;
        link.download = `${book.title.replace(/[^a-zа-яё0-9]/gi, '_')}.${book.format.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Обновляем счетчик
        const countElement = document.getElementById('downloadCount');
        if (countElement) {
          const current = parseInt(countElement.textContent) || 0;
          countElement.textContent = `${current + 1} скачиваний`;
        }
  
      } catch (error) {
        console.error('Ошибка скачивания:', error);
        alert('Не удалось скачать книгу');
      }
    });
  }
  
  /**
   * Инициализирует кнопку чтения
   */
  function initReadButton(book) {
    const readBtn = document.getElementById('readBtn');
    
    if (!book.readUrl) {
      readBtn.disabled = true;
      readBtn.textContent = 'Чтение онлайн недоступно';
      return;
    }
  
    readBtn.addEventListener('click', () => {
      window.location.href = `/read.html?id=${book._id}`;
    });
  }
  
  /**
   * Инициализирует кнопку "В избранное"
   */
  function initFavoriteButton(book) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (!favoriteBtn) return;
  
    // Проверяем, есть ли книга в избранном
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.includes(book._id);
    updateFavoriteButton(favoriteBtn, isFavorite);
  
    favoriteBtn.addEventListener('click', async () => {
      try {
        const newFavorites = toggleFavorite(book._id, favorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        
        // Обновляем кнопку
        updateFavoriteButton(favoriteBtn, !isFavorite);
        
        // Синхронизируем с сервером (если пользователь авторизован)
        if (localStorage.getItem('token')) {
          await syncFavoritesWithServer(newFavorites);
        }
        
      } catch (error) {
        console.error('Ошибка обновления избранного:', error);
      }
    });
  }
  
  function toggleFavorite(bookId, favorites) {
    return favorites.includes(bookId)
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];
  }
  
  function updateFavoriteButton(button, isFavorite) {
    button.innerHTML = isFavorite
      ? '❤️ В избранном'
      : '♡ Добавить в избранное';
    button.style.color = isFavorite ? '#e74c3c' : '#333';
  }
  
  async function syncFavoritesWithServer(favorites) {
    await fetch('/api/user/favorites', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ favorites })
    });
  }
  
  // ======================
  // Похожие книги
  // ======================
  
  /**
   * Загружает и отображает похожие книги
   */
  async function loadSimilarBooks(book) {
    const similarContainer = document.getElementById('similarBooks');
    if (!similarContainer) return;
  
    try {
      const response = await fetch(`/api/books?genre=${book.genre}&limit=4`);
      const similarBooks = await response.json();
  
      if (similarBooks.length > 0) {
        similarContainer.innerHTML = similarBooks.map(book => `
          <div class="similar-book">
            <a href="book.html?id=${book._id}">
              <div class="similar-cover" style="background-color: ${getRandomColor()}">
                ${book.coverUrl 
                  ? `<img src="${book.coverUrl}" alt="${book.title}">` 
                  : book.title[0]}
              </div>
              <h4>${book.title}</h4>
              <p>${book.author}</p>
            </a>
          </div>
        `).join('');
      } else {
        similarContainer.innerHTML = '<p>Нет похожих книг</p>';
      }
    } catch (error) {
      console.error('Ошибка загрузки похожих книг:', error);
      similarContainer.innerHTML = '<p>Не удалось загрузить похожие книги</p>';
    }
  }
  
  // ======================
  // Система отзывов
  // ======================
  
  /**
   * Загружает отзывы о книге
   */
  async function loadReviews(bookId) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;
  
    try {
      const response = await fetch(`/api/books/${bookId}/reviews`);
      const reviews = await response.json();
  
      if (reviews.length > 0) {
        reviewsContainer.innerHTML = reviews.map(review => `
          <div class="review">
            <div class="review-header">
              <span class="review-author">${review.userName}</span>
              <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
              <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div class="review-text">${review.text}</div>
          </div>
        `).join('');
      } else {
        reviewsContainer.innerHTML = '<p>Пока нет отзывов. Будьте первым!</p>';
      }
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error);
      reviewsContainer.innerHTML = '<p>Не удалось загрузить отзывы</p>';
    }
  }
  
  /**
   * Настраивает форму отправки отзыва
   */
  function setupReviewForm(bookId) {
    const form = document.getElementById('reviewForm');
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const rating = form.querySelector('input[name="rating"]:checked')?.value;
      const text = form.querySelector('textarea').value.trim();
  
      if (!rating || !text) {
        alert('Пожалуйста, поставьте оценку и напишите отзыв');
        return;
      }
  
      try {
        const response = await fetch(`/api/books/${bookId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ rating, text })
        });
  
        if (!response.ok) {
          throw new Error('Ошибка при отправке отзыва');
        }
  
        // Обновляем список отзывов
        await loadReviews(bookId);
        form.reset();
        alert('Спасибо за ваш отзыв!');
  
      } catch (error) {
        console.error('Ошибка:', error);
        alert(error.message || 'Не удалось отправить отзыв');
      }
    });
  }
  
  // ======================
  // Вспомогательные функции
  // ======================
  
  function getRandomColor() {
    const colors = ['#f8d5cc', '#e7f3fe', '#e0f7fa', '#e8f5e9'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    document.body.prepend(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
  }