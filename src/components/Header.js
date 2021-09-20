import React, {Component} from "react";
import {numm} from "../lib/Utils";
import ConnectButton from "./ConnectButton";
import GlobalStatsEmpty from "./GlobalStatsEmpty";
import BorrowLimit from "./BorrowLimit";
import Tvl from "./Tvl";
import ConnectWallet from "../assets/connect-your-wallet.svg";
import userStore from "../stores/user.store"
import {observer} from "mobx-react"
import mainStore from "../stores/main.store"
import mainCompStore from "../stores/main.comp.store"
import Tabs from "./style-components/Tabs"
import makerStoreManager, {makerStoreNames} from "../stores/maker.store"
import {ResponsiveWidthHeader, HeaderItemContainer} from "./style-components/ResponsiveContainer"

class Header extends Component {
    render() {
        const {info, onConnect, logo} = this.props;
        return (
            <div className="top-panel">
                <ResponsiveWidthHeader className="container">
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
                        <HeaderItemContainer>
                            <Tvl />
                        </HeaderItemContainer>
                        <HeaderItemContainer>
                            {info && 
                                <BorrowLimit userInfo={info} />
                            }
                            {!info &&
                                <GlobalStatsEmpty userInfo={info} />
                            }
                        </HeaderItemContainer>
                    </div>
                </ResponsiveWidthHeader>
                <div className="container">
                    <Tabs tabNames={makerStoreNames} selected={makerStoreManager.currentStore} onClick={makerStoreManager.switchStore}/>
                </div>
            </div>
        )
    }
}

export default observer(Header)
