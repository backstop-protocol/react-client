import React, {Suspense} from "react";
import "./style.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppError from "./components/AppError";
import NotificationsContainer from "./components/style-components/NotificationsContainer";
import AppAlert from "./components/AppAlert";
import ModalContainer from "./components/ModalContainer"
import Sidebar from "./components/Sidebar"
import {observer} from "mobx-react"
import routerStore from "./stores/router.store"
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();
routerStore.setRouteProps(browserHistory)


const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const Compound = React.lazy(() => import("./containers/Compound"));
const Risk = React.lazy(() => import("./containers/Risk"));
const TermsOfUse = React.lazy(() => import("./containers/Terms"));
const FAQ = React.lazy(() => import("./containers/FAQ"));

function renderPage (props, PageComponent) {
  routerStore.setRouteProps(props.history)
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
            <Route exact path="/app" render={props =>(renderPage(props, Dashboard))} />
            <Route exact path="/app/maker" render={props =>(renderPage(props, Dashboard))} />
            <Route exact path="/app/compound" render={props =>(renderPage(props, Compound))} />
            <Route exact path="/app/faq" render={props =>(renderPage(props, FAQ))} />
            <Route exact path="/app/terms" render={props =>(renderPage(props, TermsOfUse))} />
            <Route exact path="/app/risk" render={props =>(renderPage(props, Risk))} />
        </Router>
    </div>
  );
})

export default App;
