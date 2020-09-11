import React, {Component} from "react";

export default class GlobalStats extends Component {


    render() {

        const {userInfo} = this.props;

        return (
            <div className="global-stats even">
                <div className="left">
                    <h2>Jar Balance</h2>
                    <div className="value">
                        ${userInfo.userRatingInfo.userRating}
                    </div>
                </div>
                <div className="right">
                    <h2>User Rating</h2>
                    <div className="value">
                        {userInfo.userRatingInfo.jarSize}
                    </div>
                </div>
            </div>
        )
    }
}
