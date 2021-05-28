import React, {Component} from "react";
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {device} from "../../screenSizes"
const Container = styled.div`
  position: relative;
  bottom: -6px;

  .shadow-cut{
    position: relative;
    z-index:10;
    width: 100%;
    height: 6px;
    background-color: #fff;
  }
` 

const Tab = styled.div`
  padding: 15px 30px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 18px;
  @media ${device.largeLaptop} {
    font-size: 16px;
  }

  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0b0412;
  cursor: pointer;
  &.selected{
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 6px 0 rgb(0 0 0 / 22%);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

`

export default (props)=> {
    const tabs = props.tabNames || []
    const selected = props.selected
    return (
        <Container>
          <Flex>
              {tabs.map(tab => <Tab onClick={()=>props.onClick(tab)} key={tab} className={selected == tab ? "selected" : ""}>{tab}</Tab>)}
          </Flex>
          <div className="shadow-cut"/>
        </Container>
    )
}