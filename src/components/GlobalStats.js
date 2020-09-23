import React, {Component} from "react";
import BackgroundImg from '../assets/maker-dao-background.svg';
import DollarIcon from '../assets/dollar-icon.svg';

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
            // clearInterval(this.state.ratingInterval);
            // const interval = setInterval(this.updateUserRating, userInfo.userRatingInfo.userRatingProgressPerSec * 1000);

            this.setState({currentRating: parseFloat(userInfo.userRatingInfo.userRating / 1000).toFixed(3)});
        }


    }

    updateUserRating = () => {
        this.setState({currentRating: this.state.currentRating + 1});
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
                            ${userInfo?userInfo.userRatingInfo.jarSize:0}
                        </div>
                    </div>
                    <div className="right">
                        <h2>User Rating</h2>
                        <div className="value">
                            {userInfo?currentRating:0}
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <img src={BackgroundImg} className="background-image" />
                    <img src={DollarIcon} className="floating centered" />
                </div>
            </div>
        )
    }
}
