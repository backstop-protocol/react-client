import React, {Component} from "react";
import BackgroundImg from '../assets/maker-dao-background.svg';
import DollarIcon from '../assets/dollar-icon.svg';
import Pulser from "./Pulser";
import Ticker from "./Ticker";

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
            this.setState({ratingProgress: parseFloat(userInfo.userRatingInfo.userRatingProgressPerSec) / 30000});
            this.setState({currentRating: parseFloat(userInfo.userRatingInfo.userRating / 3000000).toFixed(4)});

            clearInterval(this.state.ratingInterval);
            const interval = setInterval(this.updateUserRating, 3000);
        }

        const currRatingProgress = parseFloat(userInfo.userRatingInfo.userRatingProgressPerSec) / 300000;
        if (this.state.ratingProgress !== currRatingProgress) {
            this.setState({ratingProgress: currRatingProgress});
            this.setState({currentRating: parseFloat(userInfo.userRatingInfo.userRating / 300000).toFixed(4)});
        }
    }

    updateUserRating = () => {
        const currentRating = this.state.currentRating;
        const nextRating = parseFloat(currentRating * 1 + this.state.ratingProgress * 3);
        this.setState({currentRating: nextRating.toFixed(4)});
    };

    render() {

        const {userInfo} = this.props;
        const {currentRating} = this.state;

        return (
            <div className="global-stats even">
                <div className="stats">
                    <div className="left">
                        <h2>Jar Balance</h2>
                        <div className="value">
                            $<Ticker value={userInfo?userInfo.userRatingInfo.jarBalance === 0 ? 10000 : userInfo.userRatingInfo.jarBalance * userInfo.miscInfo.spotPrice :0} />
                        </div>
                    </div>
                    <div className="right">
                        <h2>User Rating</h2>
                        <div className="value">
                            <Ticker value={userInfo?currentRating:0} />
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <Pulser />
                    <img src={DollarIcon} className="floating centered" />
                </div>
            </div>
        )
    }
}
