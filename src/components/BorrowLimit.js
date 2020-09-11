import React, {Component} from "react";
import {numm} from "../lib/Utils";

export default class BorrowLimit extends Component {


    render() {

        const {userInfo} = this.props;

        return (
            <div className="borrow-limit">
                <h3>Borrow Limit</h3>
                <div className="limit-bar">
                    <label>0 DAI</label>
                    <div className="limit-bar-inner">
                        <div className="limit-bar-track" style={{width: (userInfo.bCdpInfo.daiDebt / userInfo.bCdpInfo.maxDaiDebt * 100)+"%"}}>
                            <span>{numm(userInfo.bCdpInfo.daiDebt / userInfo.bCdpInfo.maxDaiDebt * 100)+"%"}</span>
                        </div>
                    </div>
                    <label>{numm(userInfo.bCdpInfo.maxDaiDebt)} DAI</label>
                </div>
            </div>
        )
    }
}
