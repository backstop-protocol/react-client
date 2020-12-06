import React, {Component} from "react";
import styled from 'styled-components';

const Container = styled.div`
    width: 500px;
    height: 100px;
    display: flex;
`

const Left = styled.div`
    background-color: red;
    flex: 1;
    flex-direction: column;
`

const Right = styled.div`
    background-color: green;
    flex: 1;
`

const Blue = styled.div`
    bckground-color: blue;
    height: 10px;
    width: 10px;
    flex: 1;
`

export default class Tvl extends Component {
    render() {
       return (
           <div>
               <Container>
                   <Left>
                       <Blue />
                       <Blue />
                       <Blue />
                   </Left>
                   <Right>
                   </Right>
               </Container>
           </div>
       )
    }
}