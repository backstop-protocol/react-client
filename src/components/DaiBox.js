import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Dai from "../assets/dai.svg";
import CurrencyBox from "./CurrencyBox";
import Repay from "./action-panels/Repay";
import Borrow from "./action-panels/Borrow";
import {observer} from "mobx-react"
import userStore from "../stores/user.store"

class DaiBox extends Component {

    formatValue(userInfo) { return userInfo?numm(userInfo.bCdpInfo.daiDebt, 2):0; }
    calculateUSD(userInfo) { return userInfo?numm(userInfo.bCdpInfo.daiDebt, 2):0; }
    borrowLimit(userInfo, value, value2) { return userInfo?numm((userInfo.bCdpInfo.daiDebt+value2) / userInfo.bCdpInfo.maxDaiDebt*100, 2, 100) : 0 }

    render() {
        const {userInfo, onPanelAction, stabilityFee} = this.props;
        const {showConnect} = userStore

        return (
            <CurrencyBox userInfo={userInfo} title={"DAI Debt"} currency={"DAI"} icon={Dai} showConnect={showConnect}
                         formatValue={this.formatValue} calculateUsd={this.calculateUSD} borrowLimit={this.borrowLimit} onPanelAction={onPanelAction}
                         actions={{ Borrow, Repay }} stabilityFee={stabilityFee}/>
        )
    }
}

export default observer(DaiBox)
