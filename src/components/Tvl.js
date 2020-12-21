import React, {Component} from "react";
import {Observer} from "mobx-react"
import styled from 'styled-components';
import Tooltip from "./Tooltip";
import Flex, {FlexItem} from "styled-flex-component";
import {device} from "../screenSizes";
import mainStore from "../stores/main.store"

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
        padding: 18px 30px 23px 53px;
    }

    @media ${device.laptop} {
        min-width: 466px;
        height: 103px;
        padding: 17px 28px 21px 49px;
        margin-top -6px;
    } 
`

const TvlTitle = styled.h2`
    font-family: Poppins;
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
    font-family: Poppins;
    display: flex;
    justify-content: space-between;
`

export default class Tvl extends Component {
    render() {
       return (
           <div>
               <TvlBox>
                   <Flex justifyStart>
                       <FlexItem>
                            <TvlTitle>
                                Total value locked
                                <span className="tooltip-container">   
                                    <Observer>
                                        { ()=>                
                                            <Tooltip>
                                                <ToolTipLine> 
                                                    <div> ETH deposits: </div> <div> { (mainStore.tvlEth / 1000).toFixed(2) }K </div>
                                                </ToolTipLine>
                                                <ToolTipLine> 
                                                    <div> DAI debt: </div> <div> { (mainStore.tvlDai / 1000000).toFixed(2) }M </div>
                                                </ToolTipLine>
                                                <ToolTipLine> 
                                                    <div> Number of Vaults: </div> <div> { mainStore.cdpi } </div>
                                                </ToolTipLine>        
                                            </Tooltip>
                                        }
                                    </Observer>
                                    <img className="info-icon" src={require("../assets/i-icon-green.svg")} />
                                </span>
                            </TvlTitle>
                            <Observer>
                                { ()=> 
                                    <TvlAmount>
                                        ${mainStore.tvlUsd} <Triangle/>
                                    </TvlAmount>
                                }
                            </Observer>
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
