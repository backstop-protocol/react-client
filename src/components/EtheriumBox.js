import React, {Component} from "react";
import {numm} from "../lib/Utils";
import CurrencyBox from "./CurrencyBox";
import Etherium from "../assets/etherium.svg";
import Deposit from "./action-panels/Deposit";
import Withdraw from "./action-panels/Withdraw";
import {observer} from "mobx-react"
import userStore from "../stores/user.store"
import Web3 from "web3"
const {fromWei, toWei} = Web3.utils

class EtheriumBox extends Component {

    formatValue = (userInfo) => { 
        if(!userInfo){ 
            return 0
        }
        if(this.props.symbol === "ETH"){
            return numm(userInfo.bCdpInfo.ethDeposit, 4); 
        } else {
            return numm(userInfo.bCdpInfo.gemDeposit, 5); 
        }
    }

    calculateUSD = (userInfo) => { 
        if(!userInfo){ 
            return 0
        }
        if(this.props.symbol === "ETH"){
            return numm(userInfo.bCdpInfo.ethDeposit * userInfo.miscInfo.spotPrice, 2)
        } else {
            return numm(userInfo.bCdpInfo.gemDeposit * userInfo.miscInfo.spotPrice, 2)
        }
    }

    borrowLimit (userInfo, value) { 
        return userInfo?numm(userInfo.bCdpInfo.daiDebt / value * 100, 2, 100) : 0 
    }

    render() {

        const {userInfo, onPanelAction, onOpenPanel, symbol} = this.props;
        const {showConnect} = userStore
         
        const currencyValue = userInfo ? userInfo.bCdpInfo.ethDeposit : 0 
        return (
            <CurrencyBox userInfo={userInfo} title={symbol + " Locked"} currency={symbol} currencyValue={currencyValue} showConnect={showConnect}
                         formatValue={this.formatValue} calculateUsd={this.calculateUSD} borrowLimit={this.borrowLimit} onPanelAction={onPanelAction}
                          actions={{ Deposit, Withdraw }} />
        )
    }
}

export default observer(EtheriumBox)