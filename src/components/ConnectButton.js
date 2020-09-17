import Web3 from "web3";
// import * as ApiHelper from "../lib/ApiHelper";
import React, {Component} from "react";
let web3;

function increaseABit(number) {
    return parseInt(1.1 * Number(number));
}

export default class ConnectButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn : false,
            accounts : null
        }
    }

    connect = () => {

        if (this.state.loggedIn) return false;

        web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(this.handleAccountsChanged)
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
    };

    handleAccountsChanged = async (accounts) => {
        this.setState({loggedIn: true, accounts});
        const user = accounts[0];

        if (this.props.onConnect) {
            this.props.onConnect(web3, user);
        }
    };

    render() {

        const {loggedIn, accounts} = this.state;

        return (
        <div onClick={this.connect} className={'connect-button' + (loggedIn?' active':'')}>
            <div className="btn-inner">
            {loggedIn ?
                <span title={accounts}>{accounts}</span>
                :
                <span>Connect</span>
            }
            </div>
        </div>
        );
    }
}
