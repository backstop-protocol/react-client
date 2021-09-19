

import React, { Component } from "react";
import Header2 from "../components/Header2";
import {observer} from "mobx-react"
import styled from "styled-components"
import routerStore from "../stores/router.store"
import * as qs from "qs";
import ModalClaimHeader from "../components/style-components/ModalClaimHeader"
import {device} from "../screenSizes"
import Flex, {FlexItem} from "styled-flex-component"
import AnimateNumericalString from "../components/style-components/AnimateNumericalString"
import apyStore from "../stores/apy.store"
import bproStore from "../stores/bpro.store"

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`

const Header = styled.div`
  width: 100%;
  margin-top: -50px;
`
const Title = styled.div`
  margin-top: 18px;
  text-align: center;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #17111e;
`

const Balance = styled.div`
  margin-top: 8px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 36px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  text-align: center;
  span:nth-last-child(-n+8) {
    opacity: 0.5;
  }
`

const ContentBox = styled.div`
  margin-top: 41px;
  width: 900px;
  border-radius: 9.9px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.22);
  background-color: white;
  div:not(:last-child) {
    border-bottom: solid 0.8px rgba(0,0,0,0.1);
  }
  @media ${device.laptop}{
    width: 800px;
  }
  @media ${device.tablet}{
    width: 700px;
  }
  @media ${device.mobile}{
    width: 100%;
  }
`

const Text = styled.span`
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  color: #0b0412;
  padding: 22px;
`

const Cell =styled(Text)`
  width: 25%;
  text-align: right;
  &:first-child{
    text-align: left;
  }
`

const ANS = props => {
  return (
    <AnimateNumericalString val={props.val} decimals={3}>  </AnimateNumericalString>
  )
}

const Button = styled.div`
  transition: all 0.3s ease-in-out;
  margin: 50px 0;
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

class FarmInfo extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  render() {
    const { history } = routerStore.routeProps;
    const {search, pathname} = history.location
    const params = qs.parse(search, { ignoreQueryPrefix: true })
    if(params.inIframe){
      return (
        <Container>
          <Header>
            <ModalClaimHeader/>
            <Balance>
              Farm Info (beta)
            </Balance>
          </Header>
          <Flex full column alignCenter>
            <Title>
              Liquidity Mining info for B.Protocol users for the LM2 phase<br/> (18th September - 17th December)<br/>
              For more info read the <a target="_blank" href="https://docs.bprotocol.org/info/general">Docs</a>
          </Title>
            <ContentBox>
                <Flex Cell justifyBetween>
                  <Cell></Cell>
                  <Cell>uBPRO-BIP4</Cell>
                  <Cell>{"BPRO TVL < $150m"}</Cell>
                  <Cell>{"BPRO TVL > $150m"}</Cell>
                </Flex>
                <Flex  justifyBetween>
                  <Cell>Rewards</Cell>
                  <Cell><ANS val={apyStore.apy}/>/month</Cell>
                  <Cell><ANS val={apyStore.apy}/>/month</Cell>
                  <Cell><ANS val={parseFloat(apyStore.apy)*3}/>/month</Cell>
                </Flex>
                <Flex  justifyBetween>
                  <Cell>Accumulated</Cell>
                  <Cell><ANS val={bproStore.totalBproNotInWallet}/></Cell>
                  <Cell><ANS val={bproStore.totalBproNotInWallet}/></Cell>
                  <Cell><ANS val={parseFloat(bproStore.totalBproNotInWallet)*3}/></Cell>
                </Flex>
                <Flex  justifyBetween>
                  <Cell>Claimable</Cell>
                  <Cell><ANS val={0}/></Cell>
                  <Cell><ANS val={0}/> </Cell>
                  <Cell><ANS val={0}/> </Cell>
                </Flex>
                <Flex  justifyBetween>
                  <Cell>Wallet Balance</Cell>
                  <Cell><ANS val={0}/> </Cell>
                  <Cell><ANS val={0}/></Cell>
                  <Cell><ANS val={0}/> </Cell>
                </Flex>
            </ContentBox>
            <ContentBox>
                <Flex  justifyBetween>
                  <Text>mScore</Text>
                  <Text><ANS val={bproStore.mScore}/></Text>
                </Flex>

                <Flex  justifyBetween>
                  <Text>cScore</Text>
                  <Text><ANS val={bproStore.cScore}/></Text>
                </Flex>
            </ContentBox>
          </Flex>
        </Container>
      );

    }
    return (
      <iframe 
        src="/farm-info/?inIframe=true&hideNav=true"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    );
  }
}

export default observer(FarmInfo)