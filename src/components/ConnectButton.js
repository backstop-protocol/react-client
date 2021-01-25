/**
 * @format
 */
import Web3 from "web3";
import React, { Component } from "react";
import EventBus from '../lib/EventBus';
import {Link} from "react-router-dom";
import {observer} from "mobx-react"
import userStore from "../stores/user.store"

let web3;

function increaseABit(number) {
  return parseInt(1.1 * Number(number));
}

class ConnectButton extends Component {
  constructor(props) {
    super(props);
  }

  connect = async () => {
    if(typeof window.ethereum == 'undefined') {
        // error bus
        EventBus.$emit("app-error","Meta Mask is not connected");
        return false;
    }

    if (userStore.loggedIn) return false;

    web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    const networkType = await web3.eth.net.getId();
    if(parseInt(networkType) !== parseInt(0x2a)
       && parseInt(networkType) !== parseInt(0x1)) {
         console.log(networkType)
         EventBus.$emit("app-error","Only Mainnet and Kovan testnet are supported");
         return false;
    }

    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    window.ethereum.on('accountsChanged', this.handleAccountsChanged)

    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(this.handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          EventBus.$emit("app-error","Please connect to Meta Mask");
        } else {
          EventBus.$emit("app-error",err);
        }
      });
  };

  handleAccountsChanged = async (accounts) => {
    const user = accounts[0];    
    await userStore.onConnect(web3, web3.utils.toChecksumAddress(user));// used by compound
  };

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
                  to="/app/terms"
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

            <div onClick={this.connect}
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
