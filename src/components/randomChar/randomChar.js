// import React, {Component} from 'react';
// import './randomChar.css';
// import GotService from '../../services/gotService';// импортируем класс который будет фетчить данные с сервера
// import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';//это сообщение об ошибке
// import PropTypes from 'prop-types';



// export default class RandomChar extends Component {
//     constructor(){
//         super();
//         // this.updateChar();//это написано для того чтобы как толко создается компонент вызвалась эта функция
//         // this.timerId = setInterval(this.updateChar, 1500);// герой будет обновляться каждые полторы секунды
//         //если оставить так то даже когда рандом чар скрыт то обновления будут идти дальше
//         //а если скрыть и показать компонент несколько раз то обновления будут идти быстрее и быстрее
//         //таймер не останавливается когда мы создаем новый компонент
//         // clearInterval(this.timerId);//надо запускать клеар интервал когда компонент изчезает
//         //это есть жизненный цикл компонента

//         console.log('constructor');//тут мы консолили каждый этап жизненного цикла компонента
//     }
//     //дальше по ходу все что написано это this только без конструктора
//     gotService = new GotService();//вызываем класс который будет фетчить данные с сервера
//     state = {//пишем в новом синтаксисе без конструктора 
//         //методы которые изменяют стейт вне конструктора записываются через стрелочную функцию чтобы не проебать контекст вызова
//         //сначала эти данные пустой объект - потом они прийдут с сервера
//         char:{},
//         loading: true//когда компонент только появляется он будет в состоянии загрузки
//     }
//     //Дефолт пропс можно еще задавать через слово статик
//     // static defaultProps= {
//     //     interval: 15000
//     // }


//     componentDidMount(){//Лайв сайкл хук.срабатывает сам без вызова функции
//         //в конструкторе лучше не работать с дом деревом - могут возникнуть ошибки
//         this.updateChar();//это написано для того чтобы как толко создается компонент вызвалась эта функция
//         this.timerId = setInterval(this.updateChar, this.props.interval);// герой будет обновляться каждые пятнадцать секунд

//     }

//     componentWillUnmount(){////срабатывает сам без вызова функции
//         clearInterval(this.timerId);//обрубаем интервал и завержаем жизненный цикл компонента
//     }


//     onCharLoaded = (char) => {//отдельная функция непонятно нахуя которая принимает в себя данные и помещает их в стейт
//         this.setState({
//             char,
//             loading: false,//как только компонет загрузился ставим состояние загрузки в фолс
//             error:false//состояние ошибки

//         })
//     }

//     onError = (err) => {//если происходит ошибка то вызывается эта функция
//         this.setState({
//             error:true,
//             loading:false
//         })
//     }

//     updateChar = () => {//тут он как стрелочная функция потому что в конструкторе он вызывается с контекстом вызова
//         const id = Math.floor(Math.random()*140 + 25);//рандомим от 25 до 140 персонажа
//         this.gotService.getCharacter(id)//эта конструкция вернет промис с персонажем по айдишнику
//             .then(this.onCharLoaded)//он сука опять нахуевертил и вместо того чтобы просто поменять стейт и записать туда объект вынес его в отдельную функцию 
//             .catch(this.onError);//эта функция будет вызвана в случае ошибки

//     }
    

//     render() {//когда стейт меняется рендер запускается заново


//         const {char, loading, error} = this.state;//деструктурировали состояния которые приходят из метода
//         const errorMessage = error ? <ErrorMessage/> : null;//проверяем статус ошибки и если тру то выдаем компонент с ошибкой если фолс то не делаем ничего
//         const spinner = loading? <Spinner/> : null;// загружаем спиннер если лоадинг тру
//         const content = !(loading || error) ? <View char={char}/> : null ;// если лоадинг или эррор фолсы то отрисует контент если что то из них тру то не произойдет ничего
        

//         //Эти строчки нужны бли когда верстка View была внутри рендера 
//         //но надо так чтобы спиннер был на белом диве а не вместо него
//         // if (loading){//если наш компонент еше загружается то мы вернем спиннер вместо верстки
//         //     return <Spinner/>//если функция видит ключевое слово return то она прекращает работу и дальше код уже не пойдет
//         // }

        
//         return (// внутри дива будет показываться или спиннер или View
//             //спиннер по центру сделать не получилось он ебанутый
//             //переменные внутри никогда не пересекутся
//             <div className="random-block rounded">
//                 {errorMessage} 
//                 {spinner}          
//                 {content}
//             </div>
//         );
//     }
// }


// // Дефолт пропс прописывается вне компонента
// RandomChar.defaultProps= {
//     interval: 15000
// }

// // Эта херня проверяет тип данных пропсов чтобы в интервал попало именно число
// // RandomChar.propTypes ={
// //     //props - список всех проперти которые приходят в компонент
// //     //propName - имя какого то определенного проперти
// //     // component name - имя компонента(RandomChar)
// //     interval:(props, propName, componentName) => {
// //         const value = props[propName];// получаем текущее значение интервала из всех пропсов
// //         if(typeof value === 'number' && !isNaN(value)) {// если наш велью точно число
// //             return null
// //         }
// //         //если проверка не прошла то мы увидим вот такое сообщение
// //         return new TypeError(`${componentName}: ${propName}`)
// //     }
// // }



// //теперь та же проверка но с библиотекой npm install prop-types
// RandomChar.propTypes ={
//     interval: PropTypes.number
// }



// // делаем так чтобы спиннер был на белом фоне в блоке
// //но есть менее мудреный способ в рендере через проверки состояний и ретерны
// const View = ({char}) => {//Этот компонент рендерит на страницу вот эту верстку а оборачивающий див остался выше
//     const {gender, name, died, culture, born} = char;
//     return (
//         <>
//             <h4>Random Character: {name}</h4>
//             <ul className="list-group list-group-flush">
//                 <li className="list-group-item d-flex justify-content-between">
//                     <span className="term">Gender </span>
//                     <span>{gender}</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between">
//                     <span className="term">Born </span>
//                     <span>{born}</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between">
//                     <span className="term">Died </span>
//                     <span>{died}</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between">
//                     <span className="term">Culture </span>
//                     <span>{culture}</span>
//                 </li>
//             </ul>
        
//         </>
//     )
// }






//Урок 104 ДЗ Хуки реакта


import React, {useState,useEffect} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';

import Spinner from '../spinner';


function RandomChar () {
   
    const gotService = new GotService();

    const [char, updateCharState] = useState({});
    const [loading, updateLoading] = useState(true);
  

    useEffect(() =>{
        let timerId = setInterval(updateChar, 15000);
        updateChar()
         return () => {//когда мы возвращаем функцию из юз эффект это типо как componentWillUnmount
        clearInterval(timerId);
    }
        
    },[])

    function updateChar() {
        const id = Math.floor(Math.random()*140 + 25);
        gotService.getCharacter(id)
            .then(onCharLoaded)

    }

  function onCharLoaded(char) {
        updateCharState(char);
        updateLoading(false);
    }


    const spinner = loading? <Spinner/> : null;
    const content = !loading ? <View char={char}/> : null ;
    
    
        return (
            <div className="random-block rounded">
                {spinner}          
                {content}
            </div>
        );
    
}

const View = ({char}) => {
    const {gender, name, died, culture, born} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        
        </>
    )
}


export default RandomChar;