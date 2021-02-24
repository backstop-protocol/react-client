import React, { Component } from "react";
import FAQContent from "../components/FAQContent";

export default class FAQ extends Component {
  render() {
    const { handleItemChange, history } = this.props;
    return (
      <div className="item-page-content">
        <div className="menu-item-header" style={{ height: "176px" }}>
          <h1 className="risk-header">FAQ</h1>
          <p className="item-header-small-text">
            The following are the most common questions the B.Protocol team has been asked by new users of the protocol. 
            It will be updated as we go forward. Get yourself educated…
          </p>
        </div>
        {/* <p dangerouslySetInnerHTML={{ __html: Content.faq }}></p> */}
        <div
          className="faq-content-container"
          style={{ height: "calc(100vh - 176px)" }}
        >
          <FAQContent />
        </div>
      </div>
    );
  }
}
