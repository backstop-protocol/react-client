import React, {Component} from "react";

export default class Withdraw extends Component {

    name = "Withdraw";
    action = "withdraw";
    actioning = "Withdrawing";

    constructor(props) {
        super(props);

        this.state = {
            insufficient : false,
            val : ''
        }
    }


    doAction = () => {
        const {insufficient, val} = this.state;
        if (insufficient || !val*1) return false;

        this.props.doPanelAction(this.action, this.input.value, this.actioning)
    };

    onChange = (e) => {
        const {userInfo} = this.props;
        const val = e.target.value;
        this.setState({insufficient : (val*1 > userInfo.bCdpInfo.ethDeposit), val });
    };

    render() {

        const {insufficient, val} = this.state;

        return (
            <div className="currency-action-panel">
                <h2>Withdraw</h2>
                <p>How much ETH would you like to withdraw?</p>
                <div className="currency-input">
                    <div className="tooltip-container">
                        <input type="number" onChange={this.onChange} placeholder="Amount in ETH" ref={e => this.input = e} />
                        {insufficient &&
                        <div className="warning tooltip bottom">
                            <i> </i>
                            Insufficient funds
                        </div>}
                    </div>
                    <button className={(insufficient || !(val*1))?'disabled':''} onClick={this.doAction}>{this.name}</button>
                </div>
            </div>
        )
    }
}
