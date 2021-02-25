import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from 'styled-components';
import Tooltip from "./Tooltip";
import Flex, {FlexItem} from "styled-flex-component";
import {device} from "../screenSizes";
import mainStore, {toCommmSepratedString} from "../stores/main.store"
import mainCompStore from "../stores/main.comp.store"
import AnimateNumberChange from "./style-components/AnimateNumberChange"

const TvlBox = styled.div`
    background-image: url("${require("../assets/tvl-bg.svg")}");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: contain;
    min-width: 566px;
    height: 146px;
    padding: 20px 33.3px 10px 58px;

    @media ${device.largeLaptop} {
        min-width: 505px;
        height: 116px;
        padding: 18px 62px 23px 53px;
    }

    @media ${device.laptop} {
        min-width: 466px;
        height: 103px;
        padding: 17px 59px 21px 49px;
        margin-top -6px;
    } 
`

const TvlTitle = styled.h2`
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.04;
    letter-spacing: -0.29px;
    color: #17ab57;
    margin-top: 15px;
    @media ${device.largeLaptop} {
        margin-top: 6px;
        font-size: 13px;
    }

    @media ${device.laptop} {
        margin-top: 0;
        font-size: 12px;
    }
    .tooltip-container {
        margin-left: 8px;
        &:hover {
          .tooltip {
            display: flex;
            align-items: flex-start;
          }
        }
      }

      .tooltip {
        text-align: center;
        display: none;
        top: -95px;
        min-width: 103px;
        height: 78px;
        transition: all 0.2s;
        h3 {
          font-size: 25px;
          font-weight: 600;
        }
      }
      img {
          width: 17px;
      }
`

const TvlAmount = styled.div`
    margin-top: 10px;
    font-family: grotesk-display, sans-serif;
    font-weight: 550;
    font-style: normal;
    font-size: 42px;
    color: #0b0412;
    min-width: 294px;

    @media ${device.largeLaptop} {
        font-size: 32px;
        min-width: 139px;
    }

    @media ${device.laptop} {
        font-size: 30px;
        min-width: 212px;
    }
`

const Triangle = styled.div`
    margin-left: 5px;
    display: inline-block;
    position: relative;
    transform: translateY(-80%);
    width: 14px;
    height: 12px;
    background-image: url("${require("../assets/triangle.svg")}");

    @media ${device.largeLaptop} {
        width: 12px;
        height: 10px;
    }
`

const TvlGraphImg = styled.img`
    display: block;
    width: 100%;
    height: 104px;
    margin-left: 15px;    
    @media ${device.largeLaptop} {
        height: 85px;
        margin-left: 10px;    
    }

    @media ${device.laptop} {
        height: 65px;
        margin-left: 0; 
    }
`

const ToolTipLine = styled.div`
    min-width: 160px;
    padding: 5px;
    font-family: "Poppins", sans-serif;
    display: flex;
    justify-content: space-between;
`

class Tvl2 extends Component {
    render() {
        let {tooltipData} = this.props
        tooltipData = tooltipData || {}
        const {tvlNumeric: compTvl} = mainCompStore
        const {tvlUsdNumeric: makerTvl} = mainStore

        // const tvl = toCommmSepratedString((compTvl + makerTvl).toFixed(1))
        const tvl = (compTvl + makerTvl) 
       return (
           <div>
               <TvlBox>
                   <Flex justifyBetween>
                       <FlexItem>
                            <TvlTitle>
                                Total value locked
                                <span className="tooltip-container">   
                                    <Tooltip>
                                        {Object.entries(tooltipData).map(([key, value]) => {
                                            return (
                                                <ToolTipLine key={key}> 
                                                    <div> {key}: </div> <div> {value} </div>
                                                </ToolTipLine>
                                            )
                                        })}
                                    </Tooltip>
                                    <img className="info-icon" src={require("../assets/i-icon-green.svg")} />
                                </span>
                            </TvlTitle>
                            <TvlAmount>
                                {/* ${tvl} */}
                                $<AnimateNumberChange decimals={1} val={tvl}/>
                                <Triangle/> 
                            </TvlAmount>
                       </FlexItem>
                       <FlexItem grow>
                            <TvlGraphImg src={require("../assets/tvl-graph.svg")}/>
                       </FlexItem>
                   </Flex>
                </TvlBox>
           </div>
       )
    }
}

export default observer(Tvl2)
