import React, {Component} from "react";
import {numm} from "../lib/Utils";
import CurrencyBox from "./CurrencyBox";
import Etherium from "../assets/etherium.svg";
import Deposit from "./action-panels/Deposit";
import Withdraw from "./action-panels/Withdraw";
import {calcNewBorrowLimitAndLiquidationPrice} from "../lib/bInterface";

export default class EtheriumBox extends Component {

    calculateUSD(userInfo) {
        return userInfo?numm(userInfo.bCdpInfo.ethDeposit * userInfo.miscInfo.spotPrice, 4):0
    }

    exceedsMax(userInfo, val) {
        return numm(userInfo.userWalletInfo.ethBalance)
    }

    liquidationPrice(userInfo) {
    }

    render() {

        const {userInfo, onPanelAction, onOpenPanel} = this.props;

        return (
            <CurrencyBox userInfo={userInfo} title={"ETH Locked"} currency={"ETH"} icon={Etherium} currencyValue={userInfo?userInfo.bCdpInfo.ethDeposit:0}
                         calculateUsd={this.calculateUSD} exceedsMax={this.exceedsMax} onPanelAction={onPanelAction}
                          actions={{ Deposit, Withdraw }} />
        )
    }
}
