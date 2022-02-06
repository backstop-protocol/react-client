import React, { Component } from "react";
import {observer} from "mobx-react"
import routerStore from "../stores/router.store"

class Vesta extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  render() {
    return (
      <iframe 
        src="/vesta-app/"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    );
  }
}

export default observer(Vesta)
