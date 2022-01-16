import React, {Component} from "react";
import styled from "styled-components"
import {device} from "../../screenSizes";

const SmallButtonContainer = styled.div`
  cursor: pointer;
  padding: 0 15px;
  height: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(214, 242, 227, 0.4);
  height: 26px;
  span{
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.6px;
    color: white;
  }
  @media ${device.largeLaptop} {
    height: 20px;
    span{
      font-size: 13px;
    }
  }
  @media ${device.laptop} {
    height: 18px;
    span{
      font-size: 12px;
    }
  }
` 

export const SmallButton = (props) => {
  return(
    <SmallButtonContainer {...props}>
      <span>
        {props.children}
      </span>
    </SmallButtonContainer>
  )
}

export const ModalButton = styled.div`
  transition: all 0.3s ease-in-out;
  min-width: 218px;
  padding: 0 10px;
  height: 48px;
  border-radius: 4px;
  background-color: #12c164;
  display: flex;
  justify-content:center;
  align-items: center;
  cursor: pointer;
  span {
    transition: all 0.3s ease-in-out;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.7px;
    color: white;
    padding: 10px;
    text-transform: uppercase;
  }
  &.disabled{
    background-color: #cccccc;
    pointer-events: none;
  }
  &.done{
    background-color: white;
    border: 2px solid #12c164;
    pointer-events: none;
    span{
      color: #12c164!important;
    }
  }
`

const CloseContainer = styled.div`
  float: right;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    animation: shortSpin 0.3s;
    animation-timing-function: ease-in-out;
  }
`

export const Close = props => {
  return (<CloseContainer {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25">
        <g fill="none" fillRule="evenodd">
            <g fill="var(--color)">
                <path d="M1403.075 260.659L1400.695 258.28 1391.177 267.798 1381.659 258.28 1379.28 260.659 1388.798 270.177 1379.28 279.695 1381.659 282.075 1391.177 272.557 1400.695 282.075 1403.075 279.695 1393.557 270.177z" transform="translate(-1379 -258)"/>
            </g>
        </g>
    </svg>
  </CloseContainer>)
}