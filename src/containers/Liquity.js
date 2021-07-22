

import React, { Component } from "react";
import logo from "../assets/compound-full-logo.svg";
import Etherium from "../assets/etherium.svg";
import Header2 from "../components/Header2";
import { doApiAction } from "../lib/Actions";
import compoundStore from "../stores/compound.store"
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import BalanceBox from "../components/compound-components/BalanceBox"
import CoinListBox from "../components/compound-components/CoinListBox"
import {CoinStatusEnum} from "../lib/compound.util"
import {device} from "../screenSizes";
import routerStore from "../stores/router.store"
import userStore from "../stores/user.store"

const Overides = styled.div`
    margin-bottom: 100px;
`

class Liquity extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
    compoundStore.getUserInfo()
  }

  getList(coinStatusToShow){
    const items = compoundStore.coinList.filter(coinAddress=> {
        const coin = compoundStore.coinsInTx[coinAddress] || compoundStore.coinMap[coinAddress] // preserve state until tx is finished and UI is ready to dispaly new coin state
        if(!coin.symbol){
            return false
        }
        return coin.isCoinStatus(coinStatusToShow)
    })
    .map(coinAddress => {
        const coin = compoundStore.coinsInTx[coinAddress] || compoundStore.coinMap[coinAddress]
        return coin
    }) 
    return items     
  }

  render() {
    const { userInfo, userInfoUpdate, coinList } = compoundStore
    console.log("comp userInfoUpdate ", userInfoUpdate)
    return (
      <iframe 
        src="http://localhost:3000"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    );
  }
}

export default observer(Liquity)