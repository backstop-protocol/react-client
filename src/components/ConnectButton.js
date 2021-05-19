/**
 * @format
 */
import React, { Component } from "react";
import EventBus from '../lib/EventBus';
import {Link} from "react-router-dom";
import {observer} from "mobx-react"
import userStore from "../stores/user.store"

function increaseABit(number) {
  return parseInt(1.1 * Number(number));
}

class ConnectButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggedIn, user } = userStore

    return (
      <div>
        {loggedIn ? (
          <div className={"connect-button" + (loggedIn ? " active" : "")}>
            <div className="btn-inner">
              <span title={user}>{user}</span>
            </div>
          </div>
        ) : (
          <div className={"terms-wrapper"}>
            <div className="term-text-btn">
              <span>
                By using bprotocol, you agree to the{" "}
                <Link 
                  to="/terms"
                  style={{
                    color: "#119349",
                    fontStyle: "italic",
                    textDecoration: "none",
                    cursor: "pointer"
                  }} 
                >
                  Terms and Conditions
                </Link>
              </span>
            </div>

            <div onClick={userStore.connect}
              className={"connect-button" + (loggedIn ? " active" : "")}
              style={{ height: 40 }}
            >
              <span className="btn-inner">Connect</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default observer(ConnectButton)
