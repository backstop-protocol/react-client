import React, { Component } from "react";
import routerStore from "../stores/router.store"
import Sidebar from "../components/Sidebar";
import RiskContent from "../components/RiskContent";

export default class Risk extends Component {

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  render() {
    const { handleItemChange, history } = this.props;
    return (
      <div className="item-page-content">
        <div className="menu-item-header" style={{ height: "276px" }}>
          <h1 className="risk-header">Risks</h1>
          <p className="item-header-small-text">
            Interacting with lending platforms does not come without risks,
            and while B.Protocol design does not add additional risk, the user
            should make his/her own research and understand the risks in the
            underlying lending platforms (MakerDAO, Compound, Aave), and the
            security guarantees B.Protocol provides.
            <br />
            <br />
            <u>Whitepapers:</u>
            <div className="item-header-icon-container">
              <a href="https://medium.com/b-protocol/b-protocol-b6dd4e3bf9c0" target="_blank">
                <img
                  src={require("../assets/b-protocol-icon-risk.svg")}
                  height="20"
                />
              </a>
              <a href="https://makerdao.com/en/whitepaper/" target="_blank">
                <img
                  src={require("../assets/logo-maker-white-risk.svg")}
                  height="20"
                />
              </a>
              <a href="https://compound.finance/documents/Compound.Whitepaper.pdf" target="_blank">
                <img
                  src={require("../assets/compound-logo-a-1-risk.svg")}
                  height="20"
                />
              </a>
              <a href="https://github.com/aave/aave-protocol/blob/master/docs/Aave_Protocol_Whitepaper_v1_0.pdf" target="_blank">
                <img
                  src={require("../assets/aav-ewhite-logo-risk.svg")}
                  height="20"
                />
              </a>
            </div>
          </p>
        </div>
        <div
          className="faq-content-container"
          style={{ height: "calc(100vh - 276px) " }}
        >
          <RiskContent />
        </div>
      </div>
    );
  }
}
