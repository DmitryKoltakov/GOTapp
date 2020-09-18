// import React, {Component} from 'react';
// import './itemList.css';
// import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';



// export default class ItemList extends Component {


//     state = {
//         itemList: null,
//         error: false
//     }
//     componentDidMount() {//как только компонент создается
//         const {getData} = this.props;//функция будет приходить с уровня выше из characterPage.js
         
        
//         getData()// эта функция прийдет с верхнего уровня
//             .then((itemList) => {
//                 this.setState({//помещаем его в состояние и говорим что без ошибок
//                     itemList,
//                     error: false
//                 });
//             })
//             .catch(() => {this.onError()});//в случае ошибки вызываем функцию
//     }

// //Границы ошибок
// //Если каждый компонент внутри себя содержит свой componentDidCatch()
// //То выключится только этот компонент а не вся страница
// //componentDidCatch() обрабатвает внутри методов жизненного цикла и методов рендер
// //не отлавливает ошибки в лично прописанных методах
// //не отлавливает ошибки в асинхронных операциях (Запросы к серверу итд)
//     componentDidCatch(){
//         this.setState({
//             itemList: null,
//             error: true
//         })
//     }
//     onError(status){
//         this.setState({
//             itemList: null,
//             error: true
//         })
//     }
//     renderItems(arr) {//принимаем аргументом наш чар лист
//         return arr.map((item) => {// через мэп для каждого элемента создаем вертску
//             const {id, name} = item;// теперь у нас есть настоящий айдишник из сервиса
//             return (// делаем верстку
//                 <li
//                     key={id}//когда создаются элементы в реакте через перебор массива то для каждого нужен уникальный ключ.Поидее он должен генерироватья
//                     className="list-group-item"
//                     onClick={() => this.props.onCharSelected(id)}//// сам обработчик прописан не тут а приходит с пропсами.через этот обработчик будет выбираться герой.Аргументом передается порядковый номер.Этот айдишник будет менять стейт в app.js
//                     //тут мы делаем так чтобы при клике в одном компоненте изменения происходили в другом
//                     >
//                     {name}
//                 </li>
//             )
//         })
//     }


//     render() {
//         const {itemList, error} = this.state;//достаем стейты

//         if(error){// если ошибка есть то показываем ее
//             return <ErrorMessage/>
//         }

//         if(!itemList) {//если чар лист еше налл то показываем спиннер
//             return <Spinner/>
//         }

//         //если проверки не активировались 
//         const items = this.renderItems(itemList);//записываем верстку в переменную и помещаем ее на страницу

//         return (
//             <ul className="item-list list-group">
//                 {items}
//             </ul>
//         );
//     }
// }









//Урок 100 Паттерны
// мы не хотим каждый раз копипастить айтем лист для создания каждого нового списка
//поээтому делаем его универсальным
//чтобы он зависел от переданных в него пропсов при вызове на страницах уровнем выше
import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
//удалили гет сервис


export default class ItemList extends Component {


    state = {
        itemList: null,
        error: false
    }
    componentDidMount() {
        const {getData} = this.props;// из пропсов получаем функцию гет дата которая вызывается с уровня выше characterPage.js
         //вызываем полученный пропс
        getData()//поменяли на гет дата чтобы компонент был более независимым
            .then((itemList) => {//поменяли каждый чар лист на айтем лист везде
                this.setState({
                    itemList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }
    onError(status){
        this.setState({
            itemList: null,
            error: true
        })
    }
    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);//вызываем полученную из пропсов функцию
            //теперь сверху мы контролируем что именно нам надо вывести на страницу
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }


    render() {
        const {itemList, error} = this.state;

        if(error){
            return <ErrorMessage/>
        }

        if(!itemList) {
            return <Spinner/>
        }

        
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}