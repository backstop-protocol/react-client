import React, {Component} from "react";
import Flex, {FlexItem} from "styled-flex-component";
import ReactTooltip from "react-tooltip"
import styled from "styled-components"
import {device} from "../screenSizes"
import {getLiquidationPrice} from "../lib/Actions"
import mainStore from "../stores/main.store"
import makerStoreManager from "../stores/maker.store"
import {observer} from "mobx-react"
import moment from "moment"

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
const LiquidationPrice = observer(
    class LiquidationPrice extends Component {

        render () {

            const {userInfo} = this.props;
            const liquidationPrice = getLiquidationPrice(0, 0)
            const collateralRatio = ((((userInfo.collaeralDeposited * userInfo.miscInfo.spotPrice) / userInfo.bCdpInfo.daiDebt) * 100) || 0).toFixed(2)
            const {makerPriceFeed} = mainStore
            const makerData = mainStore.getIlkData()
            const cdpNumber = userInfo ? userInfo.bCdpInfo.cdp : 0
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
                                                {cdpNumber > 0 && <ToolTipLine>
                                                    <div> CDP Number: </div>
                                                    <div> {cdpNumber} </div>
                                                </ToolTipLine>}
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
                                                    <div> ${makerData.makerPriceFeedPrice} </div>
                                                </ToolTipLine>
                                                <ToolTipLine>
                                                    <div> Maker price feed Next price: </div>
                                                    <div> ${makerData.makerPriceFeedPriceNextPrice} </div>
                                                </ToolTipLine>
                                                <ToolTipTitle>
                                                    <span> coinbase.com </span>
                                                    <span> {moment(mainStore.coinbaseLastUpdate).fromNow()} </span>
                                                </ToolTipTitle>
                                                <ToolTipLine>
                                                    <div> ETH Market price: </div>
                                                    <div> ${mainStore.ethMarketPrice} </div>
                                                </ToolTipLine>  
                                                <ToolTipLine>
                                                    <div> BTC Market price: </div>
                                                    <div> ${mainStore.wbtcMarketPrice} </div>
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