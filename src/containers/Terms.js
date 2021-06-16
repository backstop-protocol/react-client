import React, { Component } from "react";
import routerStore from "../stores/router.store"
import Sidebar from "../components/Sidebar";
import TermsOfUseContent from "../components/TermsOfUseContent";

export default class Terms extends Component {

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  render() {
    const { handleItemChange, history } = this.props;
    return (
      <div className="item-page-content">
        <div className="menu-item-header" style={{ height: "176px" }}>
          <h1 className="item-header-title">Terms of Use</h1>
        </div>
        <div
          className="faq-content-container"
          style={{ height: "calc(100vh - 176px) " }}
        >
          <TermsOfUseContent />
        </div>
      </div>
    );
  }
}
