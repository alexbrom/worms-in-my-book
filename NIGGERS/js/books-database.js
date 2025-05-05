// База данных книг
const booksDatabase = {
    // Метод для получения всех книг
    getAllBooks: function() {
        return this.books;
    },

    // Метод для получения книги по ID
    getBookById: function(id) {
        return this.books.find(book => book.id === id);
    },

    // Метод для поиска книг
    searchBooks: function(query) {
        query = query.toLowerCase().trim();
        return this.books.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query)
        );
    },

    // Массив книг
    books: [
        { 
            id: 1, 
            title: "Мастер и Маргарита", 
            author: "Михаил Булгаков", 
            year: 1966,
            genre: "Роман",
            pages: 384,
            isbn: "978-5-699-12014-7",
            description: "Роман о добре и зле, о любви и предательстве, о вере и безверии. Действие происходит в Москве 1930-х годов и в древнем Иерусалиме.",
            fileUrl: "books/master-i-margarita.pdf",
            coverUrl: "covers/master-i-margarita.jpg"
        },
        { 
            id: 2, 
            title: "Преступление и наказание", 
            author: "Фёдор Достоевский", 
            year: 1866,
            genre: "Роман",
            pages: 608,
            isbn: "978-5-17-090538-2",
            description: "Психологический роман о студенте Родионе Раскольникове, который решается на убийство старухи-процентщицы.",
            fileUrl: "books/prestuplenie-i-nakazanie.pdf",
            coverUrl: "covers/prestuplenie-i-nakazanie.jpg"
        },
        { 
            id: 3, 
            title: "Гроза", 
            author: "Александр Островский", 
            year: 1859,
            genre: "Драма",
            pages: 96,
            isbn: "978-5-17-090538-3",
            description: "Драма о жизни купеческой семьи в провинциальном городе, о конфликте между старым и новым укладом жизни.",
            fileUrl: "https://www.100bestbooks.ru/files/Ostrovski_Groza.pdf"
            coverUrl: "cover/groza.jpg"
        },
        { 
            id: 4, 
            title: "Тихий Дон", 
            author: "Михаил Шолохов", 
            year: 1928,
            genre: "Роман-эпопея",
            pages: 1504,
            isbn: "978-5-17-090538-4",
            description: "Эпопея о жизни донского казачества в период Первой мировой войны, революции и Гражданской войны.",
            fileUrl: "books/tihiy-don.pdf",
            coverUrl: "covers/tihiy-don.jpg"
        },
        { 
            id: 5, 
            title: "Иуда Искариот", 
            author: "Леонид Андреев", 
            year: 1907,
            genre: "Повесть",
            pages: 64,
            isbn: "978-5-17-090538-5",
            description: "Психологическая повесть, переосмысливающая образ Иуды Искариота и его роль в предательстве Иисуса Христа.",
            fileUrl: "books/iuda-iskariot.pdf",
            coverUrl: "covers/iuda-iskariot.jpg"
        },
        { 
            id: 6, 
            title: "Война и мир", 
            author: "Лев Толстой", 
            year: 1869,
            genre: "Роман-эпопея",
            pages: 1300,
            isbn: "978-5-17-090538-6",
            description: "Монументальный роман-эпопея, охватывающий период войн с Наполеоном 1805-1812 годов.",
            fileUrl: "books/voina-i-mir.pdf",
            coverUrl: "covers/voina-i-mir.jpg"
        },
        { 
            id: 7, 
            title: "Как закалялась сталь", 
            author: "Николай Островский", 
            year: 1934,
            genre: "Роман",
            pages: 384,
            isbn: "978-5-17-090538-7",
            description: "Автобиографический роман о становлении личности в условиях революции и Гражданской войны.",
            fileUrl: "books/kak-zakalyalas-stal.pdf",
            coverUrl: "photos/akalyalas-stal.jpg"
        },
        { 
            id: 8, 
            title: "Старик и море", 
            author: "Эрнест Хемингуэй", 
            year: 1952,
            genre: "Повесть",
            pages: 128,
            isbn: "978-5-17-090538-8",
            description: "Повесть о старом рыбаке Сантьяго и его борьбе с гигантской рыбой в открытом море.",
            fileUrl: "books/starik-i-more.pdf",
            coverUrl: "covers/starik-i-more.jpg"
        },
        { 
            id: 9, 
            title: "Один день Ивана Денисовича", 
            author: "Александр Солженицын", 
            year: 1962,
            genre: "Повесть",
            pages: 144,
            isbn: "978-5-17-090538-9",
            description: "Повесть о жизни заключённого в сталинском лагере, основанная на личном опыте автора.",
            fileUrl: "books/odin-den-ivana-denisovicha.pdf",
            coverUrl: "covers/odin-den-ivana-denisovicha.jpg"
        },
        { 
            id: 10, 
            title: "На дне", 
            author: "Максим Горький", 
            year: 1902,
            genre: "Пьеса",
            pages: 96,
            isbn: "978-5-17-090539-0",
            description: "Драма о жизни обитателей ночлежки, их мечтах и разочарованиях.",
            fileUrl: "books/na-dne.pdf",
            coverUrl: "covers/na-dne.jpg"
        },
        { 
            id: 11,
            title: "Котлован",
            author: "Андрей Платонов", 
            year: 1930,
            genre: "Роман",
            pages: 192,
            isbn: "978-5-17-090539-1",
            description: "Философский роман о строительстве социализма, о противоречиях между идеалами и реальностью.",
            fileUrl: "books/kotlovan.pdf",
            coverUrl: "covers/kotlovan.jpg"
        },
        { 
            id: 12,
            title: "Прощание с Матерой",
            author: "Валентин Распутин", 
            year: 1976,
            genre: "Повесть",
            pages: 256,
            isbn: "978-5-17-090539-2",
            description: "Повесть о жителях острова Матера, которые должны покинуть свои дома из-за строительства ГЭС.",
            fileUrl: "books/proshanie-s-materoy.pdf",
            coverUrl: "covers/proshanie-s-materoy.jpg"
        },
        { 
            id: 13,
            title: "451 градус по Фаренгейту",
            author: "Рэй Брэдбери", 
            year: 1953,
            genre: "Роман",
            pages: 256,
            isbn: "978-5-17-090539-3",
            description: "Антиутопический роман о будущем, где книги запрещены и сжигаются пожарными.",
            fileUrl: "books/451-fahrenheit.pdf",
            coverUrl: "covers/451-fahrenheit.jpg"
        },
        { 
            id: 14,
            title: "Вишневый сад",
            author: "Антон Чехов", 
            year: 1903,
            genre: "Пьеса",
            pages: 96,
            isbn: "978-5-17-090539-4",
            description: "Пьеса о судьбе дворянской усадьбы и её обитателей на рубеже эпох.",
            fileUrl: "books/vishnevy-sad.pdf",
            coverUrl: "covers/vishnevy-sad.jpg"
        },
        { 
            id: 15,
            title: "Кому на Руси жить хорошо",
            author: "Николай Некрасов", 
            year: 1874,
            genre: "Поэма",
            pages: 320,
            isbn: "978-5-17-090539-5",
            description: "Поэма о поисках счастья в России после отмены крепостного права.",
            fileUrl: "books/komu-na-rusi-zhit-horosho.pdf",
            coverUrl: "covers/komu-na-rusi-zhit-horosho.jpg"
        },
        { 
            id: 16,
            title: "Иркутская история",
            author: "Алексей Арбузов", 
            year: 1959,
            genre: "Пьеса",
            pages: 128,
            isbn: "978-5-17-090539-6",
            description: "Драма о любви и предательстве, о выборе между личным счастьем и долгом.",
            fileUrl: "books/irkutskaya-istoriya.pdf",
            coverUrl: "covers/irkutskaya-istoriya.jpg"
        },
        { 
            id: 17,
            title: "Отцы и дети",
            author: "Иван Тургенев", 
            year: 1862,
            genre: "Роман",
            pages: 320,
            isbn: "978-5-17-090539-7",
            description: "Роман о конфликте поколений, о нигилизме и традиционных ценностях.",
            fileUrl: "books/otcy-i-deti.pdf",
            coverUrl: "covers/otcy-i-deti.jpg"
        }
    ]
}; 