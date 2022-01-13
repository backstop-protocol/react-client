import React, { Component } from "react";
import Logo from "../assets/bprotocol.svg";
import Github from "../assets/github.svg";
import Twitter from "../assets/twitter-icon.svg";
import Linkedin from "../assets/linkedin.svg";
import Discord from "../assets/discord.svg";
import AAVELogo from "../assets/aav-ewhite-logo.svg";
import CompoundLogo from "../assets/compound-logo.svg";
import LiquityLogo from "../assets/liquity-logo.svg";
import MakerLogo from "../assets/logo-maker-white.svg";
import MigrationModal from "./modals/MigrationModal";
import { numm } from "../lib/Utils";
import MakerMigrationButton from "./action-panels/MigrationButton";
import LeavUs from "../components/LeaveUs";
import * as qs from "qs";
import {observer} from "mobx-react"
import routerStore from "../stores/router.store"
import makerStoreManager from "../stores/maker.store"
import userStore from "../stores/user.store"
import styled from "styled-components"
import MigrateFromCompound from "./compound-components/MigrateFromCompound"
import {Transition} from 'react-spring/renderprops'

const MakerMigration = styled.div`

`

class Sidebar extends Component {

  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  handleItemSelect = (location) => {
    routerStore.routeProps.history.push(`/${location}`);
    this.setState({open: false})
  };

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
    const {getMakerStore, storeChanges} = makerStoreManager
    const { userInfo, symbol } = getMakerStore()
    const params = qs.parse(search, { ignoreQueryPrefix: true })
    const pathState = this.getState(pathname)
    const lunchDate = new Date("8/4/2021 12:00:00 GMT+0300").getTime()
    const now = new Date().getTime()
    const notLunched = now < lunchDate

    if (pathname === '/hundred') {
      return null
    }

    return (
      <div className={`sidebar ${this.state.open ? "open" : ""}`}>
        <div onClick={()=>this.setState({open: !this.state.open})} className="menu-toggle">
          <div className={`hamburger hamburger--spin ${this.state.open ? "is-active" : ""}`}>
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </div>
        </div>
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
                        <div>
                          <p>
                            Import your Vault 
                            <br />
                            from MakerDAO system <br />
                            to B.Protocol
                          </p>
                          <div className="even">
                            <div>
                              <small><b><u>{symbol}</u></b></small>
                              <p>{numm(userInfo.makerDaoDeposited, 4)} {symbol}</p>
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
            <div 
              className={`product link-accesible ${
                pathname === "/liquity" &&
                "selected"
              }`}
              onClick={() => this.handleItemSelect("liquity")}>
              <img src={LiquityLogo} />
              {false && <small>(Testnet)</small>}
            </div>
            <div className="product">
              <img src={AAVELogo} />
              <small>(Coming soon)</small>
            </div>
          </div>
          <div className="ln"> </div>
          <div
            className={`product link-accesible ${
              pathname === "/farm-info" &&
              "selected"
            }`}
            onClick={() => this.handleItemSelect("farm-info")}
          >
            <p className="menu-item">Farm Info</p>
            <small>(Beta)</small>
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
            <a href="https://discord.com/invite/bJ4guuw" target="_blank">
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
