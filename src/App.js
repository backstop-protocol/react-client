import React from "react";
import "./style.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import AppError from "./components/AppError";
import FAQ from "./containers/FAQ";
import TermsOfUse from "./containers/T&C";
import Risk from "./containers/Risk";

function App() {
  const [current, setCurrent] = React.useState("maker");
  const handleItemChange = (item) => {
    setCurrent(item);
  };

  return (
    <div className="App">
      <AppError />
      <Router>
        <Route exact path="/testnet" component={Dashboard} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/terms" component={TermsOfUse} />
        <Route exact path="/risk" component={Risk} />
      </Router>
    </div>
  );
}

export default App;
