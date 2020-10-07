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









// Урок 100 Паттерны
// мы не хотим каждый раз копипастить айтем лист для создания каждого нового списка
// поээтому делаем его универсальным
// чтобы он зависел от переданных в него пропсов при вызове на страницах уровнем выше
// import React, {Component} from 'react';
// import './itemList.css';
// import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';
// //удалили гет сервис
// import PropTypes from 'prop-types';// проверяет тип приходящих пропсов



// export default class ItemList extends Component {


//     state = {
//         itemList: null,
//         error: false
//     }
//     componentDidMount() {
//         const {getData} = this.props;// из пропсов получаем функцию гет дата которая вызывается с уровня выше characterPage.js
//          //вызываем полученный пропс
//         getData()//поменяли на гет дата чтобы компонент был более независимым
//             .then((itemList) => {//поменяли каждый чар лист на айтем лист везде
//                 this.setState({
//                     itemList,
//                     error: false
//                 });
//             })
//             .catch(() => {this.onError()});
//     }

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
//     renderItems(arr) {
//         return arr.map((item) => {
//             const {id} = item;
//             const label = this.props.renderItem(item);//вызываем полученную из пропсов функцию
//             //теперь сверху мы контролируем что именно нам надо вывести на страницу
//             return (
//                 <li
//                     key={id}
//                     className="list-group-item"
//                     onClick={() => this.props.onItemSelected(id)}
//                     >
//                     {label}
//                 </li>
//             )
//         })
//     }


//     render() {
//         const {itemList, error} = this.state;

//         if(error){
//             return <ErrorMessage/>
//         }

//         if(!itemList) {
//             return <Spinner/>
//         }

        
//         const items = this.renderItems(itemList);

//         return (
//             <ul className="item-list list-group">
//                 {items}
//             </ul>
//         );
//     }
// }

// //Default props
// //теперь даже если пропс не передан то он он будет браться отсюда
// ItemList.defaultProps = {
//     onItemSelected: () =>{}
//     }

// ItemList.propTypes ={
//     onItemSelected:PropTypes.func,// проверяем функция ли приходящий пропс
//     // getData:PropTypes.arrayOf(PropTypes.object)//для примера проверяем на массив оъектов
// }

// //как проверять смотри в документации на их сайте
//Эти проверки можно записывать в компоненте через слово статик




//Урок 103 Компроненты высшего порядка
// Допустим нам надо будет создать похожий компонент
//В уроке мы отделимвсю сетевую логику от компонента и в ItemList будем передавать data вместе с пропсами для рендера
//отдельная функция with data будет получать аргументами то с чем она будет работать

import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';
import gotService from '../../services/gotService';

//айтем лист теперь импротируется снизу с оборачивающей функцией
 class ItemList extends Component {


    //вырезали componentDidMount и стейт отсюда теперь они в безымянном компоненте внизу

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
            const label = this.props.renderItem(item);
            
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
      
        //вырезали то что работает со стейтом в безымянный компонент
        
        const {data} = this.props;
        const items = this.renderItems(data);// теперь айтем лист для рендера будет передаваться из пропсов а не из стейта

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}


ItemList.defaultProps = {
    onItemSelected: () =>{}
    }

ItemList.propTypes ={
    onItemSelected:PropTypes.func,
  
}

// const f = (a) => {
//     console.log(a);
//     return (b) => {
//         console.log(a + b)
//     }
// }

// f(1)(2);// двойной вызов функции внутри функции

//функция может возвращать класс или компонент
// const f = () => {
//     return ItemList;//если эту функцию экспортировать вместо айтем листа ничего не сломается
// }

//Таким образом мы отделим логику от рендерящей части
//компонент будет работать точно так же
const withData = (View, getData) => {
    return class extends Component{//возвращаем безымянный класс
        //все itemList в этом компоненте меняются на data
        state = {
            data: null,
            error: false
        }
        componentDidMount() {
            console.log(this.props);//у этого компонента все так же есть пропсы которые передааются с других компонентов            
            getData()
                .then((data) => {
                    this.setState({
                        data,
                        error: false
                    });
                })
                .catch(() => {this.onError()});
        }
       
        render(){//айтем лист примет все пропсы функции f
            const {data, error} = this.state;

            if(error){
                return <ErrorMessage/>
            }
    
            if(!data) {
                return <Spinner/>
            }
            //Теперь передаем не ItemList а компонент который будет приходить из аргумента
            return <View {...this.props} data ={data}/>
        }
    }
}


const{getAllCharacters} = new gotService();
export default withData(ItemList, getAllCharacters);//передаем компонент айтем лист который будет подставляться в функцию аргументом и в гет дату тоже передаем функцию

//теперь можно эту штуку вынести в отдельный компонент и использовать во всем приложении
// нухуя не понял но очень интересно








//Урок 104 Рефакторим itemList с использование мхуков исходник оставлю в начале

//Как было:

// import React, {Component} from 'react';
// import './itemList.css';
// import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';
// import PropTypes from 'prop-types';



// export default class ItemList extends Component {


//     state = {
//         itemList: null,
//         error: false
//     }
//     componentDidMount() {
//         const {getData} = this.props;
        
//         getData()
//             .then((itemList) => {
//                 this.setState({
//                     itemList,
//                     error: false
//                 });
//             })
//             .catch(() => {this.onError()});
//     }

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
//     renderItems(arr) {
//         return arr.map((item) => {
//             const {id} = item;
//             const label = this.props.renderItem(item);
           
//             return (
//                 <li
//                     key={id}
//                     className="list-group-item"
//                     onClick={() => this.props.onItemSelected(id)}
//                     >
//                     {label}
//                 </li>
//             )
//         })
//     }


//     render() {
//         const {itemList, error} = this.state;

//         if(error){
//             return <ErrorMessage/>
//         }

//         if(!itemList) {
//             return <Spinner/>
//         }

        
//         const items = this.renderItems(itemList);

//         return (
//             <ul className="item-list list-group">
//                 {items}
//             </ul>
//         );
//     }
// }




//Как стало:

import React, {useState,useEffect} from 'react';//импортировали хуки
import './itemList.css';
import Spinner from '../spinner';




function ItemList({getData,onItemSelected,renderItem})  {//сделали функцией.// переносим все пропсы сюда

    const [itemList, updateList] = useState([]);// перепиcываем стейты под хуки только не null а пустой массив

    useEffect(() =>{//заменит componentDidMount
        getData()
        .then((data) => {//data- то что прищло с сервера
            updateList(data)// вместо this.setState
        })
        //убрал кетч на ошибку
    }, [])// хук юз эффект в качестве второго аргумента принимает ту часть которую надо проверять на предыдущий стейт и если он не изменился то ничего не делать как в componentDidUpdate чтобы избежать бесконечного цикла.Тамдолжно быть примитивное значение
    //если значение не булевое строка или число то эта хрень не сработает(второй аргумент юз эффекта)
    //если передать пустой массив то он будет говорить хуку что эффект надо выполнить только при появлении объекта или его исчезновении

 //componentDidCatch тут тоже просто не используем
  
   function renderItems(arr) {// подписали function и внутри убрали this.props.Все остальное так же
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);//без this.props
           
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}////без this.props
                    >
                    {label}
                </li>
            )
        })
    }


    //убираем рендер

    //переменную item list вытаскивать из стейтов не нужнно - он уже переменная

    if(!itemList) {//это нас устраивает
        return <Spinner/>
    }

    
    const items = renderItems(itemList);//this не нужен

    return (//верстка такая же
        <ul className="item-list list-group">
            {items}
        </ul>
    );
    
}

export default ItemList;