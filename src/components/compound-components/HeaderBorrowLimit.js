import React, {Component} from "react";
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {observer} from "mobx-react"
import HeaderProgressBar from "../style-components/HeaderProgressBar"
import compoundStore from "../../stores/compound.store";
import {displayNum} from "../../lib/compound.util"
import Web3 from "web3"
import ClaimComp from "./ClaimComp"

const {BN, toWei, fromWei} = Web3.utils


const Container = styled.div`
    width: 610px;
    height: 100%;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0b0412;
`

const Parallelogram = styled.div`
    position: relative;
    margin-top: 8px;
    height: 28px;
    transform: skew(-15deg);
    background: black;
    border-radius: 5px;
    .white-text{
        color: white;
        width: 30px;
        transform: skew(10deg);  
        font-family: "NeueHaasGroteskDisp Pro Md",sans-serif;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.8px;
        padding-top: 5px;
        padding-left: 7px;
    }
`

const Label = styled.div`
    transition: all 0.3s ease-in-out;
    opacity: 1;
    ${({precent})=> {
        if(precent == 0){
            return "opacity: 0; visabilty: hidden;"
        }else if(precent < 10){
            return `width: 40px; margin-left: max(0.1px, calc(${precent}% - 47px));`
        }else if(precent > 10 && precent <= 99){
            return `width: 50px; margin-left: max(0.1px, calc(${precent}% - 57px));`
        }else {
            return `width: 56px; margin-left: calc(${precent}% - 63px)`
        }
    }}
    
`

const Amount = styled.div`
    font-family: "NeueHaasGroteskDisp Pro Md",sans-serif;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.9px;
    color: #0b0412;
`

const GridAmount = styled(Amount)`
    padding: 12px 0;
`

const GridItem = styled.div`
    min-width: 33.3%;
    flex-grow: 1;
    border-bottom: solid 2px rgba(151, 151, 151, 0.2);
    &:not(:first-child){
        border-left: solid 2px rgba(151, 151, 151, 0.2);
        padding-left: 25px;
    }
`
const SubTitle = styled.div`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    color: #0b0412;
`

const ProgressContainer = styled.div`
    width: 100%; 
    margin-bottom: -35px;
    padding: 0 5px;
`

class HeaderBorrowLimit extends Component {

    render() {
        const {totalBorrowedBalanceInUsd, borrowLimitInUsd, totalDespositedBalanceInUsd} = compoundStore
        let borrowLimit = borrowLimitInUsd
        let borrowed = totalBorrowedBalanceInUsd
        const deposited = totalDespositedBalanceInUsd

        
        // const precent = borrowLimit > 0 ? ((borrowed / borrowLimit) * 100).toFixed(2) : 0
        let precent = borrowLimit > 0 ? ((borrowed / borrowLimit) * 100).toFixed(0) : 0
        precent = precent > 100 ? 100 : precent
        return (
            <Container>
                <Flex column justifyEnd full>
                    <Flex full>
                        <GridItem>
                            <Flex column justifyEnd full>
                                <SubTitle>
                                    Supply Balance
                                </SubTitle>
                                <GridAmount>
                                    ${displayNum(deposited, 9)}
                                </GridAmount>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex column justifyEnd full>
                                <SubTitle>
                                    Borrow Balance
                                </SubTitle>
                                <GridAmount>
                                    ${displayNum(borrowed, 9)}
                                </GridAmount>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex column justifyEnd full>
                                <ClaimComp/>
                                <GridAmount>
                                    $0 COMP
                                </GridAmount>
                            </Flex>
                        </GridItem>
                    </Flex>
                    <SubTitle style={{padding: "18px 0"}}>
                        Borrow Limit
                    </SubTitle>
                    <Flex alignCenter>
                        <Amount>${displayNum(borrowed, 2)}</Amount>
                        <ProgressContainer>                        
                            <HeaderProgressBar precent={precent}/>
                            <Label precent={precent}>
                                <Parallelogram>
                                    <div className="white-text">{`${precent}%`}</div>
                                </Parallelogram>
                            </Label>
                        </ProgressContainer>
                        <Amount>${displayNum(borrowLimit, 2)}</Amount>
                    </Flex>
                </Flex>
            </Container>
        )
    }
}

export default observer(HeaderBorrowLimit)