import React, {Component} from "react";
import Etherium from "../assets/etherium.svg";
import ConnectButton from "../components/ConnectButton";
import Sidebar from "../components/Sidebar";
import GlobalStats from "../components/GlobalStats";
import BorrowLimit from "../components/BorrowLimit";
import EtheriumBox from "../components/EtheriumBox";
import DaiBox from "../components/DaiBox";
import * as ApiHelper from "../lib/ApiHelper";

import Deposit from "../components/action-panels/Deposit";
import Withdraw from "../components/action-panels/Withdraw";
import Borrow from "../components/action-panels/Borrow";
import Repay from "../components/action-panels/Repay";

export default class Dashboard extends Component {

    web3 = null;

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userInfo : null,
            loggedIn: false
        }
    }

    onConnect = (web3, user) => {
        this.web3 = web3;
        this.setState({user, loggedIn: true});
        this.getUserInfo();
    };

    getUserInfo = async () => {
        let userInfo = await ApiHelper.getUserInfo(this.web3, this.state.user);
        userInfo = ApiHelper.Humanize(userInfo, this.web3);
        this.setState({userInfo});
    };

    render() {

        const {userInfo} = this.state;

        return (
            <div className="App">
                <Sidebar />
                <div className="content">
                    <div className="top-panel">
                        <div className="container">
                            <div className="split title-bar">
                                <h1>#MakerDAO</h1>
                                <ConnectButton onConnect={this.onConnect} />
                            </div>
                            {userInfo &&
                            <div className="header-stats split">
                                <GlobalStats userInfo={userInfo} />
                                <BorrowLimit userInfo={userInfo} />
                            </div>
                            }
                        </div>
                    </div>
                    {userInfo &&
                    <div className="container currency-container split">
                        <EtheriumBox
                            userInfo={userInfo} title={"ETH Locked"} icon={Etherium}
                            actions={{ "Do Deposit!" : Deposit, Withdraw }} />
                        <DaiBox
                            userInfo={userInfo} title={"DAI debt"} icon={Etherium}
                            actions={{ Borrow, Repay }} />
                    </div>}
                </div>
            </div>
        );
    }
}
