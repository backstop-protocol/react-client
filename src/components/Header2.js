import React, {Component} from "react";
import {numm} from "../lib/Utils";
import ConnectButton from "./ConnectButton";
import GlobalStats from "./GlobalStats";
import BorrowLimit from "./BorrowLimit";
import Tvl from "./Tvl";
import ConnectWallet from "../assets/connect-your-wallet.svg";
import userStore from "../stores/user.store"
import {observer} from "mobx-react"
import HeaderBorrowLimit from "../components/compound-components/HeaderBorrowLimit"
import {ResponsiveWidthHeader, HeaderItemContainer} from "./style-components/ResponsiveContainer"
import mainStore from "../stores/main.store"
import mainCompStore from "../stores/main.comp.store"
import {Transition} from 'react-spring/renderprops'

class Header2 extends Component {
    render() {

        const {info, onConnect, logo, fullPage, textLogo} = this.props;
        const {loggedIn} = userStore
        return (
            <div style={{zIndex: -10}} className="top-panel">
                <ResponsiveWidthHeader className="container" style={{paddingBottom: "30px"}}>
                    <div className="split title-bar">
                        {logo && <img className="logo" src={logo} />}
                        {textLogo && <h1 style={{fontWeight: 500}}>{textLogo}</h1>}
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
                            <GlobalStats />
                        </HeaderItemContainer>
                        {!fullPage && <HeaderItemContainer>
                            <Transition
                                initial={null}
                                items={loggedIn}
                                from={{ display: "none", opacity: 0 }}
                                enter={{ display: "initial", opacity: 1 }}
                                leave={{ display: "none", opacity: 0 }}>
                                {toggle =>
                                    toggle
                                    ? props => <div style={props}><HeaderBorrowLimit/></div>
                                    : props => <div style={props}><Tvl /></div>
                                }
                            </Transition>
                        </HeaderItemContainer>}
                    </div>
                </ResponsiveWidthHeader>
            </div>
        )
    }
}

export default observer(Header2)
