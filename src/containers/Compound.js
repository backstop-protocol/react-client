

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


class Compound extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    compoundStore.getUserInfo()
  }

  render() {
    const { userInfo, userInfoUpdate, unBorrowedList, borrowedList, unDepositedList, depositedList } = compoundStore
    console.log("comp userInfoUpdate ", userInfoUpdate)
    return (
      <div className="content">
        <Header2
          info={ userInfo !== null && userInfo}
          onConnect={this.onConnect}
          logo={logo}
        />
        <Flex style={{ marginTop: -30}} justifyCenter>
          <Flex column>
            <BalanceBox type="deposit" list={depositedList}/>
            <CoinListBox type="deposit" list={unDepositedList}/>
          </Flex>
          <Flex column>  
            <BalanceBox type="borrow" list={borrowedList}/>
            <CoinListBox type="borrow" list={unBorrowedList}/>
          </Flex>
        </Flex>
      </div>
    );
  }
}

export default observer(Compound)