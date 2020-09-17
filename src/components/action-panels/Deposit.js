import React, {Component} from "react";

export default class Deposit extends Component {

    name = "Deposit";
    action = "deposit";
    actioning = "Depositing";

    constructor(props) {
        super(props);

        this.state = {
            exceeding : false,
            val : ''
        }
    }


    doAction = () => {
        const {exceeding, val} = this.state;
        if (exceeding || !val*1) return false;

        this.props.doPanelAction(this.action, this.input.value, this.actioning)
    };

    onChange = (e) => {
        const {userInfo} = this.props;
        const val = e.target.value;
        this.setState({exceeding : (val*1 > userInfo.userWalletInfo.ethBalance), val });
    };

    render() {

        const {exceeding, val} = this.state;

        return (
            <div className="currency-action-panel">
                <h2>Deposit</h2>
                <p>How much ETH would you like to deposit?</p>
                    <div className="currency-input">
                        <div className="tooltip-container">
                            <input type="number" onChange={this.onChange} placeholder="Amount in ETH" ref={e => this.input = e} />
                            {exceeding &&
                            <div className="warning tooltip bottom">
                                <i> </i>
                                Amount Exceeds your wallet balance
                            </div>}
                        </div>
                        <button className={(exceeding || !(val*1))?'disabled':''} onClick={this.doAction}>{this.name}</button>
                    </div>
            </div>
        )
    }
}
