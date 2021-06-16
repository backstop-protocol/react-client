import React, {Component} from "react";
import {numm, symbolToDisplayDecimalPointMap as symbol2decimal} from "../lib/Utils";
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
        return numm(userInfo.collaeralDeposited, symbol2decimal[this.props.symbol]); 
    }

    calculateUSD = (userInfo) => { 
        if(!userInfo){ 
            return 0
        }
        return numm(userInfo.collaeralDeposited * userInfo.miscInfo.spotPrice, symbol2decimal['USD'])
    }

    borrowLimit (userInfo, value) { 
        return userInfo?numm(userInfo.bCdpInfo.daiDebt / value * 100, 2, 100) : 0 
    }

    render() {

        const {userInfo, onPanelAction, onOpenPanel, symbol} = this.props;
        const {showConnect} = userStore
         
        return (
            <CurrencyBox userInfo={userInfo} title={symbol + " Locked"} currency={symbol} showConnect={showConnect}
                         formatValue={this.formatValue} calculateUsd={this.calculateUSD} borrowLimit={this.borrowLimit} onPanelAction={onPanelAction}
                          actions={{ Deposit, Withdraw }} />
        )
    }
}

export default observer(EtheriumBox)