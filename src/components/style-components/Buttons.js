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