import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configure as mobxConfiguration} from "mobx"

mobxConfiguration({
    enforceActions: "never", // silence mobx action warnings
})

// last resort global exception catchers
window.onError = function(message, source, lineno, colno, error) {
  console.warn(`Error: ${error.msg} @: ${error.stack}`)
  return true 
}

window.addEventListener('unhandledrejection', function (event) {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  event.preventDefault();
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// version logger
const {version} = require("../package.json")
console.log("--version: ", version)
