

import React, { Component } from "react";
import {observer} from "mobx-react"
import routerStore from "../stores/router.store"

class Liquity extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  render() {
    const { userInfo, userInfoUpdate, coinList } = compoundStore
    console.log("comp userInfoUpdate ", userInfoUpdate)
    return (
      <iframe 
        src="https://liquity.bprotocol.org"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    );
  }
}

export default observer(Liquity)