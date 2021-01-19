import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {getCoin, displayNum} from "../../lib/compound.util"
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
    .currency-action-button{
        transition: opacity 0.15s ease-in-out;
        opacity: 0;
        margin-bottom: 0;
    } 
    .dont-scale{
        transition: all 0.3s ease-in-out;
    }
    &.close:hover {
        transform: scale(1.0500, 1.200);
        background: white;    
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
        .currency-action-button{
            opacity: 1;
        }
        .dont-scale{
            transform: scale(.97, 0.82);
        }
    }
    &.open {
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
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
        this.state = { open: false}
    }

    render () {
        const {isInBalanceBox, type} = this.props
        const coin = getCoin(this.props.coin, userStore.networkType)
        const APY = type == "deposit" ? coin.positiveApy : coin.negetiveApy
        return (
            <Container className={`${this.state.open ? "open" : "close"}`}>
                <Flex column>
                    <Flex center>
                        <FlexItem  style={{width: "40px"}}>
                            {isInBalanceBox && 
                                <Rectangle/>
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
                            <FlexItem  style={{width: "25%"}}>
                                <Flex column justifyAround>
                                    <button onClick={()=>this.setState({open: true})} style={{marginBottom: "10px"}}  className="currency-action-button">Deposit</button>
                                    <button onClick={()=>this.setState({open: true})} className="currency-action-button">Withdraw</button>
                                </Flex>
                            </FlexItem>
                        </Flex>
                    </Flex>
                    <ActionBox isOpen={this.state.open} close={()=>this.setState({open: false})}/>
                </Flex>
            </Container>
        )
    }
}

export default observer(CoinListItem)