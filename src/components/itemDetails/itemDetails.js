// import React, {Component} from 'react';
// import './charDetails.css';
// import GotService from '../../services/gotService';// импортируем класс который будет фетчить данные с сервера
// import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';//это сообщение об ошибке

// export default class CharDetails extends Component {
//     gotService = new GotService();//вызываем класс который будет фетчить данные с сервера

//     state =  {
//         char: null,
//         loading: true,
//         error: false
//     }


//     componentDidMount(){//компонент появляестся 
//         this.updateChar();
//     }

//     componentDidUpdate(prevProps, prevState){// этот хук срабатывает при обновлении стейта или пропса
//         if(this.props.charId !== prevProps.charId){//проверкка на совпадение с предыдущими пропсами
//             //такую проверку надо делать всегда. Иначе будет бесконечный цикл
//             this.updateChar();
//         }
//     }


//     onCharDetailLoaded = (char) => {
//         this.setState({
//             char,
//             loading: false,//как только компонет загрузился ставим состояние загрузки в фолс

//         })
//     }

//     onError = (err) => {//если происходит ошибка то вызывается эта функция
//         this.setState({
//             error:true,
//             loading:false
//         })

//     }

//     updateChar(){
//         //вытаскиваем чар айди из пропсов
//         const {charId} = this.props;//в пропсах при вызове этого компонента в app.js написано charId={this.state.selectedChar}
//         if(!charId){// если чар айди вообще не был передан то останавливаем функцию через ретерн
//             return;
//         }
//         // далее получаем героя по айдишнику и записываем его в стейт
//         this.gotService.getCharacter(charId)
//                 .then(this.onCharDetailLoaded)
//                 .catch(this.onError);
            
//         //намеренно делаем ошибку чтобы ее поймать через лайв сайкл хук
//         // this.foo.bar = 0;
//     }

//     render() {

//         if (!this.state.char && this.state.error) {//проверяем если героя нет и еррор тру то показываем еррор месседж
//             return <ErrorMessage/>
//         } else if (!this.state.char) {// если ошибки нет то проверяем есть ли герой если нет то выводим спан
//             return <span className="select-error">Please select a character</span>
//         }
//         //впротивном случае
//         const {name, gender, born, died, culture} = this.state.char;//вытаскиваем переменные

//         if (this.state.loading) {//проверяем загружаются ли данные 
//             return (//если да то показываем спиннер в диве 
//                 <div className="char-details rounded">
//                     <Spinner/>
//                 </div>
//             )
//         }

//         return (// если не загружается то показываем верстку
//             <div className="char-details rounded">
//                 <h4>{name}</h4>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Gender</span>
//                         <span>{gender}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Born</span>
//                         <span>{born}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Died</span>
//                         <span>{died}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Culture</span>
//                         <span>{culture}</span>
//                     </li>
//                 </ul>
//             </div>
//         );
//     }
// }




//Урок 100 Паттерны
//сейчас чар детейлс жестко привязан к персонажам
// надо сделать чтобы он был универсален
//ЭТО ДЗ




// import React, {Component} from 'react';
// import './charDetails.css';
// import GotService from '../../services/gotService';
// import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';

// //Этот компонент будем использовать в пропс чилдрен в characterPage.js
// //Это одна строчка списка itamDetails
// //Сначала мы не можем получить айтем в этом компоненте
// //React.Children.map клонирует каждого ребенка и добавляет к нему переменную char из стейта данного компонента который туда попадает из сервера серез сервис
// //деструктурированная переменная field это как раз то что надо вытащить из объекта с сервера
// //label - подпись которая задается вместе с пропсами
// const Field = ({char, field, label}) => {// Получает пропсы и записывает их в верстку 
    
//     return(
//         <li className="list-group-item d-flex justify-content-between">
//             <span className="term">{label}</span>
//             <span>{char[field]}</span>
//         </li>
//     )
// }

// export {
//     Field
// }

// export default class CharDetails extends Component {
//     gotService = new GotService();

//     state =  {
//         char: null,
//         loading: true,
//         error: false
//     }


//     componentDidMount(){
//         this.updateChar();
//     }

//     componentDidUpdate(prevProps, prevState){
//         if(this.props.charId !== prevProps.charId){
            
//             this.updateChar();
//         }
//     }


//     onCharDetailLoaded = (char) => {
//         this.setState({
//             char,
//             loading: false,

//         })
//     }

//     onError = (err) => {
//         this.setState({
//             error:true,
//             loading:false
//         })

//     }

//     updateChar(){
//         const {charId} = this.props;
//         if(!charId){
//             return;
//         }
      
//         this.gotService.getCharacter(charId)
//                 .then(this.onCharDetailLoaded)
//                 .catch(this.onError);
            
//     }

//     render() {

//         if (!this.state.char && this.state.error) {
//             return <ErrorMessage/>
//         } else if (!this.state.char) {
//             return <span className="select-error">Please select a character</span>
//         }
      
        

//         if (this.state.loading) {
//             return (
//                 <div className="char-details rounded">
//                     <Spinner/>
//                 </div>
//             )
//         }
//         //В дз надо будет переделать чтобы был не чар а айтем
//         const {char} = this.state;
//         const {name} = char;
//         return (//компонент должен отображать инфу не только про героев
//             // сюда будетприходить пропс чилдрен при вызове на уровень выше в characterPage.js
//             //React.Children.map это специальный метод перебора детей
//             //В этом переборе надо создать каждого чайлда который был передан из компонента выше
//             //Напрямую менять нельзя, поэтому делается копия каждого чайлда
//             //каждый элемент Field  при переборе будет получать переменную char которая приходит из стейта
//             <div className="char-details rounded">
//                 <h4>{name}</h4>
//                 <ul className="list-group list-group-flush">
//                     {
//                         React.Children.map(this.props.children, (child) => {
//                             return React.cloneElement(child, {char})
//                         })
//                     }
//                 </ul>
//             </div>
//         );
//     }
// }




//ДЗ урок 100 Отрефакторить компонент charDetails, сделать его самостоятельным и независимым (как мы сделали с itemList)


// import React, {Component} from 'react';
// import './itemDetails.css';
// import GotService from '../../services/gotService';
// import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';

// //Этот компонент будем использовать в пропс чилдрен в characterPage.js
// //Это одна строчка списка itamDetails
// //Сначала мы не можем получить айтем в этом компоненте
// //React.Children.map клонирует каждого ребенка и добавляет к нему переменную char из стейта данного компонента который туда попадает из сервера серез сервис
// //деструктурированная переменная field это как раз то что надо вытащить из объекта с сервера
// //label - подпись которая задается вместе с пропсами
// const Field = ({item, field, label}) => {// Получает пропсы и записывает их в верстку 
    
//     return(
//         <li className="list-group-item d-flex justify-content-between">
//             <span className="term">{label}</span>
//             <span>{item[field]}</span>
//         </li>
//     )
// }

// export {
//     Field
// }

// export default class ItemDetails extends Component {
//     gotService = new GotService();

//     state =  {
//         item: null,
//         loading: true,
//         error: false
//     }


//     componentDidMount(){
//         this.updateItem();
//     }

//     componentDidUpdate(prevProps, prevState){
//         if(this.props.itemId !== prevProps.itemId){
//             this.updateItem();

//         }
//     }


//     onItemDetailLoaded = (item) => {
//         this.setState({
//             item,
//             loading: false,

//         })
//     }

//     onError = (err) => {
//         this.setState({
//             error:true,
//             loading:false
//         })

//     }

//     updateItem(){
//         const {itemId} = this.props;
//         if(!itemId){//если из пропсов ничего не приходило то ничего не делаем
//             return;
//         }
//         const {getItem} = this.props;// получили из пропсов гет дату
//          getItem(itemId)// применяем полученную функцию в которую передаем аргументом itemId из пропсов

//         .then(this.onItemDetailLoaded)
//                 .catch(this.onError);
            
//     }

//     render() {
//         const {selectItem} = this.props;
//         if (!this.state.item && this.state.error) {
//             return <ErrorMessage/>
//         } else if (!this.state.item) {
//             return <span className="select-error">Please select {selectItem}</span>
//         }
      
        

//         if (this.state.loading) {
//             return (
//                 <div className="item-details rounded">
//                     <Spinner/>
//                 </div>
//             )
//         }
//         //В дз надо будет переделать чтобы был не чар а айтем
//         const {item} = this.state;
//         const {name} = item;
//         return (//компонент должен отображать инфу не только про героев
//             // сюда будетприходить пропс чилдрен при вызове на уровень выше в characterPage.js
//             //React.Children.map это специальный метод перебора детей
//             //В этом переборе надо создать каждого чайлда который был передан из компонента выше
//             //Напрямую менять нельзя, поэтому делается копия каждого чайлда
//             //каждый элемент Field  при переборе будет получать переменную item которая приходит из стейта
//             <div className="item-details rounded">
//                 <h4>{name}</h4>
//                 <ul className="list-group list-group-flush">
//                     {
//                         React.Children.map(this.props.children, (child) => {
//                             return React.cloneElement(child, {item})
//                         })
//                     }
//                 </ul>
//             </div>
//         );
//     }
// }





//Урок 104 ДЗ Хуки реакта. Предыдущий вар рабочий


import React, {useState,useEffect} from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

function ItemDetails({itemId,getItem,selectItem,children})  {
    const gotService = new GotService();

    const [item, updateItemState] = useState(null);
    const [loading, updateLoadingState] = useState(true);
    const [error, updateItemError] = useState(false);
  
    useEffect(() =>{
        updateItem();
        
    },[itemId])
        
    
    function onItemDetailLoaded (item) {
        updateItemState(item)
        updateLoadingState(false)
    }

    function onError (err) {
        updateItemError(true)
        updateLoadingState(false)
    }

   function updateItem(){
        if(!itemId){
            return;
        }
         getItem(itemId)
        .then(onItemDetailLoaded)
        .catch(onError);
            
    }

  
        
        if (!item && error) {
            return <ErrorMessage/>
        } else if (!item) {
            return <span className="select-error">Please select {selectItem}</span>
        }
      
        

        if (loading) {
            return (
                <div className="item-details rounded">
                    <Spinner/>
                </div>
            )
        }
        
        
        const {name} = item;
        return (
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    
}


export default ItemDetails;