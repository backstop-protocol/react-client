/**
 * @format
 */
import React, {Component} from "react";
import {observer} from "mobx-react"
import { makeAutoObservable } from "mobx"

import {runInAction} from "mobx"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {ActionEnum, CoinStatusEnum} from "../../lib/compound.util"
import userStore from "../../stores/user.store"
import ActionBox from "./ActionBox"
import compoundStore from "../../stores/compound.store";
import {Transition} from 'react-spring/renderprops'
import {device} from "../../screenSizes";

export const Icon = styled.img`
    width: 40px;
    height: 40px;
    padding: 20px 10px 20px 0;
    display: inline-block;
    @media ${device.largeLaptop} {
        width: 37px;
        height: 37px;
    }
    @media ${device.laptop} {
        width: 32px;
        height: 32px;
    }
`

export const Symbol = styled.div`
    height: 100%;
    text-align: center;
    display: inline-block;
    font-size: 15px;
    letter-spacing: 0.75px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    @media ${device.largeLaptop} {
        font-size: 14px;
    }
    @media ${device.laptop} {
        font-size: 13px;
    }
`
const Container = styled.div`
    font-size: 15px;
    @media ${device.largeLaptop} {
        font-size: 14px;
    }
    @media ${device.laptop} {
        font-size: 13px;
    }
    letter-spacing: 0.75px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    transition: all 0.3s ease-in-out;
    border-top: 1px solid rgba(151, 151, 151, 0.25);
    z-index: 1;
    position: relative;
    .currency-action-button{
        transition: all 0.3s ease-in-out;
        opacity: 0;
        visibility: hidden;
        margin-bottom: 0;
    } 
    .rectangle{
        transition: all 0.3s ease-in-out;
    }

    &.close:hover {
        background: white;
        border-radius: 0;
        z-index: 1000;
        padding: 10px;
        margin: -10px;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
        .currency-action-button{
            opacity: 1;
            visibility: visible;
            z-index: 1000;
        }
        .rectangle{
            margin: -10px;
        }
    }
    &.open {
        z-index: 100;
        transition-duration: 0s;
        padding: initial;
        margin: initial;
        padding-top: 10px;
        margin-top: -10px;
        .rectangle{
            transition-duration: 0s;
        }
    }
    &.hide {
        opacity: 0;
    }
`

const CircleX = styled.div`
    opacity: 0;
    visibility: hidden;
    width: 60px;
    height: 60px;
    background: url("${require("../../assets/circle-x-icon.svg")}");
    position: absolute;
    right: 30px;
    margin-top: -40px;
    z-index: 0;
    &.show{    
        transition: all 0.5s ease-out;
        z-index: 1000;
        opacity: 1;
        visibility: visible;
        transform: rotate(180deg);
    }
    &.hide{
        transition: none;
    }
`

const Rectangle = styled.div`
    margin-left: -1px;
    width: 4px;
    height: 52px;
    border-radius: 0  10px 10px 0;
    background-color: #12c164;
`

export const GreyText = styled.div`
    margin-bottom: -14px;
    opacity: 0.48;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 12px;
    letter-spacing: 0.6px;
    color: #0b0412;
    @media ${device.largeLaptop} {
        font-size: 11px;
    }
    @media ${device.laptop} {
        font-size: 11px;
    }
`

class ActionBoxState {
    transactionInProgress = false
    hash = null
    val = ""
    err = ""
    success = ""
    inputIsValid = false
    inputErrMsg = ""

    constructor (){
        makeAutoObservable(this)
    }

    reset = () => {
        this.transactionInProgress = false
        this.hash = null
        this.val = ""
        this.err = ""
        this.success = ""
        this.inputIsValid = false
        this.inputErrMsg = ""
        this.timeout = null
    }

    setErrMsg = (msg) => {
        this.inputErrMsg = msg
        if(this.timeout) {
            clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(()=> {
            runInAction(()=> this.inputErrMsg = "")
        }, 3000)
    }
}

class CoinListItem extends Component {
    constructor(props) {
        super(props);
        this.actionBoxStore = new ActionBoxState()
        this.state = {
            action: ActionEnum.deposit,
            open: false,
        }
    }

    open (action) {
        if(!userStore.loggedIn){
            userStore.showConnect()
            return
        }
        this.setState({open: true, action})
    }

    closeActionBox (){
        this.setState({open: false})
        this.actionBoxStore.reset()
    }

    render () {
        const {isInBalanceBox, type, lastItem, coinAddress} = this.props
        const isAssetColumn = type == "deposit" // represnts the veriant between the left column containing positive Assets and the right column containing Liabilities
        const coin = compoundStore.coinsInTx[coinAddress] || compoundStore.coinMap[coinAddress] // preserve state until tx is finished and UI is ready to dispaly new coin state
        const {displayNum} = coin
        const APY = isAssetColumn ? coin.positiveApy : coin.negetiveApy
        const balance = isAssetColumn ? coin.underlyingBalanceStr : coin.borrowed
        const balanceInUsd = isAssetColumn ? coin.underlyingBalanceUsdStr : coin.borrowedUsd
        const actionBtn1 = isAssetColumn ? ActionEnum.deposit : ActionEnum.borrow
        const actionBtn2 = isAssetColumn ? ActionEnum.withdraw : ActionEnum.repay
        
        return (
            <Container className={`${this.state.open ? "open" : "close"} ${!coinAddress ? "hide" : ""} ${lastItem ? "last-item" : ""}`}>
                <CircleX className={`${this.state.open ? "show" : "hide"}`} onClick={()=> this.closeActionBox()}/>
                <Flex column style={{ background: "white", borderRadius: "0 0 14px 14px"}}>
                    <Flex center>
                        <FlexItem  style={{width: "40px"}}>
                            {isInBalanceBox && 
                                <Rectangle className="rectangle"/>
                            }
                        </FlexItem>
                        <Flex className="dont-scale" justifyAround full center>
                            <FlexItem style={{width: "25%"}}>
                                <Flex alignCenter>
                                    <Icon src={coin.icon} />
                                    <Symbol> {coin.symbol} </Symbol>
                                </Flex>
                            </FlexItem>
                            <FlexItem style={{width: "25%"}}>
                                {displayNum(APY, 2)} %
                            </FlexItem>
                            <FlexItem  style={{width: "25%"}}>
                                <Flex column>
                                    {displayNum(balanceInUsd, 4)} USD 
                                    <GreyText>{displayNum(balance, 4)} {coin.symbol}</GreyText>
                                </Flex>
                            </FlexItem>
                            <Flex justifyEnd style={{width: "25%"}}>
                                <Flex column justifyAround>
                                    <button onClick={()=>this.open(actionBtn1)} style={{marginBottom: "10px"}}  className="currency-action-button">{actionBtn1}</button>
                                    <button onClick={()=>this.open(actionBtn2)} className="currency-action-button">{actionBtn2}</button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <ActionBox
                            store={this.actionBoxStore}
                            action={this.state.action}
                            coin={coin}
                            isOpen={this.state.open} 
                            close={()=> this.closeActionBox()}
                            />
                </Flex>       
            </Container>
        )
    }
}

export default observer(CoinListItem)