import React, { Component } from "react";
import routerStore from "../stores/router.store"
import Sidebar from "../components/Sidebar";
import TermsOfUseContent from "../components/TermsOfUseContent";
import styled from "styled-components"
import userStore from "../stores/user.store"

const Button = styled.div`
  transition: all 0.3s ease-in-out;
  margin: 50px 0;
  width: 100%;
  height: 48px;
  border-radius: 3.4px;
  background-color: #12c164;
  display: flex;
  justify-content:center;
  align-items: center;
  cursor: pointer;
  &.done{
    display: none;
  }
  span {
    transition: all 0.3s ease-in-out;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.7px;
    color: white;
    padding: 10px;
  }
`

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
          <Button className={userStore.userAggresToTerms ? "done" : ""} onClick={()=>userStore.aggreToTerms()}>
            <span>i agree to the terms of use</span>
          </Button>
        </div>
      </div>
    );
  }
}
