import React, {Component} from "react";
import {numm} from "../../lib/Utils";

export default class Deposit extends Component {

    name = "Withdraw";

    render() {

        const {userInfo, title, icon, actions} = this.props;

        return (
            <div className="currency-action-panel">
                <h2>Withdraw</h2>
                <p>How much ETH would you like to withdraw?</p>
                <div className="currency-input">
                    <input type="number" placeholder="Amount in ETH" />
                    <button>Withdraw</button>
                </div>
            </div>
        )
    }
}
