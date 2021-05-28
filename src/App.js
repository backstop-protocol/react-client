import React, {Suspense} from "react";
import "./style.scss";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import AppError from "./components/AppError";
import NotificationsContainer from "./components/style-components/NotificationsContainer";
import AppAlert from "./components/AppAlert";
import ModalContainer from "./components/ModalContainer"
import Sidebar from "./components/Sidebar"
import {observer} from "mobx-react"
import routerStore from "./stores/router.store"
import { createBrowserHistory } from "history";
import styled from "styled-components"

const browserHistory = createBrowserHistory();
routerStore.setRouteProps(browserHistory)


const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const Compound = React.lazy(() => import("./containers/Compound"));
const Risk = React.lazy(() => import("./containers/Risk"));
const TermsOfUse = React.lazy(() => import("./containers/Terms"));
const FAQ = React.lazy(() => import("./containers/FAQ"));

function renderPage (props, PageComponent) {
  return (
    <Suspense fallback={<div></div>}>
        <PageComponent {...props}/> 
    </Suspense>
  )
}

const App = observer(() => {
  return (
    <div className="App">
      <NotificationsContainer>
        <AppError />
        <AppAlert />
      </NotificationsContainer>
      <ModalContainer></ModalContainer>
      <Sidebar initialState="maker" />
        <Router history={browserHistory}>
          {/* Default route */}
            <Route exact path="/">
              <Redirect to="/maker"/>
            </Route>
            <Route exact path="/app">
              <Redirect to="/maker"/>
            </Route>
            <Route exact path="/maker" render={props =>(renderPage(props, Dashboard))} />
            <Route exact path="/compound" render={props =>(renderPage(props, Compound))} />
            <Route exact path="/faq" render={props =>(renderPage(props, FAQ))} />
            <Route exact path="/terms" render={props =>(renderPage(props, TermsOfUse))} />
            <Route exact path="/risk" render={props =>(renderPage(props, Risk))} />
        </Router>
    </div>
  );
})

export default App;
