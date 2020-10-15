import React, {Component} from "react";
import InfoIcon from '../assets/i-icon.svg';
import DollarIcon from '../assets/dollar-icon.svg';
import Pulser from "./Pulser";
import Ticker from "./Ticker";
import Tooltip from "./Tooltip";
import {numm} from "../lib/Utils";

const ratingFactor = 300000;

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

        if (!this.state.currentRating) {
            clearInterval(this.state.ratingInterval);
            const interval = setInterval(this.updateUserRating, 3000);

            this.setState({ratingProgress: parseFloat(userInfo.userRatingInfo.userRatingProgressPerSec) / ratingFactor});
            this.setState({currentRating: parseFloat(userInfo.userRatingInfo.userRating / ratingFactor).toFixed(7)});
        }

        const currRatingProgress = parseFloat(userInfo.userRatingInfo.userRatingProgressPerSec) / ratingFactor;
        if (this.state.ratingProgress !== currRatingProgress) {
            clearInterval(this.state.ratingInterval);
            const interval = setInterval(this.updateUserRating, 3000);

            this.setState({ratingProgress: currRatingProgress});
            this.setState({currentRating: parseFloat(userInfo.userRatingInfo.userRating / ratingFactor).toFixed(7)});
        }
    }

    updateUserRating = () => {
        const currentRating = this.state.currentRating;
        const nextRating = parseFloat(currentRating * 1 + this.state.ratingProgress * 3);
        this.setState({currentRating: nextRating.toFixed(7)});
    };

    render() {

        const {userInfo} = this.props;
        const {currentRating} = this.state;

        return (
            <div className="global-stats even">
                <div className="stats">
                    <div className="left">
                        <h2>
                            Jar Balance
                            <span className="tooltip-container">
                                <Tooltip>Jar Balance</Tooltip>
                                <img className="info-icon" src={InfoIcon} />
                            </span>
                        </h2>
                        <div className="value">
                            $<Ticker value={userInfo?(userInfo.userRatingInfo.jarBalance === 0 ? 10000 : userInfo.userRatingInfo.jarBalance * userInfo.miscInfo.spotPrice) :10000} />
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
                            <Ticker value={userInfo?currentRating:0} primary={5} />
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


