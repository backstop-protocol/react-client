import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Flex, {FlexItem} from "styled-flex-component";
import LiquidationPrice from './LiquidationPrice'
import styled from "styled-components";
import ResponsiveWidthCol from "./style-components/ResponsiveContainer"
import {device} from "../screenSizes";
import {displayNum} from "../lib/compound.util";
import HeaderProgressBar from "./style-components/HeaderProgressBar"
import {getLiquidationPrice} from "../lib/Actions"
import mainStore from "../stores/main.store"
import ReactTooltip from "react-tooltip"
import moment from "moment"

const Container = styled(ResponsiveWidthCol)`
    /* width: 610px; */
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
    @media ${device.largeLaptop} {
        font-size: 17px;
    }
    @media ${device.laptop} {
        font-size: 15px;
    }
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
export const SubTitle = styled.div`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    color: #0b0412;
    @media ${device.largeLaptop} {
        font-size: 13px;
    }
    @media ${device.laptop} {
        font-size: 12px;
    }
`

const ProgressContainer = styled.div`
    width: 100%; 
    margin-bottom: -35px;
    padding: 0 5px;
`
const LpContainer = styled.div`
    height: 100%;
    border-left: solid 1.8px rgba(151, 151, 151, 0.12);
    padding-left: 20px;
`
const ToolTipLine = styled.div`
    min-width: 300px;
    padding: 5px;
    font-family: "Poppins", sans-serif;
    display: flex;
    justify-content: space-between;
`

const ToolTipTitle = styled.div`
    min-width: 300px;
    padding: 5px 5px 0 5px;
    font-family: "Poppins", sans-serif;
    color: black;
    opacity: 0.5;
    border-bottom: 1px;
    border-bottom-style: solid;
    border-bottom-color: grey;
    display: flex;
    justify-content: space-between;
`

const Price = styled.div`
    font-family: grotesk-display, sans-serif;
    font-weight: 550;
    font-size: 28px;
    color: #0b0412;

    @media ${device.laptop} {
        font-size: 24px;
    }
`

const LpTitle = styled.h3`
    .tooltip-container {
        margin-left: 8px;
    }
    img {
        width: 17px;
        margin-bottom: -5px;
    }
`
export default class BorrowLimit2 extends Component {


    render() {


        const {userInfo} = this.props;
        const ethUsd =  (userInfo?numm(userInfo.bCdpInfo.ethDeposit * userInfo.miscInfo.spotPrice, 2) : 0 );
        const collateralToBorrowRatio = (userInfo && userInfo.bCdpInfo.maxDaiDebt?numm(userInfo.bCdpInfo.daiDebt / userInfo.bCdpInfo.maxDaiDebt * 100):0)
        const collateralization = (userInfo && userInfo.bCdpInfo.daiDebt?numm((ethUsd / userInfo.bCdpInfo.daiDebt) * 100):0)
        const ratioPositionStyle = collateralToBorrowRatio > 50 ? {right: '0%'} : {left: '100%'}
        const liquidationPrice = getLiquidationPrice(0, 0)
        let stabilityFee = (mainStore && mainStore.stabilityFee?numm(mainStore.stabilityFee):0); 
        let borrowLimit = (userInfo && userInfo.bCdpInfo.maxDaiDebt?numm(userInfo.bCdpInfo.maxDaiDebt):0)
        let borrowed = (userInfo && userInfo.bCdpInfo.daiDebt?numm(userInfo.bCdpInfo.daiDebt):0)
        let precent = borrowLimit > 0 ? ((borrowed / borrowLimit) * 100).toFixed(0) : 0
        precent = precent > 100 ? 100 : precent
 
        return (
           <Container>
            
                <Flex column justifyEnd>
                    <Flex full>
                        <GridItem>
                            <Flex column justifyEnd full>
                                <SubTitle>
                                    Collateralization
                                </SubTitle>
                                <GridAmount>
                                    {collateralization}%
                                </GridAmount>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex column justifyEnd full>
                                <SubTitle>
                                    Stability Fee
                                </SubTitle>
                                <GridAmount>
                                    {stabilityFee}%
                                </GridAmount>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex column justifyEnd full>
                            <SubTitle>
                                    Liquidation Price &nbsp;
                                    <span className="tooltip-container">   
                                        <a data-tip data-for="liquidation-price-tooltip">
                                            <img className="info-icon" src={require("../assets/i-icon-green.svg")} />
                                        </a>
                                        <ReactTooltip id="liquidation-price-tooltip" className="react-tooltip-custom" effect='solid' type="light" place="left">
                                                <ToolTipLine>
                                                    <div> Liquidation price: </div>
                                                    <div> ${liquidationPrice && parseFloat(liquidationPrice[1]).toFixed(2)} </div>
                                                </ToolTipLine>
                                                <ToolTipLine>
                                                    <div> Collateralization ratio: </div>
                                                    <div> {collateralToBorrowRatio}% </div>
                                                </ToolTipLine>
                                                <ToolTipTitle>
                                                    <span> defiexplorer.com </span>
                                                    <span> {moment(mainStore.defiexploreLastUpdate).fromNow()} </span>
                                                </ToolTipTitle>
                                                <ToolTipLine>
                                                    <div> Maker price feed: </div>
                                                    <div> ${mainStore.makerPriceFeedPrice} </div>
                                                </ToolTipLine>
                                                <ToolTipLine>
                                                    <div> Maker price feed Next price: </div>
                                                    <div> ${mainStore.makerPriceFeedPriceNextPrice} </div>
                                                </ToolTipLine>
                                                <ToolTipTitle>
                                                    <span> coinbase.com </span>
                                                    <span> {moment(mainStore.coinbaseLastUpdate).fromNow()} </span>
                                                </ToolTipTitle>
                                                <ToolTipLine>
                                                    <div> Market price: </div>
                                                    <div> ${mainStore.ethMarketPrice} </div>
                                                </ToolTipLine>  
                                            </ReactTooltip>                                
                                        </span>
                                </SubTitle>
                                <GridAmount>
                                    ${liquidationPrice && parseFloat(liquidationPrice[1]).toFixed(2)}
                                </GridAmount>
                            </Flex>
                        </GridItem>
                    </Flex>
                    <SubTitle style={{padding: "18px 0"}}>
                        Borrow Limit
                    </SubTitle>
                    <Flex alignCenter>
                        <Amount>${borrowed}</Amount>
                        <ProgressContainer>                        
                            <HeaderProgressBar precent={precent}/>
                            <Label precent={precent}>
                                <Parallelogram>
                                    <div className="white-text">{`${precent}%`}</div>
                                </Parallelogram>
                            </Label>
                        </ProgressContainer>
                        <Amount>${borrowLimit}</Amount>
                    </Flex>
                
                </Flex>
            
        </Container>

        )
    }
}