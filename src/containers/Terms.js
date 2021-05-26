import React, { Component } from "react";
import routerStore from "../stores/router.store"
import Sidebar from "../components/Sidebar";
import TermsOfUseContent from "../components/TermsOfUseContent";

export default class Terms extends Component {

  constructor (props) {
    super(props)
    this.state = {height:0}
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
    const height = document.querySelector('.menu-item-header').clientHeight;
    this.setState({ height });
  }

  render() {
    const { handleItemChange, history } = this.props;
    return (
      <div className="item-page-content">
        <div className="menu-item-header">
          <h1 className="item-header-title">Terms of Use</h1>
        </div>
        <div
          className="faq-content-container"
          style={{ marginTop: `${this.state.height}px` }}
        >
          <TermsOfUseContent />
        </div>
      </div>
    );
  }
}
