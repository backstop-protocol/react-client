import React, { Component } from "react";
import FAQContent from "../components/FAQContent";

export default class FAQ extends Component {
  render() {
    const { handleItemChange, history } = this.props;
    return (
      <div className="item-page-content">
        <div className="menu-item-header" style={{ height: "176px" }}>
          <h1 className="item-header-title">Frequently Asked Questions</h1>
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
