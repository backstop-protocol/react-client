import React, {Component} from "react";
import {numm} from "../lib/Utils";
import CurrencyBox from "./CurrencyBox";
import Etherium from "../assets/etherium.svg";
import Deposit from "./action-panels/Deposit";
import Withdraw from "./action-panels/Withdraw";
import {calcNewBorrowLimitAndLiquidationPrice} from "../lib/bInterface";

export default class EtheriumBox extends Component {

    formatValue(userInfo) { return userInfo?numm(userInfo.bCdpInfo.ethDeposit, 4) : 0; }
    calculateUSD(userInfo) { return userInfo?numm(userInfo.bCdpInfo.ethDeposit * userInfo.miscInfo.spotPrice, 2) : 0 }
    borrowLimit(userInfo, value) { return userInfo?numm(userInfo.bCdpInfo.daiDebt / value * 100, 2, 100) : 0 }

    render() {

        const {userInfo, onPanelAction, onOpenPanel, showConnect} = this.props;

        return (
            <CurrencyBox userInfo={userInfo} title={"ETH Locked"} currency={"ETH"} icon={Etherium} currencyValue={userInfo?userInfo.bCdpInfo.ethDeposit:0} showConnect={showConnect}
                         formatValue={this.formatValue} calculateUsd={this.calculateUSD} borrowLimit={this.borrowLimit} onPanelAction={onPanelAction}
                          actions={{ Deposit, Withdraw }} />
        )
    }
}
