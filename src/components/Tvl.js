import React, {Component} from "react";
import {Observer} from "mobx-react-lite"
import styled from 'styled-components';
import Tooltip from "./Tooltip";
import Flex, {FlexItem} from "styled-flex-component";
import {device} from "../screenSizes";
import mainStore from "../stores/main.store"

const TvlBox = styled.div`
    background-image: url("${require("../assets/tvl-bg.svg")}");
    background-size: cover; /* Resize the background image to cover the entire container */
    background-repeat: no-repeat; /* Do not repeat the image */
    width: 567px;
    height: 144px;
    padding: 20px 33.3px 24.7px 58px;

    @media ${device.largeLaptop} {
        width: 505px;
        height: 128px;
        padding: 18px 30px 23px 53px;
    }

    @media ${device.laptop} {
        width: 466px;
        height: 118px;
        padding: 17px 28px 21px 49px;
    } 
`

const TvlTitle = styled.h2`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.04;
    letter-spacing: -0.29px;
    color: #17ab57;

    @media ${device.largeLaptop} {
        font-size: 13px;
    }

    @media ${device.laptop} {
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
    font-size: 41px;
    color: #0b0412;

    @media ${device.largeLaptop} {
        font-size: 32px;
    }

    @media ${device.laptop} {
        font-size: 30px;
    }
`

const Triangle = styled.div`
    display: inline-block;
    position: relative;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
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
    width: 200px;
    height: 100px;

    @media ${device.largeLaptop} {
        height: 90px;
    }

    @media ${device.laptop} {
        height: 85px;
    }
`

const ToolTipLine = styled.div`
      padding: 5px;
      font-family: Poppins;
`

export default class Tvl extends Component {
    render() {
       return (
           <div>
               <TvlBox>
                   <Flex justifyBetween>
                       <FlexItem>
                            <TvlTitle>
                                Total value locked
                                <span className="tooltip-container">   
                                    <Observer>
                                        { ()=>                
                                            <Tooltip>
                                                <ToolTipLine >ETH Deposits: { (mainStore.tvlEth / 1000).toFixed(2) }K </ToolTipLine>
                                                <ToolTipLine >Dai Debt: { (mainStore.tvlDai / 1000000).toFixed(2)}M</ToolTipLine>
                                                <ToolTipLine >Number of Vaults: {mainStore.cdpi}</ToolTipLine>        
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
                       <FlexItem>
                            <TvlGraphImg src={require("../assets/tvl-graph.svg")}/>
                       </FlexItem>
                   </Flex>
                </TvlBox>
           </div>
       )
    }
}
