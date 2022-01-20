import React, { Component } from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import {device} from "../screenSizes";
import routerStore from "../stores/router.store"
import SpActionBox from "../components/stability-pool/SpActionBox"
import Navbar from "../components/stability-pool/Navbar"
import hundredStore from "../stores/hundred.store"
import VestaInfoPage from "../components/vesta/VestaInfoPage"
import userStore from "../stores/user.store"

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
    const showInfoPage = !userStore.loggedIn
    return (
      <div className="content">
        {!showInfoPage && <div>
          <Navbar/>
          <div className="container">
            {hundredStore.stabilityPools.map((sp, i)=> <SpActionBox key={i} store={sp}/>)}
          </div>
        </div>}
        {showInfoPage && <VestaInfoPage/>}
      </div>
    );
  }
}

export default observer(Hundred)