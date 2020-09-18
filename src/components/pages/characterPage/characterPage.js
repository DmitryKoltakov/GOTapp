// import React, {Component} from 'react';
// import {Col, Row, Container} from 'reactstrap';
// import ItemList from '../itemList';
// import CharDetails from '../charDetails';
// import ErrorMessage from '../errorMessage'; 


// export default class CharacterPage extends Component {

//     state = {
//         selectedChar: null,
//         error: false
//     }

//      //эта функция будет передана как пропс при рендере компонента
//      onCharSelected = (id) => {//оработчик клика при выборе героя
//         this.setState({
//             selectedChar: id
//         })
//      }


//     componentDidCatch() {//так же обрабатываем ошибку
//         this.setState({
//             error: true
//         })
//     }

//     render() {

//         if(this.state.error) {
//             return <ErrorMessage/>
//         }

//         return (
//             <Row>
//                 <Col md='6'>
//                     <ItemList onCharSelected={this.onCharSelected}/>
//                 </Col>
//                 <Col md='6'>
//                     <CharDetails charId = {this.state.selectedChar} />
//                 </Col>
//             </Row>
//         )
//     }
// }





//Урок 100 Паттерны
import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage'; 
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';// подтягиваем роу блок из специального компонента
export default class CharacterPage extends Component {
    gotService = new GotService();//вызываем класс который будет фетчить данные с сервера

    state = {
        selectedChar: null,
        error: false,
    }

     onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
     }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        // копирование кода - зло
        //вынесли в переменные вызовы компонентов
        // передаем в itemList функцию которая получает список персонажей
            //в вызовах функций используется контекст вызова 
            //чтобы он не потерялся в сервисах везде прописываем стрелочные функции
            //при вызове компонента и предачи гет даты мы не активируем функцию getAllCharacters не пишем () а лишь передаем ее в айтем лист
            //renderItem - еще одна функция которую мы закидываем в айтем лист из нее контролируем содержание айтем листа
            //renderItem={({name, gender}) => `${name} (${gender})`} ---- {name, gender} вытащит из того что передастся при вызове
        const itemList = (<ItemList
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllCharacters}
            renderItem={({name, gender}) => `${name} (${gender})`}/>
            ) // скобки юзаем для того чтобы поместить несколько строчек


            //Юзаем Props Children
        const itemDetails = (
            <ItemDetails
            itemId = {this.state.selectedChar}
            getItem = {this.gotService.getCharacter}
            >
            <Field field='gender' label="Gender" />
            <Field field='born' label="Born" />
            <Field field='died' label="Died" />
            <Field field='culture' label="Culture" />
            </ItemDetails>
        )

        return (//теперь весь ретерн состоит из 1 компонента и двух пропсов - переменных
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
