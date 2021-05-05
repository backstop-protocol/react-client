import React, {Component} from "react";
import InfoIcon from "../assets/i-icon.svg";
import DollarIcon from "../assets/bp-icon-gold.svg";
import Pulser from "./Pulser";
import Ticker from "./Ticker";
import Tooltip from "./Tooltip";
import {numm} from "../lib/Utils";
import mainStore from "../stores/main.store"
import bproStore from "../stores/bpro.store"
import {Observer} from "mobx-react"
import AnimateNumberChange from "./style-components/AnimateNumberChange"
import {SmallButton} from "./style-components/Buttons"
import EventBus from "../lib/EventBus"
import apyStore from "../stores/apy.store"

export function toNDecimals(number, n) {
    if(!number) return 0;
    for(let i = 0 ; i < 20 ; i++) {
        const s = parseFloat(number).toFixed(i);
        if(s.length > n) return s
    }

    return n;
}

export default class GlobalStats extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const scoreType = window.location.href.indexOf("maker") > -1 ? "mScore" : "cScore"
        const {totalBproNotInWallet} = bproStore
        return (          
        <Observer>
            {() => 
                <div className="overlay-container">
                    <div className={`global-stats even`}>
                        <div className="stats">
                            <div className="left">
                                <h2>
                                    Monthly BPRO
                                    <span className="tooltip-container">
                                        <Tooltip>The estimated amount of BPRO <br/> you will recive a month from now</Tooltip>     
                                        <img className="info-icon" src={InfoIcon} />
                                    </span>
                                </h2>
                                <div className="value">
                                    <Ticker value={toNDecimals(apyStore.apy, 5)} />
                                </div>
                                <h2 style={{margin: "7px 0", marginLeft: "-6px"}}>
                                    <span style={{marginRight: "5px"}}>User {scoreType} </span>
                                    <span> <Ticker small={true} value={toNDecimals(bproStore[scoreType], 9)} primary={5} /></span>
                                </h2>
                            </div>
                            <div className="right">
                                <h2>Accumulated BPRO
                                    <span className="tooltip-container">
                                        <Tooltip>
                                            The estimated amount of <br/> BPRO you could claim
                                            {/* <h3>{numm(bproStore.totalBproNotInWallet,2)}</h3> */}
                                        </Tooltip>
                                        <img className="info-icon" src={InfoIcon} />
                                    </span>
                                </h2>
                                <div className="value">
                                    <Ticker value={toNDecimals(bproStore.totalBproNotInWallet, 9)} primary={5} />
                                </div>
                                <SmallButton style={{margin: "7px 0"}} onClick={bproStore.showClaimBproPopup}>CLAIM</SmallButton>
                            </div>
                        </div>
                        <div className="image-container">
                            <Pulser />
                            <img src={DollarIcon} className="dollar-icon floating centered" />
                        </div>
                        <div style={{backgroundColor: "red"}} className="image-container">
                        </div>
                    </div>
                </div>
            } 
        </Observer>
        )
    }
}
