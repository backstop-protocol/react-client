import React, {Component} from "react";
import {numm} from "../lib/Utils";

export default class BorrowLimit extends Component {


    render() {

        const {userInfo} = this.props;

        return (
            <div className="borrow-limit">
                <h3>Borrow Limit</h3>
                <div className="limit-bar">
                    <label>{userInfo?numm(userInfo.bCdpInfo.daiDebt):0} DAI</label>
                    <div className="limit-bar-inner">
                        <div className="limit-bar-track" style={{width: (userInfo && userInfo.bCdpInfo.maxDaiDebt ? (userInfo.bCdpInfo.daiDebt / userInfo.bCdpInfo.maxDaiDebt * 100):0)+"%"}}>
                            <span>{(userInfo && userInfo.bCdpInfo.maxDaiDebt?numm(userInfo.bCdpInfo.daiDebt / userInfo.bCdpInfo.maxDaiDebt * 100):0)+"%"}</span>
                        </div>
                    </div>
                    <label>{userInfo?numm(userInfo.bCdpInfo.maxDaiDebt):0} DAI</label>
                </div>
            </div>
        )
    }
}