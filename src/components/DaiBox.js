import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Etherium from "../assets/etherium.svg";

export default class EtheriumBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            panel : null,
        }
    }

    showActionPanel = (panel) => {
        if (this.state.panel && panel.name === this.state.panel.name) {
            this.setState({panel : null})
        }
        else {
            this.setState({panel});
        }
    };

    doPanelAction = (value) => {
        if (this.onSubmit) this.onSubmit(this.panel.name, value);
    };

    calculateUSD(userInfo) { return numm(userInfo.bCdpInfo.daiDebt, 4); }

    render() {

        const {userInfo, title, icon, actions} = this.props;
        const {panel} = this.state;
        let CustomPanel = null;
        if (panel) {
            CustomPanel = panel;
        }


        return (
            <div className="currency-box-container">
                <div className="currency-box">
                    <div className="currency-meta">
                        <div className="currency-icon"><img src={icon} /></div>
                        <div className="currency-title">{title}</div>
                        <div className="currency-value">
                            <p>{numm(userInfo.bCdpInfo.daiDebt, 4)} DAI</p>
                            <small>{this.calculateUSD(userInfo)} USD</small>
                        </div>
                    </div>
                    <div className="currency-actions">
                        {Object.entries(actions).map(([key,value],i) => <button key={i} onClick={() => this.showActionPanel(value)}>{key}</button>)}
                    </div>
                </div>
                <div className={'currency-action-panel-container' + (panel?' active':'')}>
                {panel &&
                    <CustomPanel doPanelAction={this.doPanelAction} />
                }
                </div>
            </div>
        )
    }
}
