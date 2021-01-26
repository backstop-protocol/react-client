import React, {Component} from "react";
import {numm} from "../lib/Utils";
import ConnectButton from "./ConnectButton";
import GlobalStats2 from "./GlobalStats2";
import BorrowLimit from "./BorrowLimit";
import Tvl from "./Tvl";
import ConnectWallet from "../assets/connect-your-wallet.svg";
import userStore from "../stores/user.store"
import {observer} from "mobx-react"


class Header2 extends Component {
    render() {

        const {info, onConnect, logo} = this.props;

        return (
            <div className="top-panel">
                <div className="container">
                    <div className="split title-bar">
                        <img className="logo" src={logo} />
                        <div className="connect-container">
                            <ConnectButton onConnect={onConnect}/>
                            {(userStore.displayConnect || false)&& <div className="connect-wallet">
                                <i> </i>
                                <h3>Connect your wallet</h3>
                                <img src={ConnectWallet} />
                            </div>}
                        </div>
                    </div>
                    <div className="header-stats split">
                        <GlobalStats2 />
                        <Tvl/>
                        {/* {info && 
                            <div>Compound borrow limit</div>
                        }
                        {!info &&
                            <Tvl2/>  
                        } */}
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(Header2)
