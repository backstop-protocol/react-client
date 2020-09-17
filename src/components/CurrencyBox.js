import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Close from "../assets/close.svg";
import Loading from "./action-panels/Loading";

export default class CurrencyBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            panel : null,
            loading: false,
            value: null,
            actioning :''
        }
    }

    showActionPanel = (panel) => {
        if (this.state.panel && panel && panel.name === this.state.panel.name) {
            this.setState({panel : null})
        }
        else {
            this.setState({panel});
        }
    };

    onPanelAction = (action, value, actioning) => {
        this.props.doPanelAction(action, value);
        this.setState({loading: true, panel: Loading, actioning: actioning, value});
    }

    render() {

        const {userInfo, title, icon, currency, actions, calculateUsd} = this.props;
        const {panel, actioning, value} = this.state;

        let CustomPanel = null;
        if (panel) {
            CustomPanel = panel;
        }

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
                <div className={'currency-action-panel-container' + (panel?' active':'')}>
                    {panel &&
                    <CustomPanel doPanelAction={this.onPanelAction} actioning={actioning} value={value} currency={currency} />
                    }
                    <div className="currency-action-panel-footer">
                        <div className="even">
                            <div>
                                <label>Current Wallet Balance</label>
                                <div className="value">{parseFloat(userInfo.userWalletInfo.ethBalance).toFixed(4)} ETH</div>
                            </div>
                            <div>
                                <label>Liquidation Price</label>
                                <div className="value"></div>
                            </div>
                            <div>
                                <label>Borrow Limit</label>
                                <div className="value"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
