import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage'; 
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';// подтягиваем роу блок из специального компонента

export default class HousesPage extends Component {
    gotService = new GotService();//вызываем класс который будет фетчить данные с сервера

    state = {
        selectedHouse: null,
        error: false
    }

     onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
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
        const itemList = (<ItemList
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllHouses}
            renderItem={({name}) => `${name}`}/>
            ) 
            // name: "House Arryn of the Eyrie"
            // region: "The Vale"
            // titles: (4) ["King of Mountain and Vale (formerly)", "Lord of the Eyrie", "Defender of the Vale", "Warden of the East"]
            // words: "As High as Honor"

          
            const itemDetails = (
                <ItemDetails
                selectItem = "house"
                itemId = {this.state.selectedHouse}
                getItem = {this.gotService.getHouse}
                >
                <Field field='region' label="Region" />
                <Field field='titles' label="Titles" />
                <Field field='words' label="Words" />
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
                </ItemDetails>
            )
    
            return (
                <RowBlock left={itemList} right={itemDetails}/>
            )
        }
}