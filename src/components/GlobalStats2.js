import React, {Component} from "react";
import InfoIcon from "../assets/i-icon.svg";
import DollarIcon from "../assets/dollar-icon.svg";
import Pulser from "./Pulser";
import Ticker from "./Ticker";
import Tooltip from "./Tooltip";
import {numm} from "../lib/Utils";
import {observer} from "mobx-react"


// TODO: refactor this component to use main store values only 

class GlobalStats2 extends Component {

    render() {

        const {jarBalanceEth, jarBalanceUsd, totalRating, userScore} = this.props;

        return (
            <div className="global-stats even">
                <div className="stats">
                    <div className="left">
                        <h2>
                            Jar Balance
                            <span className="tooltip-container">
                                <Tooltip>{jarBalanceEth} ETH</Tooltip> 
                                <img className="info-icon" src={InfoIcon} />
                            </span>
                        </h2>
                        <div className="value">
                            $<Ticker value={jarBalanceUsd} />
                        </div>
                    </div>
                    <div className="right">
                        <h2>User Score
                            <span className="tooltip-container">
                                <Tooltip>
                                    <small>Total Rating</small>
                                    <h3>{totalRating}</h3>
                                </Tooltip>
                                <img className="info-icon" src={InfoIcon} />
                            </span>
                        </h2>
                        <div className="value">
                            <Ticker value={userScore} primary={5} />
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