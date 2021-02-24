import React, {Component} from "react";
import InfoIcon from "../assets/i-icon.svg";
import DollarIcon from "../assets/dollar-icon.svg";
import Pulser from "./Pulser";
import Ticker from "./Ticker";
import Tooltip from "./Tooltip";
import {numm} from "../lib/Utils";
import {observer} from "mobx-react"
import compoundStore from "../stores/compound.store"
import MainCompStore from "../stores/main.comp.store"
import {toNDecimals} from "./GlobalStats"


// TODO: refactor this component to use main store values only 

class GlobalStats2 extends Component {

    render() {

        let {jarBalanceEth} = this.props;
        const tooltipTxt = "Total proceeds to be distributed"
        const jarBalanceUsd = MainCompStore.jar
        const totalRating = compoundStore.totalScore
        const userScore = compoundStore.userScore

        return (
            <div className="global-stats even">
                <div className="stats">
                    <div className="left">
                        <h2>
                            cJar Balance
                            <span className="tooltip-container">
                                <Tooltip>{tooltipTxt}</Tooltip> 
                                <img className="info-icon" src={InfoIcon} />
                            </span>
                        </h2>
                        <div className="value">
                            $<span className="ticker">{jarBalanceUsd}</span>
                        </div>
                    </div>
                    <div className="right">
                        <h2>User cScore
                            <span className="tooltip-container">
                                <Tooltip>
                                    <small>Total Rating</small>
                                    <h3>{totalRating}</h3>
                                </Tooltip>
                                <img className="info-icon" src={InfoIcon} />
                            </span>
                        </h2>
                        <div className="value">
                            <Ticker value={toNDecimals(userScore, 10)} primary={5} />
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <Pulser />
                    <img src={DollarIcon} className="dollar-icon floating centered" />
                </div>
            </div>
        )
    }
}

export default observer(GlobalStats2)
