import React, {Component} from "react";
import {numm} from "../lib/Utils";
import ConnectButton from "./ConnectButton";
import GlobalStats from "./GlobalStats";
import BorrowLimit from "./BorrowLimit";
import BorrowLimit2 from "./BorrowLimit2";
import Tvl2 from "./Tvl2";
import ConnectWallet from "../assets/connect-your-wallet.svg";
import userStore from "../stores/user.store"
import {observer} from "mobx-react"
import mainStore from "../stores/main.store"
import mainCompStore from "../stores/main.comp.store"
import Flex, {FlexItem} from "styled-flex-component";
import {ResponsiveWidthHeader} from "./style-components/ResponsiveContainer"

class Header extends Component {
    render() {

        const {info, onConnect, logo} = this.props;

        const tooltipData = {
            "ETH deposits": `${(mainStore.tvlEth / 1000).toFixed(2)}K`,
            "DAI debt": `${(mainStore.tvlDai / 1000000).toFixed(2)}M`,
            "Number of Vaults": `${mainStore.cdpi}`,
        }

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
                    <Flex class="header-stats split" style={{
                        paddingBottom: "40px", 
                        flexWrap: "wrap" ,
                        justifyContent: "space-around",
                        alignContent: "center"
                    }}>
                        <Flex column style={{ paddingBottom: "20px" }}>
                            <GlobalStats userInfo={info} />
                        </Flex>
                        <Flex column style={{ paddingBottom: "20px", alignItems: "center", justifyContent: "center" }}>                        {info && 
                            <BorrowLimit2 userInfo={info} />
                        }
                        {!info &&
                            <Tvl2 tooltipData={tooltipData}/>
                        }
                        </Flex>
                    </Flex>
                </ResponsiveWidthHeader>
            </div>
        )
    }
}

export default observer(Header)
