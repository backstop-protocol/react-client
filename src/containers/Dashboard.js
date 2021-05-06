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
import routerStore from "../stores/router.store"
import Flex, {FlexItem} from "styled-flex-component";
import styled from "styled-components"
import {device} from "../screenSizes";
import ResponsiveWidthCol from "../components/style-components/ResponsiveContainer";

const Overrides = styled.div`
    overflow: hidden;
    margin-bottom: 100px;
    @media ${device.mobile} {
      margin-top 40px;
  } 
`
const Container = styled(ResponsiveWidthCol)`
    border-radius: 12px;
    border-style: solid;
    border-width: 0.5px;
    border-image-source: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4) 5%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0));
    margin: 0;
`

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
    makerStore.getUserInfo()
  }

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
      <Overrides className="content">
        <Header
          info={ userInfo !== null && userInfo}
          onConnect={this.onConnect}
          logo={logo}
        />

        <Flex style={{
                paddingBottom: "0px", 
                flexWrap: "wrap" ,
                justifyContent: "center",
                alignItems: "center"
              }}    
              justifyCenter>
            <Flex column style={{ padding: "20px" }}>
              <Container>
                <EtheriumBox
                  userInfo={userInfo}
                  onPanelAction={this.onAction}
                />
              </Container>
            </Flex>
            <Flex column style={{ padding: "20px" }}>
              <Container>
                <DaiBox
                  userInfo={userInfo}
                  title={"DAI debt"}
                  icon={Etherium}
                  onPanelAction={this.onAction}
                />
              </Container>
            </Flex>
        </Flex>
      </Overrides>
    );
  }
}

export default observer(Dashboard)