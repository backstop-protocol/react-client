import React, {Component} from "react";

export default class Deposit extends Component {

    render() {

        const {actioning, value, currency} = this.props;

        return (
            <div className="currency-action-panel">
                <h3>{actioning} {value} {currency}...</h3>
            </div>
        )
    }
}
