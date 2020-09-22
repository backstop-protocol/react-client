import React, {Component} from "react";
import BackgroundImg from '../assets/maker-dao-background.svg';
import DollarIcon from '../assets/dollar-icon.svg';

export default class GlobalStats extends Component {


    render() {

        const {userInfo} = this.props;

        return (
            <div className="global-stats even">
                <div className="stats">
                    <div className="left">
                        <h2>Jar Balance</h2>
                        <div className="value">
                            {userInfo?userInfo.userRatingInfo.jarSize:0}
                        </div>
                    </div>
                    <div className="right">
                        <h2>User Rating</h2>
                        <div className="value">
                            ${userInfo?userInfo.userRatingInfo.userRating:0}
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <img src={BackgroundImg} />
                    <img src={DollarIcon} className="floating centered" />
                </div>
            </div>
        )
    }
}
