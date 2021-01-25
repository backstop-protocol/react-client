import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";

const Container = styled.div`
    margin-top: 43px;
    .grey-divider:not(:last-child){
        border-right: 1px solid rgba(151, 151, 151, 0.25);
        margin-right: 10px;
    }
`

const SmallTitle = styled.div`
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0b0412;
`

const Amount = styled.div`
    margin-top: 27px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.8px;
    color: #0b0412;
`

class ActionBoxFooter extends Component {

    render (){
        const {coin} = this.props
        const {displayNum, underlyingBalanceStr, symbol, WalletBalanceStr} = coin
        return (
            <Container>
                <Flex>
                    <FlexItem className="grey-divider" style={{width: "30%"}}>
                        <SmallTitle>Current Wallet Balance</SmallTitle>
                        <Amount>{displayNum(WalletBalanceStr, 4)} {symbol}</Amount>
                    </FlexItem>
                    <FlexItem className="grey-divider" style={{width: "20%"}}>
                        <SmallTitle>Total deposit</SmallTitle>
                        <Amount>{displayNum(underlyingBalanceStr, 4)} {symbol}</Amount>
                    </FlexItem>
                    <FlexItem className="grey-divider" style={{width: "50%"}}>
                        <SmallTitle>Borrow Limit</SmallTitle>
                    </FlexItem>
                </Flex>
            </Container>

        )
    }
}

export default observer(ActionBoxFooter)