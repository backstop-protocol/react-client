import React, {Component} from "react";
import {numm} from "../lib/Utils";
import ConnectButton from "./ConnectButton";
import GlobalStats from "./GlobalStats";
import BorrowLimit from "./BorrowLimit";
import Logo from '../assets/logo-maker-black.svg';

export default class Header extends Component {
    render() {

        const {info, onConnect} = this.props;

        return (
            <div className="top-panel">
                <div className="container">
                    <div className="split title-bar">
                        <img className="logo" src={Logo} />
                        <ConnectButton onConnect={onConnect} />
                    </div>
                    {info &&
                    <div className="header-stats split">
                        <GlobalStats userInfo={info} />
                        <BorrowLimit userInfo={info} />
                    </div>
                    }
                </div>
            </div>
        )
    }
}
