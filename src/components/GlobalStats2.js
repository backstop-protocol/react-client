import React, {Component} from "react";
import InfoIcon from "../assets/i-icon.svg";
import DollarIcon from "../assets/bp-icon-gold.svg";
import Pulser from "./Pulser";
import Ticker from "./Ticker";
import Tooltip from "./Tooltip";
import {numm} from "../lib/Utils";
import {observer} from "mobx-react"
import compoundStore from "../stores/compound.store"
import MainCompStore from "../stores/main.comp.store"
import bproStore from "../stores/bpro.store"
import {toNDecimals} from "./GlobalStats"
import AnimateNumberChange from "./style-components/AnimateNumberChange"
import {SmallButton} from "./style-components/Buttons"
import EventBus from "../lib/EventBus"
import BproClaimModal from './modals/BproClaimModal'

class GlobalStats2 extends Component {

    showClaimBproPopup () {
        const noWrapper = true
        const claimProps = {
            header: "Claim BPRO",
            balance: "0.987654321",
            data: [
                {label: "Wallet Balance", number: "0.6779869"},
                {label: "Unclaimable Balance", number: "0.6779869"},
                {label: "Claimable Balance", number: "0.6779869"},
            ],
        }
        EventBus.$emit('show-modal', <BproClaimModal {...claimProps} />, noWrapper);
    }

    render() {

        let {jarBalanceEth} = this.props;
        const tooltipTxt = "Total proceeds to be distributed"
        const jarBalanceUsd = MainCompStore.jar
        const totalRating = compoundStore.totalScore
        const userScore = compoundStore.userScore

        return (
            <div className="overlay-container">
                <div className={`global-stats even `}>
                    <div className="stats">
                        <div className="left">
                            <h2>
                                Jar Balance
                                <span className="tooltip-container">
                                    <Tooltip>{tooltipTxt}</Tooltip> 
                                    <img className="info-icon" src={InfoIcon} />
                                </span>
                            </h2>
                            <div className="value">
                                $<span className="ticker">{jarBalanceUsd}</span>
                            </div>
                            <h2 style={{margin: "7px 0", marginLeft: "-6px"}}>
                                <span style={{marginRight: "5px"}}>User cScore </span>
                                <span> <Ticker small={true} value={toNDecimals(bproStore.cScore, 9)} primary={5} /></span>
                            </h2>
                        </div>
                        <div className="right">
                            <h2>BPRO Balance
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
                            <SmallButton style={{margin: "7px 0"}} onClick={this.showClaimBproPopup}>CLAIM</SmallButton>
                        </div>
                    </div>
                    <div className="image-container">
                        <Pulser />
                        <img src={DollarIcon} className="dollar-icon floating centered" />
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(GlobalStats2)
