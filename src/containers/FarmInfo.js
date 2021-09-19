

import React, { Component } from "react";
import Header2 from "../components/Header2";
import {observer} from "mobx-react"
import styled from "styled-components"
import routerStore from "../stores/router.store"
import * as qs from "qs";

const Overides = styled.div`
    margin-bottom: 100px;
`

class FarmInfo extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  render() {
    const { history } = routerStore.routeProps;
    const {search, pathname} = history.location
    const params = qs.parse(search, { ignoreQueryPrefix: true })
    if(params.inIframe){
      return (
        <Overides className="content">
          <Header2
            fullPage={true}
            textLogo={"Farm Info"}
          />
        </Overides>
      );

    }
    return (
      <iframe 
        src="/farm-info/?inIframe=true&hideNav=true"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    );
  }
}

export default observer(FarmInfo)