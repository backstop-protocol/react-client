import React, {Component} from "react";
import {isRepayUnlocked, validateRepay} from "../../lib/Actions";
import EventBus from "../../lib/EventBus";
import LoadingRing from "../LoadingRing";
import Tooltip from "../Tooltip";

export default class Repay extends Component {

    name = "Repay";
    action = "repay";
    unlockAction = "unlock";
    actioning = "Repaying";

    constructor(props) {
        super(props);

        this.state = {
            val : '',
            invalid : false,
            error: '',

            locked: true,
            unlocking: false,
        }
    }

    componentDidMount() {
        EventBus.$on('action-completed', this.onActionCompleted);
    }

    validate = async (val) => {
        const ok = await validateRepay(val);

        let error = '';
        if (!ok[0]) error = ok[1];

        this.setState({invalid: !ok[0], error});
        return ok;
    };

    onActionCompleted = (res, action) => {
        if (action === "unlock") {
            this.setState({
                unlocking: false,
                locked: false
            })
        }
    };

    doAction = async () => {
        const {val, invalid} = this.state;
        if (!val*1 || !isRepayUnlocked() || invalid) return false;
        const res = await this.props.onPanelAction(this.action, val, this.actioning)
    };

    onChange = (e) => {
        const val = e.target.value;
        const res = this.props.onPanelInput(val);
        if (res !== false) {
            this.setState({val: res});
            this.validate(res);
        }
    };

    setMax = () => {
        const {userInfo} = this.props,
        val = (Math.floor(userInfo.bCdpInfo.daiDebt*1000)/1000).toString();
        const res = this.props.onPanelInput(val);
        if (res !== false) {
            this.setState({val: res});
            this.validate(res);
        }
    };

    onUnlock = async () => {
        if (isRepayUnlocked()) return false;
        this.setState({unlocking: true});
        const res = await this.props.onPanelAction(this.unlockAction, null, "unlocking", true);
    };

    render() {

        const {invalid, error, val, unlocking} = this.state;
        const {userInfo} = this.props;

        const locked = !isRepayUnlocked();

        return (
            <div className="currency-action-panel">
                <h2>Repay</h2>
                <p>How much DAI would you like to Repay?</p>
                <div className="currency-input">
                    <div className="tooltip-container">
                        <div className="set-max" onClick={this.setMax}>Set Max</div>
                        <input type="text" value={val} onChange={this.onChange} placeholder="Amount in DAI" />
                        {error && <Tooltip bottom={true} className={'warning'}>{error}</Tooltip>}
                    </div>
                    <button className={(invalid || locked || !(val*1))?'disabled':''} onClick={this.doAction}>{this.name}</button>
                </div>
                <div className="currency-secondary-input">
                    <h3>Unlock DAI to continue</h3>
                    <div className={'tickbox'+(unlocking ? ' loading' : (locked? '':' active'))} onClick={this.onUnlock}>
                        {unlocking && <LoadingRing />}
                    </div>
                </div>
            </div>
        )
    }
}
