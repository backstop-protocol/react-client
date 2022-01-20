import React, { Component } from "react";
import {observer} from "mobx-react"
import Flex, {FlexItem} from "styled-flex-component"
import styled from "styled-components"
import { makeAutoObservable, runInAction, observable} from "mobx"
import Logo from "./Logo";
import userStore from "../../stores/user.store"
import TermsOfUseContent from "../../components/TermsOfUseContent"
import {Close} from "../../components/style-components/Buttons"
import {walletTypes} from "../../wallets/Wallets"
import ConnectButton from "./ConnectButton"
import TermsButton from "./TermsButton"

class Navbar extends Component {

  selectWallet (walletType) {
    userStore.selectWallet(walletType)
    window.toggleModal("wallet-select-modal")
  }

  render() {
    const { loggedIn, user, connecting } = userStore
    let btnText = ""
    if(user){
      btnText = user
    } else if (connecting){
      btnText = "Connecting"
    } else {
      btnText = "Connect"
    }
    
    return (
      <div>
        <div className="container">
          <nav>
            <ul>
              <li>        
                <Logo />
              </li>
            </ul>
            <ul>
              <li>
                <TermsButton/>
              </li>
              <li>
                <ConnectButton/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default observer(Navbar)