import React, {Component} from "react";
import InfoIcon from '../assets/i-icon.svg';
import DollarIcon from '../assets/dollar-icon.svg';
import Pulser from "./Pulser";
import Ticker from "./Ticker";
import Tooltip from "./Tooltip";
import {numm} from "../lib/Utils";

const ratingFactor = 24 * 60 * 60 * 1000;
const ratingProgressTime = 3000;

function toNDecimals(number, n) {

    if(!number) return 0;
    for(let i = 0 ; i < 20 ; i++) {
        const s = parseFloat(number).toFixed(i);
        if(s.length > n) return parseFloat(s);
    }

    return n;
}


export default class GlobalStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRating: null,
            ratingProgress: null,
            ratingInterval : null
        }
    }

    componentDidUpdate(prevProps, prevState, ss) {
        const {userInfo} = this.props;
        if (!userInfo) return;

        const currRatingProgress = parseFloat(userInfo.userRatingInfo.userRatingProgressPerSec) / ratingFactor;
        if (this.state.ratingProgress !== currRatingProgress) {
            clearInterval(this.state.ratingInterval);
            const interval = setInterval(this.updateUserRating, ratingProgressTime);
            console.log("new interval", interval)
            this.setState({ratingInterval : interval});

            this.setState({ratingProgress: currRatingProgress});
            this.setState({currentRating: parseFloat(userInfo.userRatingInfo.userRating / ratingFactor)});
        }
    }

    updateUserRating = () => {
        const currentRating = this.state.currentRating;
        const nextRating = parseFloat(currentRating * 1 + 2 * this.state.ratingProgress * ratingProgressTime / 1000);
        this.setState({currentRating: nextRating});
    };

    render() {

        const {userInfo} = this.props;
        const {currentRating} = this.state;
        const defaultJarAmount = 10000
        
        return (
            <div className="global-stats even">
                <div className="stats">
                    <div className="left">
                        <h2>
                            Jar Balance
                            <span className="tooltip-container">
                                <Tooltip>{userInfo ? parseFloat(userInfo.userRatingInfo.jarBalance).toFixed(1) : 0 } ETH</Tooltip>
                                <img className="info-icon" src={InfoIcon} />
                            </span>
                        </h2>
                        <div className="value">
                            $<Ticker value={userInfo?(userInfo.userRatingInfo.jarBalance === 0 ? defaultJarAmount : parseFloat(userInfo.userRatingInfo.jarBalance * userInfo.miscInfo.spotPrice).toFixed(0)) :defaultJarAmount} />
                        </div>
                    </div>
                    <div className="right">
                        <h2>User Rating
                            <span className="tooltip-container">
                                <Tooltip>
                                    <small>Total Rating</small>
                                    <h3>{numm(userInfo?userInfo.userRatingInfo.totalRating / ratingFactor:0,2)}</h3>
                                </Tooltip>
                                <img className="info-icon" src={InfoIcon} />
                            </span>
                        </h2>
                        <div className="value">
                            <Ticker value={toNDecimals(userInfo?currentRating:0,10)} primary={5} />
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
