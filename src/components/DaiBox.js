import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Dai from "../assets/dai.svg";
import CurrencyBox from "./CurrencyBox";
import Repay from "./action-panels/Repay";
import Borrow from "./action-panels/Borrow";

export default class DaiBox extends Component {


    formatValue(userInfo) { return userInfo?numm(userInfo.bCdpInfo.daiDebt, 2):0; }
    calculateUSD(userInfo) { return userInfo?numm(userInfo.bCdpInfo.daiDebt, 2):0; }
    borrowLimit(userInfo, value, value2) { return userInfo?numm((userInfo.bCdpInfo.daiDebt+value2) / userInfo.bCdpInfo.maxDaiDebt*100, 2, 100) : 0 }

    render() {
        const {userInfo, onPanelAction, showConnect} = this.props;

        return (
            <CurrencyBox userInfo={userInfo} title={"Dai Debt"} currency={"DAI"} icon={Dai} currencyValue={userInfo?userInfo.bCdpInfo.daiDebt:0} showConnect={showConnect}
                         formatValue={this.formatValue} calculateUsd={this.calculateUSD} borrowLimit={this.borrowLimit} onPanelAction={onPanelAction}
                         actions={{ Borrow, Repay }} />
        )
    }
}
