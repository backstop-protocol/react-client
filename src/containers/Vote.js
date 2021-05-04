import React, { Component } from "react";
import routerStore from "../stores/router.store"
import {observer} from "mobx-react"
import styled from 'styled-components'
import MakerVotingContent from "../components/voting/MakerVotingContent.js"
import CompoundVotingContent from "../components/voting/CompoundVotingContent.js"
import ConnectButton from "../components/ConnectButton"
import userStore from "../stores/user.store"
import compoundStore from "../stores/compound.store"
import makerStore from "../stores/maker.store"
import ConnectWallet from "../assets/connect-your-wallet.svg";

const TitleImg = styled.img`
  width: 196px;
  height: 83px;
  margin: 75px;
  margin-bottom: 0;
`

const Tabs = styled.div`
  position: relative;
  bottom: -52px;
  left: 75px;
  max-width: 500px;
  display: flex;

`

const Tab = styled.div`
  cursor: pointer;
  display: inline-block;
  padding: 20px 30px 10px 30px;
  &.open {
    background-color: white;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.22);
  }
  img {
    width: 103px;
  }
`

class Vote extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  setSelectedTab = (selection) => {
    if(userStore.loggedIn){
      if(selection == "compound"){
        compoundStore.getUserInfo()
      }
      if(selection == "maker"){
        makerStore.getUserInfo()
      }
    }
    routerStore.routeProps.history.push(`/vote/${selection}`);
  }

  render() {
    const { handleItemChange, history } = this.props
    const selectedTab = window.location.pathname.indexOf("compound") > -1 ? "compound" : "maker"
    return (
      <div className="item-page-content">
        <div className="container" style={{marginBottom: "-117px"}}>
          <div className="split title-bar">
            <img/>
            <div className="connect-container">
                <ConnectButton />
                {(userStore.displayConnect || false)&& <div className="connect-wallet">
                  <i> </i>
                  <h3>Connect your wallet</h3>
                  <img src={ConnectWallet} />
              </div>}
            </div>
          </div>
        </div>
        <div className="menu-item-header" style={{ height: "276px"}}>
          <TitleImg src={require('../assets/images/vote.svg')} />
          <Tabs>
            <Tab className={selectedTab === "maker" ? "open" : ""} onClick={()=>this.setSelectedTab("maker")}>
              <img src={require('../assets/t-logo-maker-white.svg')} />
            </Tab>
            <Tab className={selectedTab === "compound" ? "open" : ""} onClick={()=>this.setSelectedTab("compound")}>
              <img  src={require('../assets/t-compound-logo-a-1.svg')} />
            </Tab>
          </Tabs>
        </div>
        {/* <p dangerouslySetInnerHTML={{ __html: Content.faq }}></p> */}
        <div>
        {selectedTab === "maker" &&
          <MakerVotingContent/>
        }
        {selectedTab === "compound" &&
           <CompoundVotingContent/>
        }
      </div> 
    </div>
    );
  }
}

export default observer(Vote)