import React, {Suspense} from "react";
import "./style.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AppError from "./components/AppError";
import NotificationsContainer from "./components/style-components/NotificationsContainer";
import AppAlert from "./components/AppAlert";
import ModalContainer from "./components/ModalContainer"
import {observer} from "mobx-react"
import routerStore from "./stores/router.store"
import { createBrowserHistory } from "history";
import styled from "styled-components"
import * as qs from "qs";

const browserHistory = createBrowserHistory();
routerStore.setRouteProps(browserHistory)

const Hundred = React.lazy(() => import("./containers/Hundred"));
const TermsOfUse = React.lazy(() => import("./containers/Terms"));

function renderPage (props, PageComponent) {
  return (
    <Suspense fallback={<div></div>}>
        <PageComponent {...props}/> 
    </Suspense>
  )
}

const App = observer(() => {
  const { history } = routerStore.routeProps;
  const {search, pathname} = history.location
  const params = qs.parse(search, { ignoreQueryPrefix: true })
  return (
    <div className={params.hideNav ? "App hide-nav" : "App"}>
      <link rel="stylesheet" href="pico.min.css"/>
      <link rel="stylesheet" href="pico.custom.css"/>
      <NotificationsContainer>
        <AppError />
        <AppAlert />
      </NotificationsContainer>
      <ModalContainer></ModalContainer>
        <Router history={browserHistory}>
          {/* Default route */}
            <Route exact path="/" render={props =>(renderPage(props, Hundred))} />
            <Route exact path="/terms" render={props =>(renderPage(props, TermsOfUse))} />

        </Router>
    </div>
  );
})

export default App;
