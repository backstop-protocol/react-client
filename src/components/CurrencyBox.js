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

        EventBus.$on('action-completed', this.onCompleted);
    }

    showActionPanel = (panel) => {
        if (this.state.panel && panel && panel.name === this.state.panel.name) {
            this.setState({panel : null})
        }
        else {
            this.setState({panel});
        }
    };

    onCompleted = () => {
        console.log("Action completed");
        this.setState({loading: false, completed: true});
    };

    onPanelAction = async (action, value, actioning) => {
        this.setState({loading: true, panel: Loading, actioning: actioning, value});
        await this.props.doPanelAction(action, value);
    };

    render() {

        const {userInfo, title, icon, currency, actions, calculateUsd} = this.props;
        const {panel, actioning, value, loading, completed, failed} = this.state;

        let CustomPanel = null;
        if (panel) {
            CustomPanel = panel;
        }

        const actionPanelContainerClass =
            (panel? ' active':'') + (loading? ' loading':'') +
            (completed? ' completed':'')+ (failed? ' failed':'');

        return (
            <div className="currency-box-container">
                <div className="currency-box">
                    <div className={"currency-box-close" + (panel? ' active':'')}>
                        <img src={Close} onClick={() => this.showActionPanel(null)} />
                    </div>
                    <div className="currency-meta">
                        <div className="currency-icon"><img src={icon} /></div>
                        <div className="currency-title">{title}</div>
                        <div className="currency-value">
                            <p>{numm(userInfo.bCdpInfo.ethDeposit, 4)} {currency}</p>
                            <small>{calculateUsd(userInfo)} USD</small>
                        </div>
                    </div>

                    <div className="currency-actions">
                        {!panel && Object.entries(actions).map(([key,value],i) => <button key={i} onClick={() => this.showActionPanel(value)}>{key}</button>)}
                    </div>
                </div>
                <div className={'currency-action-panel-container' + actionPanelContainerClass}>
                    {panel &&
                    <CustomPanel doPanelAction={this.onPanelAction} actioning={actioning} value={value} currency={currency} />
                    }
                    {(!loading && !completed && !failed) &&
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
