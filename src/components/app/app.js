// import React, {Component} from 'react';
// import {Col, Row, Container,Button} from 'reactstrap';
// import Header from '../header';
// import RandomChar from '../randomChar';
// import ItemList from '../itemList';
// import CharDetails from '../charDetails';
// import ErrorMessage from '../errorMessage';
// import CharacterPage from "../characterPage";


// export default class App extends Component {//переписали App как класс
//    state={//состояние пишем через новый синтаксис
//     showRandomChar: true,//показ рандоманого перса тру по умолчанию
//     // selectedChar: 130,
//     error: false

// }
//     componentDidCatch(){//срабатывает если произошла ошибка. 
//         console.log('Error');
//         this.setState({error: true})// меняем стейт ошибки на тру
//     }
   
//     onToggleRC = () => {//обработчик клика по кнопке
//         this.setState(state => ({// устанавливаем состояние противоположное от текущего.Аргумент state - текщее состояние
//            showRandomChar: !state.showRandomChar,
//            error: false
//         }));     
//     }
//     //Переместили в chsracterPage.js
// //    //эта функция будет передана как пропс при рендере компонента
// //     onCharSelected = (id) => {//оработчик клика при выборе героя
// //         this.setState({
// //             selectedChar: id
// //         })
// //     }



//     render(){

//         if (this.state.error) {//проверяем на ошибку
//             return <ErrorMessage/>
//         }

//         const {showRandomChar} = this.state;//получаем текущее состояние
//         const randomChar = showRandomChar ? <RandomChar/> : null;// тернарный оператор если тру то показываем блок если фолс то ничего не делаем
//         return (//тут на реактстрапе и его системе гридов сделана страница которая применяет все импортированные компоненты
//             //Кнопку сделали через реакт страп. Повесили на нее обработчик
//             //Переменная randomChar будет рендерить компонент в зависимости от текущего состояния показа кнопки 
//             <> 
//                 <Container>
//                     <Header />
//                 </Container>
//                 <Container>
//                     <Row>
//                         <Col lg={{size: 5, offset: 0}}>
//                             <Button onClick={this.onToggleRC} color="primary" size="lg" block>Toggle Random Character</Button>
//                             {randomChar}
//                         </Col>
//                     </Row>
//                     <CharacterPage/>
//                 </Container>
//             </>
//         );
//     }


// }



// //Урок 100 Паттерны

// import React, {Component} from 'react';
// import {Col, Row, Container,Button} from 'reactstrap';
// import Header from '../header';
// import RandomChar from '../randomChar';
// import ErrorMessage from '../errorMessage';
// import CharacterPage from "../pages/characterPage";
// import GotService from '../../services/gotService';//импортировали обратно
// import BooksPage from '../pages/booksPage';
// import HousesPage from '../pages/housesPage'


// export default class App extends Component {
//     gotService = new GotService();

//     state={
//     showRandomChar: true,
//     error: false

// }
//     componentDidCatch(){
//         console.log('Error');
//         this.setState({error: true})
//     }
   
//     onToggleRC = () => {
//         this.setState(state => ({
//            showRandomChar: !state.showRandomChar,
//            error: false
//         }));     
//     }




//     render(){

//         if (this.state.error) {
//             return <ErrorMessage/>
//         }

//         const {showRandomChar} = this.state;
//         const randomChar = showRandomChar ? <RandomChar/> : null;
//         return (// дабавили еще верстки. Строку которая будет рендерить книги и еще одна дома
//             //теперь в айтем лист передается пропс который будет получать список книг а второй айтем лист будет получать список домов
//             //таким образом айтем лист формируется из того что в него приходит
//             //renderItem контролирует то что будет написано в айтем листе
//             //туда можно засунуть даже верстку
//             <> 
//                 <Container>
//                     <Header />
//                 </Container>
//                 <Container>
//                     <Row>
//                         <Col lg={{size: 5, offset: 0}}>
//                             <Button onClick={this.onToggleRC} color="primary" size="lg" block>Toggle Random Character</Button>
//                             {randomChar}
//                         </Col>
//                     </Row>
//                     <CharacterPage/>
//                     <BooksPage/>
//                     <HousesPage/>
//                     {/* <Row> 
//                         <Col md='6'>
//                             <ItemList 
//                             onItemSelected={this.onItemSelected}
//                             getData = {this.gotService.getAllBooks}
//                             renderItem={(item) => (<><span>{item.name}</span><Button color="primary" size="sm">Cick me</Button></>)}
//                              />
//                         </Col>
//                         <Col md='6'>
//                             <ItemDetails itemId={this.state.selectedChar} />
//                         </Col>
//                     </Row>

//                     <Row> 
//                         <Col md='6'>
//                             <ItemList 
//                             onItemSelected={this.onItemSelected}
//                             getData = {this.gotService.getAllHouses}
//                             renderItem={(item) => `${item.name} `}/>
//                         </Col>
//                         <Col md='6'>
//                             <ItemDetails itemId={this.state.selectedChar} />
//                         </Col>
//                     </Row>
//                     */}
//                 </Container>
//             </>
//         );
//     }

// }





//Урок 101 React Router
//Одни компоненты показываем другие скрываем
//При этом меняем url
//React Router имеет 2 части
//Для браузера 
//Для мобильных приложений
import './app.css'
import React, {Component} from 'react';
import {Col, Row, Container,Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from "../pages/characterPage";
import GotService from '../../services/gotService';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import  BooksItem from '../pages/booksItem';// импортируем обертку для отдельной книги как компонент



export default class App extends Component {
    gotService = new GotService();

    state={
    showRandomChar: true,
    error: false

}
    componentDidCatch(){
        console.log('Error');
        this.setState({error: true})
    }
   
    onToggleRC = () => {
        this.setState(state => ({
           showRandomChar: !state.showRandomChar,
           error: false
        }));     
    }




    render(){

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {showRandomChar} = this.state;
        const randomChar = showRandomChar ? <RandomChar/> : null;
        return (
            // Оборачиваем всю структуру в <Router></Router>
        
            //<div className="app"> для того чтобы не потерять стили при использовании этой херни
            //<Route path="/characters" component={CharacterPage}/>
            //path - url по которому отображаем компонент
            //по каждому адресу будем показвать свой компонент
            //component - то что мы отображаем по этому пути
            //import {Link} from 'react-router-dom'; // используется там где используются линки. в Header
            //<Route path="/" exact component={() => <h1>Welcome Bitches</h1>}/> 
            //exact делает так чтобы путь совпадал точно только с тем что написано в пути а не смотрел на то что после слеша.Иначе компонент прицепится ко всем адресам
            //Далее про динамический адрес
            //Надо передавать айди того эелемента который мы хотим отобразить на странице
            //BooksItem - обертка для отдельной книги.В нее с пропсами передадим айди
            //Из Route приходят аргументы match location и history
            //Match -объект с данными о том как path  совпал с текущим адресом в неместь параметр id
            //Loation - состояние и положение нашего роута в текущий момент
            //history - api для организации перезода в текущий момент
            //Короче это какие то объекты из которых можно вытаскивать нужную инфу
            //const {id} = match.params; - получение переменной 
            // этот айди будет передан как пропс в компонент бук айтем чтобы он вернул нужный айтем по айдишнику
            //теперь надо сделать чтобы когда переходим во вкладку букс и кликаем на отдельную книгу то она открывалась отдельно

            <Router>
                <div className="app"> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button onClick={this.onToggleRC} color="primary" size="lg" block>Toggle Random Character</Button>
                            {randomChar}
                        </Col>
                    </Row>
                    <Route path="/" exact component={() => <h1>Welcome Bitches</h1>}/>
                    <Route path="/characters" component={CharacterPage}/>
                    <Route path="/houses" component={HousesPage}/>
                    <Route path="/books" exact component={BooksPage}/>
                    <Route path="/books/:id" render={
                        ({match, location, history})=> {
                            console.log(match);
                            console.log(location);
                            console.log(history);
                            const {id} = match.params;
                        return <BooksItem bookId={id} />} 
                        }/>
                </Container>
            </div>
            </Router>
        );
    }

}
