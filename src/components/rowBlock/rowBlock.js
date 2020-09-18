import React from 'react';
import {Col, Row} from 'reactstrap';


//Делаем компонент 
//Его можно будет импортировать в другие компоненты и использовать там в виде одной строчки
const RowBlock = ({left, right}) =>{//чтобы не копипастить верстку мы ее выносим в отдельную функцию
    //left - item list
    //right - char details
    return(
    <Row>
        <Col md='6'>
            {left}
        </Col>
        <Col md='6'>
            {right}
        </Col>
    </Row>
    )
}

export default RowBlock;