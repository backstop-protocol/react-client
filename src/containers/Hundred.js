

import React, { Component } from "react";
import logo from "../assets/compound-full-logo.svg";
import Header3 from "../components/Header3";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {device} from "../screenSizes";
import routerStore from "../stores/router.store"
import SpActionBox from "../components/stability-pool/SpActionBox"
import Navbar from "../components/stability-pool/Navbar"
import hundredStore from "../stores/hundred.store"

class Hundred extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  render() {
    const stabilityPools = [
      {
        asset: 'USDC',
        amount: '1000.43',
        apy: '5.4',
        walletBalance: '5000000.12'
      },
      {
        asset: 'USDT',
        amount: '404.21',
        apy: '6.7',
        walletBalance: '5000.12'
      },

    ]
    return (
      <div className="content">
        <Navbar/>
        <div className="container">
          {hundredStore.stabilityPools.map((sp, i)=> <SpActionBox key={i} store={sp}/>)}
        </div>
      </div>
    );
  }
}

export default observer(Hundred)