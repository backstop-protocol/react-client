

import React, { Component } from "react";
import logo from "../assets/compound-full-logo.svg";
import Etherium from "../assets/etherium.svg";
import Header2 from "../components/Header2";
import EtheriumBox from "../components/EtheriumBox";
import DaiBox from "../components/DaiBox";
import { doApiAction } from "../lib/Actions";
import compoundStore from "../stores/compound.store"
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import BalanceBox from "../components/compound-components/BalanceBox"
import CoinListBox from "../components/compound-components/CoinListBox"
import {CoinStatusEnum} from "../lib/compound.util"
import {device} from "../screenSizes";

const Overides = styled.div`
    overflow: hidden;
    margin-bottom: 100px;
`

class Compound extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
      <Overides className="content">
        <Header2
          info={ userInfo !== null && userInfo}
          onConnect={this.onConnect}
          logo={logo}
        />
        <Flex style={{ marginTop: -30, paddingBottom: "15px"}} justifyCenter>
            <Flex column>
              <BalanceBox type="deposit" list={this.getList(CoinStatusEnum.deposited)} showBox={compoundStore.showDepositWithdrawBox}/>
              <CoinListBox type="deposit" list={this.getList(CoinStatusEnum.unDeposited)}/>
            </Flex>
            <Flex column>  
              <BalanceBox type="borrow" list={this.getList(CoinStatusEnum.borrowed)} showBox={compoundStore.showBorrowReapyBox}/>
              <CoinListBox type="borrow" list={this.getList(CoinStatusEnum.unBorrowed)}/>
            </Flex>
        </Flex>
      </Overides>
    );
  }
}

export default observer(Compound)