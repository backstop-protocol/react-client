import React, {Component} from "react";
import {validateDeposit, validateRepay} from "../../lib/Actions";
import Tooltip from "../Tooltip";

export default class Deposit extends Component {

    name = "Deposit";
    action = "deposit";
    actioning = "Depositing";

    constructor(props) {
        super(props);

        this.state = {
            invalid : false,
            val : '',
            error : '',
        }
    }

    componentDidMount() {
    }



    validate = async (val) => {
        const ok = await validateDeposit(val);

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
        const res = this.props.onPanelInput(val);
        if (res !== false) {
            this.setState({val: res});
            this.validate(res);
        }
    };

    render() {

        const {invalid, val, error} = this.state;

        return (
            <div className="currency-action-panel">
                <h2>Deposit</h2>
                <p>How much ETH would you like to deposit?</p>
                    <div className="currency-input">
                        <div className="tooltip-container">
                            <input type="text" value={val} onChange={this.onChange} placeholder="Amount in ETH" ref={e => this.input = e} />
                            {error && <Tooltip bottom={true} className={'warning'}>{error}</Tooltip>}
                        </div>
                        <button className={(invalid || !(val*1))?'disabled':''} onClick={this.doAction}>{this.name}</button>
                    </div>
            </div>
        )
    }
}
