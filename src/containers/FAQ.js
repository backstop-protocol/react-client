import React, { Component } from "react";
import FAQContent from "../components/FAQContent";
import routerStore from "../stores/router.store"

export default class FAQ extends Component {

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
          <h1 className="risk-header">FAQ</h1>
          <p className="item-header-small-text">
            The following are the most common questions the B.Protocol team has been asked by new users of the protocol. 
            It will be updated as we go forward. Get yourself educated…
          </p>
        </div>
        {/* <p dangerouslySetInnerHTML={{ __html: Content.faq }}></p> */}
        <div
          className="faq-content-container"
          style={{ marginTop: `${this.state.height}px` }}
        >
          <FAQContent />
        </div>
      </div>
    );
  }
}
