import React, {Component} from "react";
import {numm} from "../../lib/Utils";

export default class Deposit extends Component {

    name = "Repay";

    render() {

        const {userInfo, title, icon, actions} = this.props;

        return (
            <div className="currency-action-panel">
                <h2>Repay</h2>
                <p>How much DAI would you like to repay?</p>
                <div className="currency-input">
                    <input type="number" placeholder="Amount in DAI" />
                    <button>Borrow</button>
                </div>
            </div>
        )
    }
}
