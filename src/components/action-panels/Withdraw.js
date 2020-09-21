import React, {Component} from "react";
import {validateDeposit, validateWithdraw} from "../../lib/Actions";

export default class Withdraw extends Component {

    name = "Withdraw";
    action = "withdraw";
    actioning = "Withdrawing";

    constructor(props) {
        super(props);

        this.state = {
            val : '',
            invalid : false,
            error: '',
        }
    }

    validate = async (val) => {
        const ok = await validateWithdraw(val);

        let error = '';
        if (!ok[0]) error = ok[1];

        this.setState({invalid: !ok[0], error});
        return ok;
    };


    doAction = () => {
        const {invalid, val} = this.state;
        if (invalid || !val*1) return false;

        this.props.onPanelAction(this.action, this.input.value, this.actioning)
    };

    onChange = (e) => {
        const val = e.target.value;
        this.setState({val});
        this.props.onPanelInput(val);
        this.validate(val);
    };

    render() {

        const {invalid, val, error} = this.state;

        return (
            <div className="currency-action-panel">
                <h2>Withdraw</h2>
                <p>How much ETH would you like to withdraw?</p>
                <div className="currency-input">
                    <div className="tooltip-container">
                        <input type="number" onChange={this.onChange} placeholder="Amount in ETH" ref={e => this.input = e} />
                        {error &&
                        <div className="warning tooltip bottom">
                            <i> </i>
                            {error}
                        </div>}
                    </div>
                    <button className={(invalid || !(val*1))?'disabled':''} onClick={this.doAction}>{this.name}</button>
                </div>
            </div>
        )
    }
}
