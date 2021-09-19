import React, {Suspense} from "react";
import "./style.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AppError from "./components/AppError";
import NotificationsContainer from "./components/style-components/NotificationsContainer";
import AppAlert from "./components/AppAlert";
import ModalContainer from "./components/ModalContainer"
import Sidebar from "./components/Sidebar"
import {observer} from "mobx-react"
import routerStore from "./stores/router.store"
import { createBrowserHistory } from "history";
import styled from "styled-components"
import * as qs from "qs";

const browserHistory = createBrowserHistory();
routerStore.setRouteProps(browserHistory)


const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const Compound = React.lazy(() => import("./containers/Compound"));
const Liquity = React.lazy(() => import("./containers/Liquity"));
const Risk = React.lazy(() => import("./containers/Risk"));
const TermsOfUse = React.lazy(() => import("./containers/Terms"));
const FAQ = React.lazy(() => import("./containers/FAQ"));
const FarmInfo = React.lazy(() => import("./containers/FarmInfo"));

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
      <NotificationsContainer>
        <AppError />
        <AppAlert />
      </NotificationsContainer>
      <ModalContainer></ModalContainer>
      <Sidebar initialState="maker" />
        <Router history={browserHistory}>
          {/* Default route */}
            <Route exact path="/">
              <Redirect to="/app"/>
            </Route>
            <Route exact path="/app" render={props =>(renderPage(props, Dashboard))} />
            <Route exact path="/maker" render={props =>(renderPage(props, Dashboard))} />
            <Route exact path="/compound" render={props =>(renderPage(props, Compound))} />
            <Route exact path="/liquity" render={props =>(renderPage(props, Liquity))} />
            <Route exact path="/faq" render={props =>(renderPage(props, FAQ))} />
            <Route exact path="/terms" render={props =>(renderPage(props, TermsOfUse))} />
            <Route exact path="/risk" render={props =>(renderPage(props, Risk))} />
            <Route exact path="/farm-info" render={props =>(renderPage(props, FarmInfo))} />
        </Router>
    </div>
  );
})

export default App;
