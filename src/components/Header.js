import React, {Component} from "react";
import {numm} from "../lib/Utils";
import ConnectButton from "./ConnectButton";
import GlobalStats from "./GlobalStats";
import BorrowLimit from "./BorrowLimit";
import Logo from '../assets/logo-maker-black.svg';
import ConnectWallet from '../assets/connect-your-wallet.svg';

export default class Header extends Component {
    render() {

        const {info, onConnect, showConnect} = this.props;

        return (
            <div className="top-panel">
                <div className="container">
                    <div className="split title-bar">
                        <img className="logo" src={Logo} />
                        <div className="connect-container">
                            <ConnectButton onConnect={onConnect} />
                            {showConnect && <div className="connect-wallet">
                                <i> </i>
                                <h3>Click to connect your wallet</h3>
                                <img src={ConnectWallet} />
                            </div>}
                        </div>
                    </div>
                    <div className="header-stats split">
                        <GlobalStats userInfo={info} />
                        <BorrowLimit userInfo={info} />
                    </div>
                </div>
            </div>
        )
    }
}