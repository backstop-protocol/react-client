import React, {Component} from "react";

export default class Deposit extends Component {

    name = "Borrow";
    action = "borrow";
    actioning = "Borrowing";


    doAction = () => {
        this.props.doPanelAction(this.action, this.input.value, this.actioning)
    };

    render() {

        const {userInfo, title, icon, actions} = this.props;

        return (
            <div className="currency-action-panel">
                <h2>Borrow</h2>
                <p>How much DAI would you like to borrow?</p>
                <div className="currency-input">
                    <input type="number" placeholder="Amount in DAI" ref={e => this.input = e} />
                    <button onClick={this.doAction}>{this.name}</button>
                </div>
            </div>
        )
    }
}
