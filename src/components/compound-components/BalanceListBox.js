import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import CoinListHeader from "./CoinListHeader"
import CoinList from "./CoinList"
import compoundStore from "../../stores/compound.store"
import ResponsiveWidthCol from "../style-components/ResponsiveContainer"
import {device} from "../../screenSizes";

const Container = styled.div`
    padding-top: 50px;
    @media ${device.largeLaptop} {
        padding-top: 42.5px;
    }
    @media ${device.laptop} {
        padding-top: 35px;
    }
`

class BalanceListBox extends Component {

    render () {
        const {list, type} = this.props        
        return (
            <Container>
                <CoinListHeader/>
                <CoinList type={type} isInBalanceBox={true} list={list}/>
            </Container>
        )
    }
}

export default observer(BalanceListBox)