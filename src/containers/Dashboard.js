import React, { Component } from "react";
import Etherium from "../assets/etherium.svg";
import Header from "../components/Header";
import EtheriumBox from "../components/EtheriumBox";
import DaiBox from "../components/DaiBox";
import { doApiAction } from "../lib/Actions";
import EventBus from "../lib/EventBus";
import logo from "../assets/logo-maker-black.svg";
import makerStore from "../stores/maker.store"
import {observer} from "mobx-react"

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  onConnect = async (web3, user) => {
    await makerStore.getUserInfo();
  };

  onAction = async (action, value, onHash) => {
    try {
      const res = await doApiAction(action, value, null, onHash);
      await makerStore.getUserInfo();
      return res;
    } catch (error) {
      EventBus.$emit("action-failed", null, action);
      let errorMsg = null;
      if(action.toString() === "repay")
          errorMsg = "Repay is expected to fail, likely because your DAI balance is too low (by 0.000001 DAI or less)";
      EventBus.$emit("app-error", errorMsg, action);
      console.log(error);
      return false;
    }
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

        <div className="container currency-container split">
          <EtheriumBox
            userInfo={userInfo}
            onPanelAction={this.onAction}
          />
          <DaiBox
            userInfo={userInfo}
            title={"DAI debt"}
            icon={Etherium}
            onPanelAction={this.onAction}
          />
        </div>
      </div>
    );
  }
}

export default observer(Dashboard)