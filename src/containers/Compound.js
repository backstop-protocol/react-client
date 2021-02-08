

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
`

class Compound extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    compoundStore.getUserInfo()
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
        <Flex style={{ marginTop: -30}} justifyCenter>
            <Flex column>
              <BalanceBox coinStatusToShow={CoinStatusEnum.deposited} type="deposit" list={coinList} showBox={compoundStore.showDepositWithdrawBox}/>
              <CoinListBox coinStatusToShow={CoinStatusEnum.unDeposited} type="deposit" list={coinList}/>
            </Flex>
            <Flex column>  
              <BalanceBox coinStatusToShow={CoinStatusEnum.borrowed} type="borrow" list={coinList} showBox={compoundStore.showBorrowReapyBox}/>
              <CoinListBox coinStatusToShow={CoinStatusEnum.unBorrowed} type="borrow" list={coinList}/>
            </Flex>
        </Flex>
      </Overides>
    );
  }
}

export default observer(Compound)