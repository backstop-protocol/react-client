import React, { Component } from "react";

import Sidebar from "../components/Sidebar";
import RiskContent from "../components/RiskContent";

export default class Risk extends Component {
  render() {
    const { handleItemChange, history } = this.props;
    return (
      <div className="App">
        <Sidebar
          handleItemChange={handleItemChange}
          history={history}
          initialState="risk"
        />
        <div className="item-page-content">
          <div className="menu-item-header" style={{ height: "276px" }}>
            <h1 className="risk-header">Risk</h1>
            <p className="item-header-small-text">
              Interacting with lending platforms does not come without risks,
              and while B.Protocol design does not add additional risk, the user
              should make his/her own research and understand the risks in the
              underlying lending platforms (MakerDAO, Compound, Aave), and the
              security guarantees B.Protocol provides.
              <br />
              <br />
              Whitepapers
              <div className="item-header-icon-container">
                <a href="#">
                  <img
                    src={require("../assets/b-protocol-icon-risk.svg")}
                    height="20"
                  />
                </a>
                <a href="#">
                  <img
                    src={require("../assets/logo-maker-white-risk.svg")}
                    height="20"
                  />
                </a>
                <a href="#">
                  <img
                    src={require("../assets/compound-logo-a-1-risk.svg")}
                    height="20"
                  />
                </a>
                <a href="#">
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
      </div>
    );
  }
}
