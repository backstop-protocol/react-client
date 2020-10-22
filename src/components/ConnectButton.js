import Web3 from "web3";
// import * as ApiHelper from "../lib/ApiHelper";
import React, { Component } from "react";
import EventBus from '../lib/EventBus';

let web3;

function increaseABit(number) {
  return parseInt(1.1 * Number(number));
}

export default class ConnectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      accounts: null,
    };
  }

  connect = async () => {
    if(typeof window.ethereum == 'undefined') {
        // error bus
        EventBus.$emit("app-error","Meta Mask is not connected");
        return false;
    }

    if (this.state.loggedIn) return false;

    web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    const networkType = await web3.eth.net.getId();
    if(parseInt(networkType) !== parseInt(0x2a)
       && parseInt(networkType) !== parseInt(0x1)) {
         console.log(networkType)
         EventBus.$emit("app-error","Only Mainnet and Kovan testnet are supported");
         return false;
    }

    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

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
    this.setState({ loggedIn: true, accounts });
    const user = accounts[0];

    if (this.props.onConnect) {
      this.props.onConnect(web3, web3.utils.toChecksumAddress(user));
    }
  };

  render() {
    const { loggedIn, accounts } = this.state;

    return (
      <div>
        {loggedIn ? (
          <div className={"connect-button" + (loggedIn ? " active" : "")}>
            <div className="btn-inner">
              <span title={accounts}>{accounts}</span>
            </div>
          </div>
        ) : (
          <div className={"terms-wrapper"}>
            <div className="term-text-btn">
              <span>
                By using bprotocol, you agree to the{" "}
                <a
                  onClick={() => this.props.history.push(`/app/terms`)}
                  style={{
                    color: "#119349",
                    fontStyle: "italic",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  Terms and Conditions
                </a>
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
