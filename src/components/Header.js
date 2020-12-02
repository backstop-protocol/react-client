import React, {Component} from "react";
import {Observer} from 'mobx-react-lite'
import {toJS} from 'mobx'
import {numm} from "../lib/Utils";
import ConnectButton from "./ConnectButton";
import GlobalStats from "./GlobalStats";
import BorrowLimit from "./BorrowLimit";
import Logo from '../assets/logo-maker-black.svg';
import ConnectWallet from '../assets/connect-your-wallet.svg';
import mainStore from'../stores/main.store'

export default class Header extends Component {
    render() {

        const {info, onConnect, showConnect, history} = this.props;

        return (
            <div className="top-panel">
                <div className="container">
                    <div className="split title-bar">
                        <img className="logo" src={Logo} />
                        <div className="connect-container">
                            <ConnectButton onConnect={onConnect} history={history} />
                            {(showConnect || false)&& <div className="connect-wallet">
                                <i> </i>
                                <h3>Connect your wallet</h3>
                                <img src={ConnectWallet} />
                            </div>}
                        </div>
                    </div>
                    <div className="header-stats split">
                        <Observer>
                            {() => <GlobalStats userInfo={ toJS(mainStore.generalInfo) } /> }     
                        </Observer>
                        <BorrowLimit userInfo={info} />
                    </div>
                </div>
            </div>
        )
    }
}
