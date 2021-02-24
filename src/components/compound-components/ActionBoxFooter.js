import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex from "styled-flex-component";
import BorrowLimit from "./BorrowLimit"
import { ActionEnum } from "../../lib/compound.util";
import {device} from "../../screenSizes"
import compoundStore from "../../stores/compound.store"

const Container = styled.div`
    margin-top: 43px;
    .grey-divider:not(:last-child){
        border-right: 1px solid rgba(151, 151, 151, 0.25);
        margin-right: 15px;
        padding-right: 15px;
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
    @media ${device.largeLaptop} {
        font-size: 11px;
    }
    @media ${device.laptop} {
        font-size: 11px;
    }
`

const Amount = styled.div`
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.8px;
    color: #0b0412;
    @media ${device.largeLaptop} {
        font-size: 15px;
    }
    @media ${device.laptop} {
        font-size: 15px;
    }
`

class ActionBoxFooter extends Component {

    render (){
        const {coin, value, action} = this.props
        const {displayNum, symbol, WalletBalanceStr} = coin
        let updatedTotalDeposit = parseFloat(displayNum(compoundStore.totalDespositedBalanceInUsd, 4))
        const valueInUsd = coin.calcValueInUsd(value)
        if(action == ActionEnum.deposit){
            updatedTotalDeposit = updatedTotalDeposit + parseFloat(displayNum(valueInUsd, 4))
        }
        if(action == ActionEnum.withdraw){
            updatedTotalDeposit = updatedTotalDeposit - parseFloat(displayNum(valueInUsd, 4))
        }
        updatedTotalDeposit = updatedTotalDeposit.toFixed(4)
        return (
            <Container>
                <Flex>
                    <Flex column justifyBetween className="grey-divider" style={{width: "30%"}}>
                        <SmallTitle>Current Wallet Balance</SmallTitle>
                        <Amount>{displayNum(WalletBalanceStr, 4)} {symbol}</Amount>
                    </Flex >
                    <Flex column justifyBetween className="grey-divider" style={{width: "30%"}}>
                        <SmallTitle>Total deposit</SmallTitle>
                        <Amount>${updatedTotalDeposit}</Amount>
                    </Flex >
                    <Flex column justifyBetween className="grey-divider" style={{width: "40%"}}>
                        <SmallTitle>Borrow Limit</SmallTitle>
                        <BorrowLimit {...this.props}/>
                    </Flex >
                </Flex>
            </Container>
        )
    }
}

export default observer(ActionBoxFooter)