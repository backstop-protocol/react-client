

import React, { Component } from "react";
import logo from "../assets/compound-full-logo.svg";
import Etherium from "../assets/etherium.svg";
import Header from "../components/Header";
import EtheriumBox from "../components/EtheriumBox";
import DaiBox from "../components/DaiBox";
import { doApiAction } from "../lib/Actions";
import makerStore from "../stores/maker.store"
import {observer} from "mobx-react"

class Compound extends Component {

  constructor(props) {
    super(props);
  }

  onConnect = async (web3, user) => {
    await makerStore.getUserInfo();
  };

  render() {
    const { userInfo, userInfoUpdate } = makerStore
    console.log("userInfoUpdate ", userInfoUpdate)
    return (
      <div className="content">
        <Header
          info={ userInfo !== null && userInfo}
          onConnect={this.onConnect}
          logo={logo}
        />
      </div>
    );
  }
}

export default observer(Compound)