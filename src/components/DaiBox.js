import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Dai from "../assets/dai.svg";
import CurrencyBox from "./CurrencyBox";
import Repay from "./action-panels/Repay";
import Borrow from "./action-panels/Borrow";

export default class DaiBox extends Component {


    calculateUSD(userInfo) { return numm(userInfo.bCdpInfo.daiDebt, 4); }

    render() {
        const {userInfo, doPanelAction} = this.props;

        return (
            userInfo && <CurrencyBox userInfo={userInfo} title={"Dai Debt"} icon={Dai} calculateUsd={this.calculateUSD} doPanelAction={doPanelAction}
                         actions={{ Borrow, Repay }} />
        )
    }
}
