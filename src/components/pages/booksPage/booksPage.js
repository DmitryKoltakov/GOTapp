// import React, {Component} from 'react';
// import ItemList from '../../itemList';
// import ItemDetails, {Field} from '../../itemDetails';
// import ErrorMessage from '../../errorMessage'; 
// import GotService from '../../../services/gotService';
// import RowBlock from '../../rowBlock';// подтягиваем роу блок из специального компонента

// export default class BooksPage extends Component {
//     gotService = new GotService();//вызываем класс который будет фетчить данные с сервера

//     state = {
//         selectedBook: null,
//         error: false
//     }

//      onItemSelected = (id) => {
//         this.setState({
//             selectedBook: id
//         })
//      }


//     componentDidCatch() {
//         this.setState({
//             error: true
//         })
//     }

//     render() {
//         if(this.state.error) {
//             return <ErrorMessage/>
//         }
//         const itemList = (<ItemList
//             onItemSelected={this.onItemSelected}
//             getData={this.gotService.getAllBooks}
//             renderItem={({name}) => `${name}`}/>
//             ) // скобки юзаем для того чтобы поместить несколько строчек


//             //Юзаем Props Children
//             const itemDetails = (
//             //id: "1"
//             // name: "A Game of Thrones"
//             // numberOfPages: 694
//             // publisher: "Bantam Books"
//             // released: "1996-08-01T00:00:00"
//                 <ItemDetails
//                 selectItem = "book"
//                 itemId = {this.state.selectedBook}
//                 getItem = {this.gotService.getBook}
//                 >
//                 <Field field='numberOfPages' label="Number of pages" />
//                 <Field field='publisher' label="Publisher" />
//                 <Field field='released' label="Released" />
//                 </ItemDetails>
//             )
    
//             return (//теперь весь ретерн состоит из 1 компонента и двух пропсов - переменных
//                 <RowBlock left={itemList} right={itemDetails}/>
//             )
//         }
// }


//Урок 101 React Router

import React, {Component} from 'react';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage'; 
import GotService from '../../../services/gotService';
import {withRouter} from 'react-router-dom';// компонент высшего порядка может оборачивать другие компоненты чтобы предоставить им какие то свойства


 class BooksPage extends Component {
    gotService = new GotService();//вызываем класс который будет фетчить данные с сервера

    state = {
        // selectedBook: null, тоже теперь не нужен он переместился в BooksItem
        error: false
    }

    //onItemSelected тоже вырезали


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        

            // УБРЫЛИ ROWBLOCK ОСТАВИЛИ В РЕТЕРНЕ ТОЛЬКО АЙТЕМ ЛИСТ
            //теперь букс пейдж не отображает на самой себе айтем детейлс
            //onItemSelected теперь передает другую функцию 
            //делаем так чтобыэтот компонент узнал о роуте и его приколюхах через withRouter
            //this.props.history.push(`/books/${itemId}`) переведет нас на страницу нужной книги
            //влинке делается закрывающий слеш чтобы можно было использовать относительные пути а не абсолютные
            // <Link to="/characters/">Characters</Link>
            // this.props.history.push(itemId) Теперь без интерполяции
            //это не обычный пуш
            // в айтем листе есть обработчик клика теперь по клику будет срабатывать заклинание onItemSelected
            return (
                <ItemList
                onItemSelected={(itemId)=>{
                   this.props.history.push(itemId)
                } }
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => `${name}`}/>
            )
        }
}

export default withRouter(BooksPage);// так компонент получит match location и history