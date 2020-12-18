import React, {Component} from "react";
import Flex, {FlexItem} from "styled-flex-component";
import ReactTooltip from "react-tooltip"
import styled from "styled-components"
import {device} from "../screenSizes"
import {getLiquidationPrice} from "../lib/Actions"
import mainStore from "../stores/main.store"
import {observer} from "mobx-react"
import moment from "moment"

const chop4 = number => Math.floor(parseFloat(number) * 10000) / 10000

const chop2 = number => Math.floor(parseFloat(number) * 100) / 100

const LpContainer = styled.div`
    height: 100%;
    border-left: solid 1.8px rgba(151, 151, 151, 0.12);
    padding-left: 20px;
`
const ToolTipLine = styled.div`
    min-width: 300px;
    padding: 5px;
    font-family: Poppins;
    display: flex;
    justify-content: space-between;
`

const ToolTipTitle = styled.div`
    min-width: 300px;
    padding: 5px 5px 0 5px;
    font-family: Poppins;
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
const LiquidationPrice = observer(
    class LiquidationPrice extends Component {

        render () {

            const {userInfo} = this.props;
            const liquidationPrice = getLiquidationPrice(0, 0)
            const collateralRatio = (((userInfo.bCdpInfo.ethDeposit * userInfo.miscInfo.spotPrice) / userInfo.bCdpInfo.daiDebt) * 100).toFixed(2)

            return (
                <LpContainer >
                    <Flex full column justifyBetween >
                        <FlexItem>
                            <LpTitle>
                                <div> Liquidation 
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
                                                    <div> {collateralRatio}% </div>
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
                                                    <span> coinmarketcap.com </span>
                                                    <span> {moment(mainStore.coinMarketCapLastUpdate).fromNow()} </span>
                                                </ToolTipTitle>
                                                <ToolTipLine>
                                                    <div> Market price: </div>
                                                    <div> ${mainStore.ethMarketPrice} </div>
                                                </ToolTipLine>  
                                            </ReactTooltip>
                                        </span>
                                    </div>
                                <div> Price </div>
                            </LpTitle>
                        </FlexItem>
                        <FlexItem>
                            <Price>
                                ${liquidationPrice && parseFloat(liquidationPrice[1]).toFixed(2)}
                            </Price>
                        </FlexItem>
                    </Flex>
                </LpContainer>
            )
        }
    }
)

export default LiquidationPrice