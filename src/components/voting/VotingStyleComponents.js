import React, { Component } from "react";
import {observer} from "mobx-react"
import styled from 'styled-components'
import Flex, {FlexItem} from "styled-flex-component"
import VIcon from "../../assets/v-icon.svg"
import {device} from "../../screenSizes";
import FragLoader from "../FragLoader";


export const VoteBox = styled.div`
  width: calc(100% - 65px);
  height: 214px;
  margin: 19px 65px 46px 0px;
  padding: 35px 0 21px 25px;
  border-radius: 11px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
  background-image: radial-gradient(circle at -3% 53%, #ceffe1, rgba(212, 242, 224, 0) 30%), linear-gradient(to bottom, white, white);
`

export const VoteTitle = styled.div`
  margin: 0 1px 3px 1px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 27px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0b0412;
   margin-bottom: 20px;
`
 
export const Container = styled.div`
  padding-left: 86px;
  padding-top: 50px;
`
 
export const GreyTitle = styled.div`
  height: 20px;
  margin: 1px 26 19px 26px;
  opacity: 0.28;
  font-family: Helvetica;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0b0412; 
  white-space: nowrap;
`

export const RightSection = styled.div`
  min-height: 20vh;
  border-left: solid 2px rgba(151,151,151,0.2);
  overflow: hidden;
  padding-left: 32px;
`

export const RightSectionDivider = styled.div`
  min-width: 245px;
  border-bottom: solid 2px rgba(151,151,151,0.2);
  margin: 20px 0 40px -32px;
`

export const BoldNumber = styled.div`
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 27px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.35px;
  color: #0b0412;
  padding-top: 20px;
`

export const ClaimButton = styled.div`
  transition: all 0.3s ease-in-out;
  width: 97px;
  height: 32px;
  margin: 20px 0 1px 15px;
  padding: 10px 29px 9px 28px;
  border-radius: 5px;
  background-color: ${({disabled})=> disabled ? "#dddddd" : "#d6f2e3"};
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.6px;
  color: ${({disabled})=> disabled ? "#aaaaaa" : "#17ab57"};
  ${({disabled})=> disabled ? "pointer-events: none" : ""}
`

const Bar = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 8px;
  background-color: rgba(66, 110, 85, 0.12);
  z-index: -1000;
` 

const Marker = styled.div`
  transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  border-radius: 4px;
  width: ${({precent})=> precent}%;
  height 100%;
  background-image: linear-gradient(to right, #000000 48%, #2d7b4f);
`

const GlText = styled.a`
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17ab57;
  border-bottom: 1px solid #17ab57;
  cursor: pointer;
  text-decoration: none;
`

export const GreenLink = (props) => {
  return (
    <div style={{textAlign: "center", marginBottom: "50px"}}>
      <GlText href={props.href} target="_blank">{props.children}</GlText>
    </div> 
  )
}

const Indicator = styled.div`
  width: 2px;
  height: 33px;
  border: none;
  background-color: #d5e2dc;
`

const IndicatorText = styled.div`
  width: 36px;
  height: 20px;
  padding-left: 5px;
  margin-top: -3px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  vertical-align: text-top;
  letter-spacing: normal;
  color: #d5e2dc;
`

export const VoteProgressBar = (props)=> {
    return (
      <div style={{width: "100%"}}>
        <Flex style={{marginLeft: "50%", marginBottom: "-16px"}}>
          <Indicator>
          </Indicator>
          <IndicatorText>{props.precent}%</IndicatorText>
        </Flex>
        <Bar>
            <Marker precent={props.precent}/>
        </Bar>
      </div>
    )
}

const ActionButton = styled.div`
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  width: 130px;
  height: 40px;
  padding: 10px 30px 11px 30px;
  object-fit: contain;
  border-radius: 6px;
  background-image: ${({voted})=> voted ? "white" : "linear-gradient(123deg, #169d51 -1%, #25bd67 79%, #25bd67 79%)"};
  text-align: center;
  ${({voted})=>  voted ? "border: solid 2px #25c068" : "border: solid 0px #ffffff"};
  ${({voted})=>  voted ? "padding: 8px 8px 8px 8px" : ""};
  ${({voting})=>  voting ? "padding: 0!important" : ""};
  .currency-action-panel{
    border: none;
    margin-top: -5px;
    padding: 0 40px;
    svg{
      fill: white;
    }
  }
  &.disabled{
    background-color: #dddddd;
    color: #aaaaaa;
    pointer-events: none;
    background-image: none;
  }
  span {
    transition: all 0.3s ease-in-out;
    font-family: Helvetica;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.7px;
    color: ${({voted})=> voted ? "#17ab57" : "white"};
  }
  img{
    transition: all 0.3s ease-in-out;
    opacity: ${({voted})=> voted ? 1 : 0};
    width: 17px;
    height: 13px;
    margin-right: 5px;
  }
`

export const VoteButton = (props) => {
  const {voted, disabled, voting} = props
  const onClick = voted ? ()=>{} : props.onClick
  return (
    <ActionButton voting={voting} voted={voted} onClick={onClick} className={disabled && !voted? 'disabled' : ""}>
      {/*
        TODO: icon V
      */}
      {voting && 
        <div className="currency-action-panel">
          <FragLoader/>
        </div>
      }
      {!voting && <span>
        {voted && <img src={VIcon} />}
        {voted ? "VOTED" : "APPROVE"}
      </span>}
    </ActionButton>
  )
}

const BannerBg = styled.div` 
  width: 100%;
  height: 100%;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  img{
    height: 50px;
  } 
  p{
    min-height: 106px;
    margin: 10px 0 0 1px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.23px;
    color: #000000;
  }
  @media ${device.largeLaptop} {
    img{
      height: 45px;
    } 
    p{
      font-size: 18px;
    }
  }
  @media ${device.laptop} {
    img{
      height: 40px;
    } 
    p{
      font-size: 18px;
    }
  }
`

 
export const VoteBanner = () => {
  return (
    <BannerBg>
        <div>
          <img src={require('../../assets/images/vote.svg')} />
          <p>
            User incentive program is now being voted by the DAO, <br/>
            and will be retroactively distributed, <br/>
            if approved.
          </p>
        </div>
    </BannerBg>
  )
}

const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(140deg, rgba(255, 255, 255, .7) 40%, rgba(32,177,95,0.9) 85%, rgba(32,177,95,1) 95%);
`

export const CommingSoon = (props) => {

  return (
    <FullScreen>
      <Flex column justifyCenter full>
        <h1 style={{textAlign: "center", fontSize: "65px"}} className="risk-header">
          Coming Soon
        </h1>

        <h1 style={{textAlign: "center", fontSize: "55px"}} className="risk-header">
           {props.d}d  {props.h}h  {props.m}m  {props.s}s
        </h1>
      </Flex>
    </FullScreen>
  )
}