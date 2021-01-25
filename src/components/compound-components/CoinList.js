import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import CoinListItem from "./CoinListItem"
import Flex, {FlexItem} from "styled-flex-component";

class CoinList extends Component {

    render () {
        const {list, isInBalanceBox, type} = this.props
        return list.map((v, i)=> {
            return <CoinListItem type={type} isInBalanceBox={isInBalanceBox} lastItem={i == list.length - 1} coinAddress={v} key={i} />
        })
    }
}

export default observer(CoinList)