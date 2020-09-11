import React, {Component} from "react";

export default class Deposit extends Component {

    name = "Deposit";
    action = "deposit";

    doAction = () => {
        this.props.doPanelAction(this.action, this.input.value)
    };

    render() {

        const {userInfo, title, icon, actions} = this.props;

        return (
            <div className="currency-action-panel">
                <h2>Deposit</h2>
                <p>How much ETH would you like to deposit?</p>
                <div className="currency-input">
                    <input type="number" placeholder="Amount in ETH" ref={e => this.input = e} />
                    <button onClick={this.doAction}>{this.name}</button>
                </div>
            </div>
        )
    }
}
