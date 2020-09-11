import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Logo from "../assets/bprotocol.svg";

export default class BorrowLimit extends Component {


    render() {

        const {userInfo} = this.props;

        return (
            <div className="sidebar">
                <img className="logo" alt="Logo" src={Logo} />
                <div className="ln"> </div>
                {(userInfo && userInfo.makerdaoCdpInfo.hasCdp === true) &&
                    <div className="cdp-convert">
                        <div className="migrate-btn">Migrate</div>
                        <p>Import your CDP<br />from MakerDAO system <br/>to B.Protocol</p>
                        <div className="even">
                            <div>
                                <small>ETH Locked</small>
                                <p>{userInfo.makerdaoCdpInfo.ethDeposit} ETH</p>
                            </div>
                            <div>
                                <small>DAI Debt</small>
                                <p>{userInfo.makerdaoCdpInfo.daiDebt} DAI</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
