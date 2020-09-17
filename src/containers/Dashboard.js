import React, {Component} from "react";
import Etherium from "../assets/etherium.svg";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EtheriumBox from "../components/EtheriumBox";
import DaiBox from "../components/DaiBox";
import * as ApiHelper from "../lib/ApiHelper";
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
        let userInfo = await ApiHelper.getUserInfo(this.web3, this.state.user);
        userInfo = ApiHelper.Humanize(userInfo, this.web3);
        setUserInfo(this.state.user, this.web3, userInfo);
        this.setState({userInfo});
    };

    onAction = async (action, value) => {
        await doApiAction(action, value);
        this.getUserInfo();
    };

    render() {

        const {userInfo, loggedIn} = this.state;

        return (
            <div className="App">
                <Sidebar />
                <div className="content">
                    <Header info={(loggedIn && userInfo !== null) && userInfo} onConnect={this.onConnect} />
                    {userInfo &&
                    <div className="container currency-container split">
                        <EtheriumBox userInfo={userInfo} doPanelAction={this.onAction} />
                        <DaiBox userInfo={userInfo} title={"DAI debt"} icon={Etherium} doPanelAction={this.onAction} />
                    </div>}
                </div>
            </div>
        );
    }
}
