import React, {Component} from "react";

export default class Repay extends Component {

    name = "Repay";
    action = "repay";
    actioning = "Repaying";

    constructor(props) {
        super(props);

        this.state = {
            val : ''
        }
    }

    doAction = () => {
        const {val} = this.state;
        if (!val*1) return false;

        this.props.doPanelAction(this.action, val, this.actioning)
    };

    onChange = (e) => {
        const {userInfo} = this.props;
        const val = e.target.value;
        this.setState({val});
    };

    render() {

        const {exceeding, val} = this.state;

        return (
            <div className="currency-action-panel">
                <h2>Repay</h2>
                <p>How much DAI would you like to Repay?</p>
                <div className="currency-input">
                    <div className="tooltip-container">
                        <input type="number" onChange={this.onChange} placeholder="Amount in DAI" />

                    </div>
                    <button className={!(val*1)?'disabled':''} onClick={this.doAction}>{this.name}</button>
                </div>
            </div>
        )
    }
}
