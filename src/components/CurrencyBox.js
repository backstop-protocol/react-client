import React, {Component} from "react";
import {numm} from "../lib/Utils";
import EventBus from '../lib/EventBus';
import Close from "../assets/close.svg";
import Loading from "./action-panels/Loading";
import {getLiquidationPrice} from "../lib/Actions";

export default class CurrencyBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            panel : null,
            prevPanel : null,
            loading: false,
            completed: false,
            failed: false,
            value: 0,
            actioning :'',
            hash: null
        };
    }

    showActionPanel = (panel) => {

        if (!this.props.userInfo) {
            if (this.props.showConnect) this.props.showConnect();
            return false;
        }

        if (this.state.panel && panel && panel.name === this.state.panel.name) {
            this.setState({panel : null})
        }
        else {
            this.setState({panel, value: 0, hash: null});
        }
    };

    resetPanel = () => {
        this.showActionPanel(null);
        this.setState({completed: false, loading: false, failed: false});
    };

    onCompleted = () => {
        console.log("Action completed",this.state);
        if (this.state.loading) {
            this.setState({completed: true, loading: false });
            setTimeout(this.resetPanel, 2500);
        }

    };

    onFailed = () => {
        console.log("Action failed",this.state);
        if (this.state.loading) {
            this.setState({failed: true, loading: false});
            setTimeout(this.resetPanel, 2500);
        }
    };

    onPanelAction = async (action, value, actioning, silent = false) => {
        if (!silent) {
            EventBus.$on('action-completed', this.onCompleted);
            EventBus.$on('action-failed', this.onFailed);
            this.setState({loading: true, prevPanel: this.state.panel, panel: Loading, actioning: actioning, value});
        }

        return this.props.onPanelAction(action, value, this.onHash);
    };

    onHash = (hash) => {
        this.setState({hash})
    };

    onPanelInput = (value) => {
        if (value === '') value = '0';
        value = value.replace(/^(0)+([0-9]+)/, '$2');
            if (!value.match(/^-?\d+\.?\d*$/)) {
            return false;
        }
        this.setState({value});
        return value;
    };

    render() {

        const {userInfo, title, icon, currency, actions, calculateUsd, formatValue, borrowLimit} = this.props;
        let {panel, actioning, value, loading, completed, failed, hash} = this.state;

        let CustomPanel = null;
        if (panel) {
            CustomPanel = panel;
            panel = new panel();
        }

        let liquidationPrice;
        let walletBalance;
        const ethBalance = userInfo ? parseFloat(userInfo.userWalletInfo.ethBalance).toFixed(4).toString() + " ETH" : "0 ETH";
        const daiBalance = userInfo ? parseFloat(userInfo.userWalletInfo.daiBalance).toFixed(2).toString() + " DAI" : "0 DAI";
        let valueDir = 1;
        try {

        if (panel) {
            switch (panel.name) {
                case 'Deposit':
                    liquidationPrice = getLiquidationPrice(value, 0);
                    walletBalance = ethBalance;
                    break;
                case 'Withdraw':
                    liquidationPrice = getLiquidationPrice(-value, 0);
                    walletBalance = ethBalance;
                    valueDir = -1;
                    break;
                case 'Borrow':
                    liquidationPrice = getLiquidationPrice(0, value);
                    walletBalance = daiBalance;
                    break;
                case 'Repay':
                    valueDir = -1;
                    liquidationPrice = getLiquidationPrice(0, -value);
                    walletBalance = daiBalance;
                    break;
            }
            }
        } catch (e) {
            console.log(e);
        }

        const containerClass = (panel && (!loading && !completed && !failed)? ' active':'');

        const actionPanelContainerClass =
            (panel? ' active':'') + (loading? ' loading':'') +
            (completed? ' completed':'')+ (failed? ' failed':'');

        return (
            <div className={'currency-box-container'+containerClass}>
                <div className="currency-box">
                    <div className={"currency-box-close" + (panel? ' active':'')}>
                        <img src={Close} onClick={() => this.resetPanel()} />
                    </div>
                    <div className="currency-meta">
                        <div className="currency-icon"><img src={icon} /></div>
                        <div className="currency-title">{title}</div>
                        <div className="currency-value">
                            <p>{formatValue(userInfo)} {currency}</p>
                            <small>{calculateUsd(userInfo)} USD</small>
                        </div>
                    </div>

                    <div className="currency-actions">
                        {!panel && Object.entries(actions).map(([key,v],i) => <button className="currency-action-button" key={i} onClick={() => this.showActionPanel(v)}>{key}</button>)}
                    </div>
                </div>
                <div className={'currency-action-panel-container' + actionPanelContainerClass}>
                    {panel &&
                    <CustomPanel onPanelAction={this.onPanelAction} onPanelInput={this.onPanelInput} userInfo={userInfo}
                                 actioning={actioning} value={value} currency={currency} hash={hash}
                                 completed={completed} failed={failed} />
                    }
                    {(!loading && !completed && !failed && panel) &&
                    <div className="currency-action-panel-footer">
                        <div className="even">
                            <div>
                                <label>Current Wallet Balance</label>
                                <div className="value">{walletBalance}</div>
                            </div>
                            <div>
                                <label>Liquidation Price</label>
                                <div className="value">
                                    {liquidationPrice && parseFloat(liquidationPrice[1]).toFixed(2)+' USD'}
                                </div>
                            </div>
                            <div>
                                <label>Borrow Limit</label>
                                <div className="value">
                                    {liquidationPrice &&
                                    <div>
                                        <div className="limit-bar mini">
                                        <div className="values">
                                            <label>{userInfo?numm(userInfo.bCdpInfo.daiDebt):0} DAI</label>
                                            <label>{numm(liquidationPrice[0])} DAI</label>
                                        </div>
                                        <div className="limit-bar-inner">
                                            <div className="limit-bar-track" style={{width: borrowLimit(userInfo,liquidationPrice[0], value * valueDir)+'%'}}>
                                                <span>{borrowLimit(userInfo, liquidationPrice[0], value * valueDir)+"%"}</span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}
