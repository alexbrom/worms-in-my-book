// Конфигурация
const config = {
    newsPerPage: 4,
    apiUrl: '/api/news'
  };
  
  // Состояние
  let state = {
    currentPage: 1,
    totalNews: 0,
    newsData: []
  };
  
  // Элементы DOM
  const elements = {
    newsContainer: document.getElementById('newsContainer'),
    pagination: document.getElementById('pagination'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    errorContainer: document.getElementById('errorContainer')
  };
  
  // Инициализация
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      showLoading(true);
      await fetchNews();
      renderNews();
      renderPagination();
    } catch (error) {
      showError('Не удалось загрузить новости');
      console.error('Ошибка:', error);
    } finally {
      showLoading(false);
    }
  });
  
  // Загрузка новостей с сервера
  async function fetchNews() {
    const response = await fetch(`${config.apiUrl}?page=${state.currentPage}`);
    if (!response.ok) throw new Error('Ошибка сервера');
    
    const data = await response.json();
    state.newsData = data.news;
    state.totalNews = data.total;
  }
  
  // Отображение новостей
  function renderNews() {
    elements.newsContainer.innerHTML = state.newsData.map(news => `
      <div class="news-card">
        <div class="news-image">
          <img src="${news.image || 'placeholder.jpg'}" alt="${news.title}" loading="lazy">
        </div>
        <div class="news-content">
          <div class="news-date">${formatDate(news.date)}</div>
          <h3 class="news-title">${news.title}</h3>
          <p class="news-excerpt">${news.excerpt}</p>
          <a href="news-single.html?id=${news.id}" class="read-more">Читать далее →</a>
        </div>
      </div>
    `).join('');
  }
  
  // Пагинация
  function renderPagination() {
    const totalPages = Math.ceil(state.totalNews / config.newsPerPage);
    elements.pagination.innerHTML = '';
  
    if (totalPages <= 1) return;
  
    // Кнопка "Назад"
    if (state.currentPage > 1) {
      elements.pagination.innerHTML += `
        <button class="page-btn" onclick="changePage(${state.currentPage - 1})">
          ← Назад
        </button>
      `;
    }
  
    // Нумерация страниц
    for (let i = 1; i <= totalPages; i++) {
      elements.pagination.innerHTML += `
        <button class="page-btn ${i === state.currentPage ? 'active' : ''}" 
                onclick="changePage(${i})">
          ${i}
        </button>
      `;
    }
  
    // Кнопка "Вперед"
    if (state.currentPage < totalPages) {
      elements.pagination.innerHTML += `
        <button class="page-btn" onclick="changePage(${state.currentPage + 1})">
          Вперед →
        </button>
      `;
    }
  }
  
  // Смена страницы
  async function changePage(page) {
    try {
      showLoading(true);
      state.currentPage = page;
      await fetchNews();
      renderNews();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      showError('Ошибка загрузки страницы');
      console.error('Ошибка:', error);
    } finally {
      showLoading(false);
    }
  }
  
  // Вспомогательные функции
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  }
  
  function showLoading(show) {
    if (elements.loadingIndicator) {
      elements.loadingIndicator.style.display = show ? 'block' : 'none';
    }
  }
  
  function showError(message) {
    if (elements.errorContainer) {
      elements.errorContainer.innerHTML = `
        <div class="alert alert-error">
          ${message}
        </div>
      `;
    }
  }
  
  // Для вызова из HTML
  window.changePage = changePage;