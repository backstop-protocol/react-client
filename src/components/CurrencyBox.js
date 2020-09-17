import React, {Component} from "react";
import {numm} from "../lib/Utils";
import EventBus from '../lib/EventBus';
import Close from "../assets/close.svg";
import Loading from "./action-panels/Loading";

export default class CurrencyBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            panel : null,
            prevPanel : null,
            loading: false,
            completed: false,
            failed: false,
            value: null,
            actioning :''
        };
    }

    showActionPanel = (panel) => {
        if (this.state.panel && panel && panel.name === this.state.panel.name) {
            this.setState({panel : null})
        }
        else {
            this.setState({panel});
        }
    };

    resetPanel = () => {
        this.showActionPanel(null);
        this.setState({completed: false, loading: false, failed: false});
    };

    onCompleted = () => {
        console.log("Action completed",this.state);
        this.setState({completed: true, loading: false });

        setTimeout(this.resetPanel, 2500);
    };

    onFailed = () => {
        console.log("Action failed",this.state);
        this.setState({failed: true, loading: false });

        setTimeout(this.resetPanel, 2500);
    };

    onPanelAction = async (action, value, actioning) => {
        EventBus.$on('action-completed', this.onCompleted);
        EventBus.$on('action-failed', this.onFailed);
        this.setState({loading: true, prevPanel: this.state.panel, panel: Loading, actioning: actioning, value});
        this.props.doPanelAction(action, value);
    };

    render() {

        const {userInfo, title, icon, currency, actions, calculateUsd, exceedsMax, currencyValue} = this.props;
        const {panel, actioning, value, loading, completed, failed} = this.state;

        let CustomPanel = null;
        if (panel) {
            CustomPanel = panel;
        }

        const containerClass = (panel && (!loading && !completed && !failed)? ' active':'');

        const actionPanelContainerClass =
            (panel? ' active':'') + (loading? ' loading':'') +
            (completed? ' completed':'')+ (failed? ' failed':'');

        return (
            <div className={'currency-box-container'+containerClass}>
                <div className="currency-box">
                    <div className={"currency-box-close" + (panel? ' active':'')}>
                        <img src={Close} onClick={() => this.showActionPanel(null)} />
                    </div>
                    <div className="currency-meta">
                        <div className="currency-icon"><img src={icon} /></div>
                        <div className="currency-title">{title}</div>
                        <div className="currency-value">
                            <p>{numm(currencyValue, 4)} {currency}</p>
                            <small>{calculateUsd(userInfo)} USD</small>
                        </div>
                    </div>

                    <div className="currency-actions">
                        {!panel && Object.entries(actions).map(([key,value],i) => <button key={i} onClick={() => this.showActionPanel(value)}>{key}</button>)}
                    </div>
                </div>
                <div className={'currency-action-panel-container' + actionPanelContainerClass}>
                    {panel &&
                    <CustomPanel doPanelAction={this.onPanelAction} userInfo={userInfo}
                                 actioning={actioning} value={value} currency={currency} exceedsMax={exceedsMax}
                                 completed={completed} failed={failed} />
                    }
                    {(!loading && !completed && !failed && panel) &&
                    <div className="currency-action-panel-footer">
                        <div className="even">
                            <div>
                                <label>Current Wallet Balance</label>
                                <div className="value">{parseFloat(userInfo.userWalletInfo.ethBalance).toFixed(4)} ETH</div>
                            </div>
                            <div>
                                <label>Liquidation Price</label>
                                <div className="value">

                                </div>
                            </div>
                            <div>
                                <label>Borrow Limit</label>
                                <div className="value">

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
