import React, {Component} from "react";

export default class Repay extends Component {

    name = "Repay";
    action = "repay";

    doAction = () => {
        this.props.doPanelAction(this.action, this.input.value)
    };

    render() {

        const {userInfo, title, icon, actions} = this.props;

        return (
            <div className="currency-action-panel">
                <h2>Repay</h2>
                <p>How much DAI would you like to repay?</p>
                <div className="currency-input">
                    <input type="number" placeholder="Amount in DAI" ref={e => this.input = e} />
                    <button onClick={this.doAction}>{this.name}</button>
                </div>
            </div>
        )
    }
}
