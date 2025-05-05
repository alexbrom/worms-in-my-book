// База данных новостей
const newsDatabase = {
    // Метод для получения всех новостей
    getAllNews: function() {
        return this.news;
    },

    // Метод для получения новости по ID
    getNewsById: function(id) {
        return this.news.find(news => news.id === id);
    },

    // Массив новостей
    news: [
        {
            id: 1,
            title: "ПРИВЕТ МИР!",
            date: "2025-05-01",
            excerpt: "Мы создали эту страницу именно в этот день.",
            image: "https://data.chpic.su/stickers/s/sssasssi212/sssasssi212_015.webp?v=1699905302",
            fullText: "Иди читай книги, а не ерунду"
          },
          {
            id: 2,
            title: "Ксюша опять не обновила коммит...",
            date: "2025-05-01",
            excerpt: "К сожалению, разработка пока что останавливается, Ксюша спит...",
            image: "https://avatars.mds.yandex.net/i?id=3e3088aefa5bdd77e5046c971dd8a3ed_l-13283527-images-thumbs&n=13",
            fullText: "Ксюш, проснись пожалуйста((("
          },
          {
            id: 3,
            title: "ПОИСКОВАЯ СИСТЕМА РАБОТАЕТ!",
            date: "2025-05-02",
            excerpt: "Спустя долгое время смог реализовать поисковую систему без проблем.",
            image: "https://i.ytimg.com/vi/oIKeKzLTZKs/maxresdefault.jpg",
            fullText: "Я смог все таки реализовать через мучения поисковую систему. Я очень рад!"
          },
          {
            id: 4,
            title: "Я добавил эту новость чисто, чтобы вы улыбнулись",
            date: "2023-05-08",
            excerpt: "Просто знаете, я осознаю, что проект никому не понравится и весь труд просто уйдет в пустоту. Всем удачи.",
            image: "https://i.ytimg.com/vi/pP10W0RuD00/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&rs=AOn4CLBfxvpPnPyC0oWO75TF28kpVbjEsw",
            fullText: "Просто знаете, я осознаю, что проект никому не понравится и весь труд просто уйдет в пустоту. Я не доволен своим проектом("
          },
    ]
}; 