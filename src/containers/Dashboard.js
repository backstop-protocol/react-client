import React, { Component } from "react";
import Etherium from "../assets/etherium.svg";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EtheriumBox from "../components/EtheriumBox";
import DaiBox from "../components/DaiBox";
import * as ApiHelper from "../lib/ApiHelper";
import * as B from "../lib/bInterface";
import { doApiAction, setUserInfo } from "../lib/Actions";
import EventBus from "../lib/EventBus";
import ModalContainer from "../components/ModalContainer";

let timeout;

export default class Dashboard extends Component {
  web3 = null;
  networkType = null;

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userInfo: null,
      showConnect: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    EventBus.$on("get-user-info", this.getUserInfo.bind(this));
  }

  onConnect = async (web3, user) => {
    this.onHideConnect();
    this.web3 = web3;
    this.networkType = await web3.eth.net.getId()
    this.setState({ user, loggedIn: true });

    await this.getUserInfo();
  };

  getUserInfo = async () => {
    let userInfo = await B.getUserInfo(this.web3, this.networkType, this.state.user);
    const orgInfo = userInfo;
    userInfo = ApiHelper.Humanize(userInfo, this.web3);

    //const ok = (this.web3.utils.toBN(userInfo.userWalletInfo.daiAllowance).toString(16) === "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    setUserInfo(this.state.user, this.web3, this.networkType, userInfo, orgInfo);
    console.log(userInfo);
    this.setState({ userInfo });
  };

  onAction = async (action, value, onHash) => {
    try {
      const res = await doApiAction(action, value, null, onHash);
      await this.getUserInfo();
      setTimeout(this.getUserInfo, 15 * 1000);
      setTimeout(this.getUserInfo, 30 * 1000);
      return res;
    } catch (error) {
      EventBus.$emit("action-failed", null, action);
      EventBus.$emit("app-error", null, action);
      console.log(error);
      return false;
    }
  };

  onShowConnect = () => {
    this.setState({ showConnect: true });
    clearTimeout(timeout);
    timeout = setTimeout(this.onHideConnect, 2000);
  };

  onHideConnect = () => {
    this.setState({ showConnect: false });
  };

  render() {
    const { userInfo, loggedIn, showConnect } = this.state;
    const { current, handleItemChange, history } = this.props;

    return (
      <div className="App">
        <ModalContainer></ModalContainer>
        <Sidebar
          userInfo={userInfo}
          current={current}
          handleItemChange={handleItemChange}
          history={history}
          initialState="maker"
        />
        <div className="content">
          <Header
            info={loggedIn && userInfo !== null && userInfo}
            onConnect={this.onConnect}
            showConnect={showConnect}
            history={history}
          />

          <div className="container currency-container split">
            <EtheriumBox
              userInfo={userInfo}
              onPanelAction={this.onAction}
              showConnect={this.onShowConnect}
            />
            <DaiBox
              userInfo={userInfo}
              title={"DAI debt"}
              icon={Etherium}
              onPanelAction={this.onAction}
              showConnect={this.onShowConnect}
            />
          </div>
        </div>
      </div>
    );
  }
}
