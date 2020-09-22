import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Dai from "../assets/dai.svg";
import CurrencyBox from "./CurrencyBox";
import Repay from "./action-panels/Repay";
import Borrow from "./action-panels/Borrow";

export default class DaiBox extends Component {


    calculateUSD(userInfo) { return userInfo?numm(userInfo.bCdpInfo.daiDebt, 2):0; }
    formatValue(userInfo) { return userInfo?numm(userInfo.bCdpInfo.daiDebt, 2):0; }

    render() {
        const {userInfo, onPanelAction} = this.props;

        return (
            <CurrencyBox userInfo={userInfo} title={"Dai Debt"} currency={"DAI"} icon={Dai} currencyValue={userInfo?userInfo.bCdpInfo.daiDebt:0} formatValue={this.formatValue}
                                     calculateUsd={this.calculateUSD} onPanelAction={onPanelAction} actions={{ Borrow, Repay }} />
        )
    }
}
