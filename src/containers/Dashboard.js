import React, {Component} from "react";
import Etherium from "../assets/etherium.svg";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EtheriumBox from "../components/EtheriumBox";
import DaiBox from "../components/DaiBox";
import * as ApiHelper from "../lib/ApiHelper";
import * as B from "../lib/bInterface";
import {doApiAction, setUserInfo} from "../lib/Actions";


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
        let userInfo = await B.getUserInfo(this.web3, this.state.user);
        const orgInfo = userInfo;
        userInfo = ApiHelper.Humanize(userInfo, this.web3);
        setUserInfo(this.state.user, this.web3, userInfo, orgInfo);
        this.setState({userInfo});
    };

    onAction = async (action, value) => {
        const res = await doApiAction(action, value);
        this.getUserInfo();
        return res;
    };

    render() {

        const {userInfo, loggedIn} = this.state;

        return (
            <div className="App">
                <Sidebar />
                <div className="content">
                    <Header info={(loggedIn && userInfo !== null) && userInfo} onConnect={this.onConnect} />

                    <div className="container currency-container split">
                        <EtheriumBox userInfo={userInfo} onPanelAction={this.onAction} />
                        <DaiBox userInfo={userInfo} title={"DAI debt"} icon={Etherium} onPanelAction={this.onAction} />
                    </div>
                </div>
            </div>
        );
    }
}
