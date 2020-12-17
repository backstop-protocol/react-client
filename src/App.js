import React from "react";
import "./style.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import AppError from "./components/AppError";
import NotificationsContainer from "./components/style-components/NotificationsContainer";
import AppAlert from "./components/AppAlert";
import FAQ from "./containers/FAQ";
import TermsOfUse from "./containers/Terms";
import Risk from "./containers/Risk";

function App() {
  const [current, setCurrent] = React.useState("maker");
  const handleItemChange = (item) => {
    setCurrent(item);
  };

  return (
    <div className="App">
      <NotificationsContainer>
        <AppError />
        <AppAlert />
      </NotificationsContainer>
      <Router>
        <Route exact path="/app" component={Dashboard} />
        <Route exact path="/app/faq" component={FAQ} />
        <Route exact path="/app/terms" component={TermsOfUse} />
        <Route exact path="/app/risk" component={Risk} />
      </Router>
    </div>
  );
}

export default App;
