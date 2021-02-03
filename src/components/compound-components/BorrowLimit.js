import React, {Component} from "react";
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {observer} from "mobx-react"
import ProgressBar from "../style-components/ProgressBar"
import compoundStore from "../../stores/compound.store";
import {displayNum, ActionEnum} from "../../lib/compound.util"
import Web3 from "web3"

const {BN, toWei, fromWei} = Web3.utils


const Container = styled.div`
    width: 100%;
    height: 46px;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0b0412;
`

const Label = styled.div`
    transition: all 0.3s ease-in-out;
    width: ${({precent})=> precent}%;
    min-width: 20px;
    text-align: right;
`

class BorrowLimit extends Component {

    render() {
        const {action, value, coin} = this.props
        const {totalBorrowedBalanceInUsd, borrowLimitInUsd} = compoundStore
        // =================
        let borrowLimit = borrowLimitInUsd
        if (action == ActionEnum.deposit){
            const inputBl = coin.calcBorrowLimit(value)
            const currentBl = new BN(toWei(borrowLimitInUsd))
            const updated = currentBl.add(new BN(toWei(inputBl))).toString()
            borrowLimit = fromWei(updated)
        }
        if (action == ActionEnum.withdraw){
            const inputBl = coin.calcBorrowLimit(value)
            const currentBl = new BN(toWei(borrowLimitInUsd))
            const updated = currentBl.sub(new BN(toWei(inputBl))).toString()
            borrowLimit = fromWei(updated)
        }
        // =================
        let borrowed = totalBorrowedBalanceInUsd
        // if (action == ActionEnum.repay){
        //     borrowed = borrowed - (coin.calcValueInUsd(value))
        // }
        // if (action == ActionEnum.borrow){
        //     borrowed = borrowed + (coin.calcValueInUsd(value))
        // }
        
        let precent = borrowLimit > 0 ? ((borrowed / borrowLimit) * 100).toFixed(2) : 0
        precent = precent > 100 ? 100 : precent
        return (
            <Container>
                <Flex column justifyEnd full>
                    <Flex justifyBetween>
                        <div>${displayNum(borrowed, 2)}</div>
                        <div>${displayNum(borrowLimit, 2)}</div>
                    </Flex>
                    <ProgressBar precent={precent}/>
                    <Label precent={precent}>{precent}%</Label>
                </Flex>
            </Container>
        )
    }
}

export default observer(BorrowLimit)