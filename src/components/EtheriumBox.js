import React, {Component} from "react";
import {numm} from "../lib/Utils";
import CurrencyBox from "./CurrencyBox";
import Etherium from "../assets/etherium.svg";
import Deposit from "./action-panels/Deposit";
import Withdraw from "./action-panels/Withdraw";

export default class EtheriumBox extends Component {

    calculateUSD(userInfo) { return numm(userInfo.bCdpInfo.ethDeposit * userInfo.miscInfo.spotPrice, 4) }

    render() {

        const {userInfo, doPanelAction} = this.props;

        return (
            <CurrencyBox userInfo={userInfo} title={"ETH Locked"} currency={"ETH"} icon={Etherium} calculateUsd={this.calculateUSD} doPanelAction={doPanelAction}
                          actions={{ Deposit, Withdraw }} />
        )
    }
}
