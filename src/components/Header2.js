import React, {Component} from "react";
import {numm} from "../lib/Utils";
import ConnectButton from "./ConnectButton";
import GlobalStats from "./GlobalStats";
import BorrowLimit from "./BorrowLimit";
import Tvl2 from "./Tvl2";
import ConnectWallet from "../assets/connect-your-wallet.svg";
import userStore from "../stores/user.store"
import {observer} from "mobx-react"
import HeaderBorrowLimit from "../components/compound-components/HeaderBorrowLimit"
import {ResponsiveWidthHeader} from "./style-components/ResponsiveContainer"
import mainStore from "../stores/main.store"
import mainCompStore from "../stores/main.comp.store"
import {Transition} from 'react-spring/renderprops'

class Header2 extends Component {
    render() {

        const {info, onConnect, logo} = this.props;
        const {loggedIn} = userStore
        const tooltipData = {
            "Maker": `$${mainStore.tvlUsd}`,
            "Compound": `$${mainCompStore.tvl}`,
            "Accounts": `${mainCompStore.compoundAccounts}` 
        }
        return (
            <div style={{zIndex: -10}} className="top-panel">
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
                        <GlobalStats />
                        <Transition
                            initial={null}
                            items={loggedIn}
                            from={{ display: "none", opacity: 0 }}
                            enter={{ display: "initial", opacity: 1 }}
                            leave={{ display: "none", opacity: 0 }}>
                            {toggle =>
                                toggle
                                ? props => <div style={props}><HeaderBorrowLimit/></div>
                                : props => <div style={props}><Tvl2 tooltipData={tooltipData}/></div>
                            }
                        </Transition>
                    </div>
                </ResponsiveWidthHeader>
            </div>
        )
    }
}

export default observer(Header2)
