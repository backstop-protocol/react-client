import React, {Component} from "react";
import {numm} from "../lib/Utils";
import EventBus from '../lib/EventBus';
import Close from "../assets/close.svg";
import Loading from "./action-panels/Loading";
import {getLiquidationPrice} from "../lib/Actions";
import CurrencyBoxHeader from "./CurrencyBoxHeader"
import styled from "styled-components"
import {device} from "../screenSizes";
import mainStore from "../stores/main.store"
import {observer} from "mobx-react"
import AnimateNumberChange from "./style-components/AnimateNumberChange"
import {chop, symbolToDisplayDecimalPointMap as symbol2decimal} from "../lib/Utils"

const Overider = styled.div`
    .currency-meta{
        max-width: calc(100% - 130px)
    }
    .currency-box{
        height: 152px;
    }

    .currency-icon{
        max-width: 56px;
        min-width: 46px;
    }
    .currency-actions{
        margin-left: 20px;
    }
    @media ${device.mobile} {
        .currency-action-button{
            transition: all 0.3s ease-in-out;
            z-index: -1;
            opacity: 0;
        }
        .currency-value{
            opacity: 1;
        }

        &:hover{
            .currency-action-button{
                transition: all 0.3s ease-in-out;
                z-index: 1;
                opacity: 1;
            }
            .currency-value{
                opacity: 0;
            }
        }
    }

    .currency-value{
        width 100%;
        text-align: left;
        padding-left: 20px;
        p{
            margin-top: 20px; 
            margin-bottom:0;
            font-size: 20px;
        }
    }

    .currency-title{
        white-space: nowrap;
        font-size: 20px;
        width: 85px;
    }

    .stability-fee{
        font-size: 20px;
        font-family: "NeueHaasGroteskDisp Pro Md";
        letter-spacing: 1.1px;
        min-width: 70px;
        margin-left: 20px;
    }

    @media ${device.largeLaptop} {
        .currency-box-container{
            max-width: 560px;
        }
        .currency-meta{
            max-width: calc(100% - 120px)
        }
        .currency-title{
            white-space: nowrap;
            width: 77px;
            font-size: 18px;
        }
        .stability-fee{
            font-size: 18px;
            width: 70px;
        }
        .currency-value{
            p{
                margin-top: 20px;
                margin-bottom: 0;
                font-size: 18px;
            }
            small{
                font-size: 13px;
            }
        }
        .currency-action-button{
            width: 100px;
            font-size: 13px;
        }
    }
    @media ${device.laptop} {
        .currency-icon{
            max-width: 56px;
            min-width: 40px;
        }
        .currency-box-container{
            max-width: 500px;
        }
        .currency-title{
            white-space: nowrap;
            width: 73px;
            font-size: 17px;
            margin-left: 7.5px;
        }

        .stability-fee{
            font-size: 17px;
            margin-left: 7.5px;
        }

        .currency-value{
            padding-left: 7.5px;
            p{
                margin-top: 20px;
                margin-bottom: 0;
                font-size: 17px;
            }
            small{
                font-size: 12px;
            }
        }
        .currency-action-button{
            width: 94px;
            font-size: 12px;
        }

        .currency-meta{
            max-width: calc(100% - 114px)
        }
    }

`

class CurrencyBox extends Component {

    constructor(props) {
        super(props);
        this.boxRef = React.createRef();
        this.state = {
            panel : null,
            prevPanel : null,
            loading: false,
            completed: false,
            failed: false,
            value: 0,
            actioning :'',
            hash: null
        };
    }

    showActionPanel = (panel) => {

        if (!this.props.userInfo) {
            if (this.props.showConnect) this.props.showConnect();
            return false;
        }

        if (this.state.panel && panel && panel.name === this.state.panel.name) {
            this.setState({panel : null})
        }
        else {
            this.setState({panel, value: 0, hash: null});
            if(panel){
                this.scrollPannelInToView()
            }

        }
    };

    scrollPannelInToView = () => {
        const {bottom} = this.boxRef.current.getBoundingClientRect();
        const theBottomOfTheActionBoxIsNotInView = bottom + 300 > window.innerHeight
        if(theBottomOfTheActionBoxIsNotInView){
            // wait for it to open a bit then start scrolling it in to the  view
            setTimeout(()=> {
                this.boxRef.current.scrollIntoView({behavior: "smooth", block: "center"});
            }, 200)
        }
    }

    resetPanel = () => {
        this.showActionPanel(null);
        this.setState({completed: false, loading: false, failed: false});
    };

    onCompleted = () => {
        console.log("Action completed",this.state);
        if (this.state.loading) {
            this.setState({completed: true, loading: false });
            setTimeout(this.resetPanel, 2500);
        }

    };

    onFailed = () => {
        console.log("Action failed",this.state);
        if (this.state.loading) {
            this.setState({failed: true, loading: false});
            setTimeout(this.resetPanel, 2500);
        }
    };

    onPanelAction = async (action, value, actioning, silent = false) => {
        if (!silent) {
            EventBus.$on('action-completed', this.onCompleted);
            EventBus.$on('action-failed', this.onFailed);
            this.setState({loading: true, prevPanel: this.state.panel, panel: Loading, actioning: actioning, value});
        }

        return this.props.onPanelAction(action, value, this.onHash);
    };

    onHash = (hash) => {
        this.setState({hash})
    };

    onPanelInput = (value) => {
        if (value === '') value = '0';
        value = value.replace(/^(0)+([0-9]+)/, '$2');
            if (!value.match(/^-?\d+\.?\d*$/)) {
            return false;
        }
        this.setState({value});
        return value;
    };

    render() {

        const {userInfo, title, icon, currency, actions, calculateUsd, formatValue, borrowLimit, stabilityFee} = this.props;
        let {panel, actioning, value, loading, completed, failed, hash} = this.state;
        const [titlePart1, titlePart2] = title.split(" ")
        const showStabilityFee = currency === "DAI"

        let CustomPanel = null;
        if (panel) {
            CustomPanel = panel;
            panel = new panel();
        }
        let liquidationPrice;
        let walletBalance;
        const gemBalance = userInfo ? chop(userInfo.walletBalance, symbol2decimal[currency]).toString() : 0 
        const daiBalance = userInfo ? chop(userInfo.userWalletInfo.daiBalance, symbol2decimal[currency]).toString() : 0
        let valueDir = 1;
        try {

        if (panel) {
            switch (panel.name) {
                case 'Deposit':
                    liquidationPrice = getLiquidationPrice(value, 0);
                    walletBalance = gemBalance;
                    break;
                case 'Withdraw':
                    liquidationPrice = getLiquidationPrice(-value, 0);
                    walletBalance = gemBalance;
                    valueDir = -1;
                    break;
                case 'Borrow':
                    liquidationPrice = getLiquidationPrice(0, value);
                    walletBalance = daiBalance;
                    break;
                case 'Repay':
                    valueDir = -1;
                    liquidationPrice = getLiquidationPrice(0, -value);
                    walletBalance = daiBalance;
                    break;
            }
            }
        } catch (e) {
            console.log(e);
        }

        const containerClass = (panel && (!loading && !completed && !failed)? ' active':'');

        const actionPanelContainerClass =
            (panel? ' active':'') + (loading? ' loading':'') +
            (completed? ' completed':'')+ (failed? ' failed':'');

        return (
            <Overider className={'currency-box-container'+containerClass}>
                    <CurrencyBoxHeader showStabilityFee={showStabilityFee} />
                    <div className="currency-box" >
                        <div className={"currency-box-close" + (panel? ' active':'')}>
                            <img src={Close} onClick={() => this.resetPanel()} />
                        </div>
                        <div className="currency-meta">
                            <div className="currency-icon"><img src={require(`../assets/coin-icons/${currency}.png`)} /></div>
                            <div className="currency-title">
                                <span>{titlePart1}</span> <span className="mobile-hide">{titlePart2}</span>
                            </div>
                            <div className="stability-fee" >
                            { showStabilityFee && 
                                <div>
                                    <AnimateNumberChange val={stabilityFee} />%
                                </div>
                            }
                            </div>
                            <div className="currency-value nowrap">
                                <p>{formatValue(userInfo)} {currency}</p>
                                <small>{calculateUsd(userInfo)} USD</small>
                            </div>
                        </div>
                        <div className="currency-actions" >
                            {!panel && Object.entries(actions).map(([key,v],i) => <button className="currency-action-button" key={i} onClick={() => this.showActionPanel(v)}>{key}</button>)}
                        </div>
                    </div>
                    <div ref={this.boxRef} className={'currency-action-panel-container' + actionPanelContainerClass}>
                        {panel &&
                        <CustomPanel  onPanelAction={this.onPanelAction} onPanelInput={this.onPanelInput} userInfo={userInfo}
                                    actioning={actioning} value={value} currency={currency} hash={hash}
                                    completed={completed} failed={failed} />
                        }
                        {(!loading && !completed && !failed && panel) &&
                        <div className="currency-action-panel-footer">
                            <div className="even">
                                <div>
                                    <label>Current Wallet Balance</label>
                                    <div className="value">{walletBalance} {currency}</div>
                                </div>
                                <div>
                                    <label>Liquidation Price</label>
                                    <div className="value">
                                        {liquidationPrice && parseFloat(liquidationPrice[1]).toFixed(2)+' USD'}
                                    </div>
                                </div>
                                <div>
                                    <label>Borrow Limit</label>
                                    <div className="value">
                                        {liquidationPrice &&
                                        <div>
                                            <div className="limit-bar mini">
                                            <div className="values">
                                                <label>{/* Empty label is here to preserve orginal flex layout */}</label> 
                                                <label>{numm(liquidationPrice[0])} DAI</label>
                                            </div>
                                            <div className="limit-bar-inner">
                                                <div className="limit-bar-track" style={{width: borrowLimit(userInfo, liquidationPrice[0], value * valueDir)+'%'}}>
                                                    <span>{borrowLimit(userInfo, liquidationPrice[0], value * valueDir)+"%"}</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
            </Overider>
        )
    }
}

export default observer(CurrencyBox)