import React, {Component} from "react";
import InfoIcon from '../assets/i-icon.svg';
import DollarIcon from '../assets/dollar-icon.svg';
import Pulser from "./Pulser";
import Ticker from "./Ticker";

export default class GlobalStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRating: null,
            ratingInterval : null
        }
    }

    componentDidUpdate(prevProps, prevState, ss) {
        const {userInfo} = this.props;
        if (!userInfo) return;

        if (!this.state.currentRating) {
            clearInterval(this.state.ratingInterval);
            const interval = setInterval(this.updateUserRating, userInfo.userRatingInfo.userRatingProgressPerSec * 1000);

            this.setState({currentRating: parseFloat(userInfo.userRatingInfo.userRating / 1000).toFixed(3)});
        }


    }

    updateUserRating = () => {
        this.setState({currentRating: parseFloat(this.state.currentRating*1 + .001).toFixed(3)});
    };

    render() {

        const {userInfo} = this.props;
        const {currentRating} = this.state;

        return (
            <div className="global-stats even">
                <div className="stats">
                    <div className="left">
                        <h2>Jar Balance <img className="info-icon" src={InfoIcon} /></h2>
                        <div className="value">
                            $<Ticker value={userInfo?userInfo.userRatingInfo.jarSize:0} />
                        </div>
                    </div>
                    <div className="right">
                        <h2>User Rating <img className="info-icon" src={InfoIcon} /></h2>
                        <div className="value">
                            <Ticker value={userInfo?currentRating:0} primary={2} />
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
