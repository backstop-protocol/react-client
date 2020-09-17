import React, {Component} from "react";
import ViewIcon from "../../assets/view-icon.svg";
import BIcon from "../../assets/b-icon.svg";

export default class Deposit extends Component {

    render() {

        const {actioning, value, currency} = this.props;

        return (
            <div className="currency-action-panel centered">
                <h3>
                    <img className="loading-indicator" src={BIcon} />

                    <span>{actioning} {value} {currency}...</span></h3>
                <div className="view-button">
                    <a href="#">
                        <span>View</span>
                        <img src={ViewIcon} />
                    </a>
                </div>
            </div>
        )
    }
}
