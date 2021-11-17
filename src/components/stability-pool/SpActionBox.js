import React, { Component } from "react";
import {observer} from "mobx-react"
import Flex, {FlexItem} from "styled-flex-component"
import styled from "styled-components"
import { makeAutoObservable, runInAction, observable} from "mobx"

const Close = styled.div`
  position: relative;
  left: calc(100% - var(--block-spacing-horizontal));
  top: 0;
`

class SpLocalStore {
  footerIsOpen = false
  action = "Deposit"
  transactionInProgress = false
  hash = null
  val = ""
  err = ""
  success = ""
  inputIsValid = false
  inputErrMsg = ""

  constructor () {
    makeAutoObservable(this)
  }

  openFooter = (action) => {
    this.action = action
    this.footerIsOpen = true
  }

  closeFooter = () => {
    this.footerIsOpen = false
  }
}

class SpActionBox extends Component {

  constructor(props) {
    super(props);
    this.store = new SpLocalStore()
  }

  render() {
    const {asset, amount, apy, walletBalance} = this.props
    const {footerIsOpen, action} = this.store
    return (
    <article>
      <Flex justifyBetween alignCenter wrap>
          <strong>{asset}</strong>
          <Flex column alignCenter justifyBetween style={{padding: "0 --spacing"}}>
            <div>{amount}</div>
            <small>Deposited</small>
          </Flex>
          <Flex column alignCenter justifyBetween style={{padding: "0 --spacing"}}>
            <div>{apy}%</div>
            <small>APY</small>
          </Flex>
          <Flex column alignCenter justifyBetween style={{padding: "0 --spacing"}}>
            <div>10000000</div>
            <small>TVL</small>
          </Flex>
          <Flex column alignCenter justifyBetween style={{padding: "0 var(--spacing)"}}>
            <a onClick={()=>this.store.openFooter("Deposit")}>Deposit</a>
            <a onClick={()=>this.store.openFooter("Withdraw")}>Withdraw</a>
          </Flex>
      </Flex>
      {footerIsOpen && <footer>
        <Close onClick={()=>this.store.closeFooter()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25">
              <g fill="none" fillRule="evenodd">
                  <g fill="var(--color)">
                      <path d="M1403.075 260.659L1400.695 258.28 1391.177 267.798 1381.659 258.28 1379.28 260.659 1388.798 270.177 1379.28 279.695 1381.659 282.075 1391.177 272.557 1400.695 282.075 1403.075 279.695 1393.557 270.177z" transform="translate(-1379 -258)"/>
                  </g>
              </g>
          </svg>
        </Close>
        <h2>{action}</h2>
        <p></p>
        <p>How much {asset} would you like to {action}?</p>
        <div>
          <Flex wrap>
            <input style={{width: "50%", minWidth: "300px", marginRight: "var(--grid-spacing-horizontal)"}}type="number" step="0.01" placeholder={`Amount in ${asset}`} required/> 
            <div style={{width: "25%", minWidth: "180px"}}>
              <button >{action}</button>
            </div>
          </Flex>
        </div>
        <p>Wallet Balance {walletBalance}</p>
      </footer>}
    </article>
    )
  }
}

export default observer(SpActionBox)