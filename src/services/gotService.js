// export default class GotService {
//     constructor() {
//         this._apiBase = 'https://www.anapioficeandfire.com/api';//базовые данные для адреса
//     }
//     // операция асинхронная. Применяем async и await
//     async getResource(url) {//получить данные по url
//         const res = await fetch(`${this._apiBase}${url}`);//url состоит из 2 частей - основы и заданной части
    
//         if (!res.ok) {//если все не ок то выкидываем ошибку
//           throw new Error(`Could not fetch ${url}` +// собираем ее из адреса и статуса
//             `, received ${res.status}`);
//         }
//         return await res.json();//возвращаем разджейсоненый файл
//     }

//     async getAllBooks() {//получаем все книги 
//         const res = await this.getResource(`/books/`);//записываем в переменную
//         return res.map(this._transformBook);//трансормируем каждый объект из полученного массива в нужный вид
//     }
    
//     async getBook(id) {//тут конкретную книгу мы получаем по ее айдишнику 
//         const book = await this.getResource(`/books/${id}/`);
//         return this._transformBook(book);//переделываем под нужный формат
//     }
    
//     async getAllCharacters() {//всех героев получаем и трансформируем каждого
//         const res = await this.getResource(`/characters?page=5&pageSize=10`);//адресс это какая то фишка из апи(сайт на который запросы делаем)
//         return res.map(this._transformCharacter);
//     }
    
//     async getCharacter(id) {//тоже получаем по айдишнику и трансформируем
//         const character = await this.getResource(`/characters/${id}`);
//         return this._transformCharacter(character);
//     }
    
//     async getAllHouses() {//так же
//         const res = await this.getResource(`/houses/`);
//         return res.map(this._transformHouse);
//     }
    
//     async getHouse(id) {//так же
//         const house = this.getResource(`/houses/${id}/`);
//         return this._transformHouse(house);
//     }

//     isSet(data) {//если нихрена нет данных то говорим что их нет
//         if (data) {
//             return data
//         } else {
//             return 'no data :('
//         }
//     }    
    
//     _extractId = (item) => {// извлекаем айди из айтема// item - большой объект который приъодит с сервера 
//         const idRegExp = /\/([0-9]*)$/;//регулярное выражение записали в переменную
//         //$Соответствует концу ввода
//         //*Соответствует предыдущему символу повторенному 0 или более раз
//         //[0-9]-Набор символов. Соответствует любому символу из перечисленных. Можно указать диапазон символов, используя тире
//         // \ экранирует дробы
//         //Соответствует 'x' и запоминает это соответствие. Это называется захватывающие скобки.

//         //  ВЫВОД - ОНИ ИЩЕТ ЧИСЛО ПОСЛЕ ДРОБИ И ЭКВИВАЛЕНТЫНЕ ЧИСЛАЕМУ ПОСЛЕ ПЕРВОГО НАЙДЕННОГО ЧИСЛА. эТО ВСЕ ДОЛЖНО БЫТЬ  В КОНЦЕ СТРОКИ
//         //НАДО ПРОХОДИТЬ ОТДЕЛЬНЫЙ КУРС ПО РЕГУЛЯРНЫМ ВЫРАЖЕНИЯМ ЧТОБЫ ЭТО ПОНИМАТЬ И ИСПОЛЬЗОВАТЬ

//         // console.log(item);//это большой объект который потом форматируется
//         // console.log(item.url);//>>>https://www.anapioficeandfire.com/api/characters/71
//         // //Матч дает не только результат поиска но и дополнительную инфу по поиску в виде массива
//         // console.log(item.url.match(idRegExp));//>>> без флага глобальности получаем это>>>["/71", "71", index: 48, input: "https://www.anapioficeandfire.com/api/characters/71", groups: undefined]
//         // //если был бы флаг глобальности то получили бы массив со всеми найденными результатами
//         // console.log(item.url.match(idRegExp)[1]);// ну а это как раз айдишник - второй элемент массива
//         return item.url.match(idRegExp)[1];//match это метод который используется на регулярных выражениях.
        
//     }

//     _transformCharacter = (char) => {
//         return {
//             id: this._extractId(char),//передаем героя из сервера
//             name: this.isSet(char.name),
//             gender: this.isSet(char.gender),
//             born: this.isSet(char.born),
//             died: this.isSet(char.died), 
//             culture: this.isSet(char.culture)
//         };
//     }

//     _transformHouse = (house) => {
//         return {
//             id: this._extractId(house),
//             name: this.isSet(house.name),
//             region: this.isSet(house.region),
//             words: this.isSet(house.words),
//             titles: this.isSet(house.titles),
//             ancestralWeapons: this.isSet(house.ancestralWeapons)
//         };
//     }
    
//     _transformBook = (book) => {
//         return {
//             id: this._extractId(book),
//             name: this.isSet(book.name),
//             numberOfPages: this.isSet(book.numberOfPages),
//             publisher: this.isSet(book.publisher),
//             released: this.isSet(book.released)
//         };
//     }
// }






//Урок 100 Паттерны
//переделали все функции в стрелки чтобы не проебать контекст вызова


export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }
    
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        };
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles.join('//')),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        };
    }
    
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        };
    }
}