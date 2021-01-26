/**
 * @format
 */
import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import CToken, {ActionEnum} from "../../lib/compound.util"
import userStore from "../../stores/user.store"
import ActionBox from "./ActionBox"

const Icon = styled.img`
    width: 40px;
    height: 40px;
    padding: 20px 10px 20px 0;
    display: inline-block;
`

const Symbol = styled.div`
    height: 100%;
    text-align: center;
    display: inline-block;
    font-size: 15px;
    letter-spacing: 0.75px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
`
const Container = styled.div`
    font-size: 15px;
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
        z-index: 10;
        padding: 10px;
        margin: -10px;
        background: white;    
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

const GreyText = styled.div`
    margin-bottom: -14px;
    opacity: 0.48;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 12px;
    letter-spacing: 0.6px;
    color: #0b0412;
`

class CoinListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: ActionEnum.deposit,
            open: false,
            openTransitionDone: false,
        }
    }

    render () {
        const {isInBalanceBox, type, lastItem, coinAddress} = this.props
        const isAssetColumn = type == "deposit" // represnts the veriant between the left column containing positive Assets and the right column containing Liabilities
        const coin = new CToken(coinAddress)
        const {displayNum} = coin
        const APY = isAssetColumn ? coin.positiveApy : coin.negetiveApy
        const actionBtn1 = isAssetColumn ? ActionEnum.deposit : ActionEnum.borrow
        const actionBtn2 = isAssetColumn ? ActionEnum.withdraw : ActionEnum.repay
        return (
            <Container className={`${this.state.open ? "open" : "close"}`}>
                <CircleX className={`${this.state.open ? "show" : "hide"}`} onClick={()=>this.setState({open: false})}/>
                <Flex column>
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
                                    {displayNum(coin.underlyingBalanceUsdStr, 4)} USD 
                                    <GreyText>{displayNum(coin.underlyingBalanceStr, 4)} {coin.symbol}</GreyText>
                                </Flex>
                            </FlexItem>
                            <Flex justifyEnd style={{width: "25%"}}>
                                <Flex column justifyAround>
                                    <button onClick={()=>this.setState({open: true, action: actionBtn1})} style={{marginBottom: "10px"}}  className="currency-action-button">{actionBtn1}</button>
                                    <button onClick={()=>this.setState({open: true, action: actionBtn2})} className="currency-action-button">{actionBtn2}</button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <ActionBox  
                            action={this.state.action}
                            coin={coin}
                            isOpen={this.state.open} 
                            close={()=>this.setState({open: false})} />
                </Flex>
            </Container>
        )
    }
}

export default observer(CoinListItem)