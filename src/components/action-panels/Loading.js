import React, {Component} from "react";
import ViewIcon from "../../assets/view-icon.svg";
import BIcon from "../../assets/b-icon.svg";
import VIcon from "../../assets/v-icon.svg";
import XIcon from "../../assets/red-x-icon.svg";
import FragLoader from "../FragLoader";

export default class Deposit extends Component {

    render() {

        const {actioning, value, currency, completed, failed, hash} = this.props;

        const icon = completed ? VIcon : (failed ? XIcon : BIcon);
        const iconClsName = (completed || failed ? 'result':'loading-indicator');

        const resultText = completed ? 'Completed' : (failed ? 'Failed' : '');

        return (
            <div className="currency-action-panel centered">
                <h3>
                    {completed || failed && <img className={iconClsName} src={icon} />}
                    {(!completed && !failed) && <FragLoader />}

                    <span>{actioning} {value} {currency}... {resultText}</span></h3>
                {(!failed && hash) && <div className="view-button">
                    <a href={'https://kovan.etherscan.io/tx/'+hash} target="_blank">
                        <span>View</span>
                        <img src={ViewIcon} />
                    </a>
                </div>}
            </div>
        )
    }
}
