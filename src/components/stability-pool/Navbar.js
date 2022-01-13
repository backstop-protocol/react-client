import React, { Component } from "react";
import {observer} from "mobx-react"
import Flex, {FlexItem} from "styled-flex-component"
import styled from "styled-components"
import { makeAutoObservable, runInAction, observable} from "mobx"
import Logo from "./Logo";
import userStore from "../../stores/user.store"

class Navbar extends Component {

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
      <div className="container">
      <nav>
        <ul>
          <li>        
            <Logo />
          </li>
        </ul>
        <ul>
          <li>
            <a href="/terms" className="secondary">
              Terms of service
            </a>
          </li>
          <li>
            <button
              onClick={userStore.connect}
              style={{
                width: "200px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }} 
              aria-busy={connecting} 
              className="contrast outline">
                {btnText}
              </button>
          </li>
        </ul>
      </nav>
      </div>
    )
  }
}

export default observer(Navbar)