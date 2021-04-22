import React, { Component } from "react";
import Logo from "../assets/bprotocol.svg";
import Github from "../assets/github.svg";
import Twitter from "../assets/twitter-icon.svg";
import Linkedin from "../assets/linkedin.svg";
import Discord from "../assets/discord.svg";
import AAVELogo from "../assets/aav-ewhite-logo.svg";
import CompoundLogo from "../assets/compound-logo.svg";
import MakerLogo from "../assets/logo-maker-white.svg";
import MigrationModal from "./modals/MigrationModal";
import { numm } from "../lib/Utils";
import MakerMigrationButton from "./action-panels/MigrationButton";
import LeavUs from "../components/LeaveUs";
import * as qs from "qs";
import {observer} from "mobx-react"
import routerStore from "../stores/router.store"
import makerStore from "../stores/maker.store"
import userStore from "../stores/user.store"
import styled from "styled-components"
import MigrateFromCompound from "./compound-components/MigrateFromCompound"
import {Transition} from 'react-spring/renderprops'

const MakerMigration = styled.div`

`

const CompoundMigration = styled.div`

`

class Sidebar extends Component {
  state = {
    showSideBar: true
  };
  handleItemSelect = (location) => {
    routerStore.routeProps.history.push(`/${location}`);
  };

  componentDidMount() {
      window.addEventListener("resize", this.resize.bind(this));
      this.resize();
  }

  resize() {
      this.setState({showSideBar : window.innerWidth >= 1050})
      console.log(window.innerWidth);
  }

  getState(pathname) {
    if(pathname === "/maker" || pathname === "/app"){
      return "maker"
    }
    if(pathname === "/compound"){
      return "compound"
    }
  }

  render() {
    const { history } = routerStore.routeProps;
    const {search, pathname} = history.location
    const { loggedIn, showConnect } = userStore
    const { userInfo } = makerStore
    const params = qs.parse(search, { ignoreQueryPrefix: true })
    const pathState = this.getState(pathname)
    const {voting} = window.appConfig

    return (
      <div className="sidebar" style={this.state.showSideBar ? {} : { display: 'none' }}>
        <img className="logo" alt="Logo" src={Logo} />
        <div className="ln"> </div>
        <div className="sidebar-content">

          {pathState == "maker" 
            ? 
              <div >
                <MakerMigration>
                  { !params.export && userInfo && userInfo.makerdaoCdpInfo.hasCdp && (
                    <div>
                      <div className="cdp-convert">
                        <MakerMigrationButton />
                        <div>
                          <p>
                            Import your Vault 
                            <br />
                            from MakerDAO system <br />
                            to B.Protocol
                          </p>
                          <div className="even">
                            <div>
                              <small><b><u>ETH Locked</u></b></small>
                              <p>{numm(userInfo.makerdaoCdpInfo.ethDeposit, 4)} ETH</p>
                            </div>
                            <div>
                              <small><b><u>DAI Debt</u></b></small>
                              <p>{numm(userInfo.makerdaoCdpInfo.daiDebt, 2)} DAI</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ln"> </div>
                    </div>
                  )}
                  {params.export && 
                    <div className="container">
                      <LeavUs show={params.export} userInfo={userInfo} showConnect={showConnect} />
                    </div>
                  }
                </MakerMigration>
              </div>
              
            : pathState == "compound" ?
              <div >
                <MigrateFromCompound/>
              </div>
            :
              <div>
                {/* AAVE */}
                <div></div>
              </div>
          }

          <div className="products">
            <div
              className={`product link-accesible ${
                (pathname === "/maker" || pathname === "/app") &&
                "selected"
              }`}
              onClick={() => this.handleItemSelect("maker")}
            >
              <img src={MakerLogo} />
            </div>
            <div 
              className={`product link-accesible ${
                pathname === "/compound" &&
                "selected"
              }`}
              onClick={() => this.handleItemSelect("compound")}>
              <img src={CompoundLogo} />
            </div>
            <div className="product">
              <img src={AAVELogo} />
              <small>(Coming soon)</small>
            </div>
          </div>
          <div className="ln"> </div>
          <div
            className={`product link-accesible ${
              pathname === "/faq" &&
              "selected"
            }`}
            onClick={() => this.handleItemSelect("faq")}
          >
            <p className="menu-item">FAQ</p>
          </div>
          <div
            className={`product link-accesible ${
              pathname === "/risk" &&
              "selected"
            }`}
            onClick={() => this.handleItemSelect("risk")}
          >
            <p className="menu-item">Risks</p>
          </div>
          <div
            className={`product link-accesible ${
              pathname === "/terms" &&
              "selected"
            }`}
            onClick={() => this.handleItemSelect("terms")}
          >
            <p className="menu-item">Terms of Use</p>
          </div>
          {voting && <div className="ln"> </div>}
          {voting && <div
            className={`product link-accesible ${
              pathname.indexOf("/vote") > -1 &&
              "selected"
            }`}
            onClick={() => this.handleItemSelect("vote/maker")}
          >
            <p className="menu-item">Vote</p>
          </div>}
        </div>
        <div className="sidebar-footer">
          <h3>B.Protocol community</h3>
          <div className="social-icons">
            <a href="https://github.com/backstop-protocol" target="_blank">
              <img src={Github} />
            </a>
            <a href="https://twitter.com/bprotocoleth" target="_blank">
              <img src={Twitter} />
            </a>
            <a href="https://medium.com/b-protocol" target="_blank">
              <img src={require("../assets/medium-icon.svg")} />
            </a>
            <a href="https://discord.gg/3RmqN2K" target="_blank">
              <img src={Discord} />
            </a>
          </div>
          <p className="credits">&copy; 2020 Smart Future Labs</p>
        </div>
      </div>
    );
  }
}

export default observer(Sidebar)