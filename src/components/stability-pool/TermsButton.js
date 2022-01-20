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

class TermsButton extends Component {

  render() {
    return (
      <div>
        <dialog id="terms-modal" >
          <div className="container">
          <article >
            <Close
              aria-label="Close"
              onClick={()=>window.toggleModal("terms-modal")}/>
            <h3>Terms of service</h3>
            <TermsOfUseContent/>
          </article>
          </div>
        </dialog>
        <a className="secondary"
          onClick={()=>window.toggleModal("terms-modal")}>
          Terms of service
        </a>
      </div>
    )
  }
}

export default observer(TermsButton)