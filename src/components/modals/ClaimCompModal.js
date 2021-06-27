import React, {Component} from "react"
import {observer} from "mobx-react"
import styled from "styled-components"
import EventBus from "../../lib/EventBus"
import Flex, {FlexItem} from "styled-flex-component"
import {device} from "../../screenSizes"
import Toggle from "../style-components/Toggle"
import {ModalButton} from "../style-components/Buttons"
import BpLoader from "../style-components/BpLoader"
import VIcon from "../../assets/v-icon-white.svg";
import compoundStore from "../../stores/compound.store"
import {displayNum} from "../../lib/compound.util"
import {percentage} from "../../lib/Utils"
import Web3 from "web3"

const Container = styled.div`
  overflow: hidden;
  overflow-y: scroll;  background: white;
  max-height: 90vh;
  border-radius: 5px;
  padding-bottom: 40px;
  box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.2), 0 0 8px 0 rgba(0, 0, 0, 0.1);
  /* this will hide the scrollbar in mozilla based browsers */
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none;
  &::-webkit-scrollbar { 
      width: 0 !important;
      display: none; 
  }
  width: 800px;
  @media ${device.tablet}{
    width: 600px;
  }
  @media ${device.mobile}{
    width: 95vw;
  }
`

const Header = styled.div`
  width: 100%;
  height: 146px;
  background-image: linear-gradient(-182deg, rgba(37, 192, 104, 0) 83%, rgba(12, 233, 108, 0.45) 115%), linear-gradient(to bottom, #f2fbf6, #f2fbf6);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 29px;
  color: #17111e;
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
`

const ExplainerText = styled.div`
  width: 95%;
  padding: 30px 10px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.55px;
  text-align: center;
  color: #17111e;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  margin-bottom: 30px;
  @media ${device.mobile}{
    width: 90%;
  }
`

const ContentBox = styled.div`
  width: 100%;
  border-radius: 9.9px;
  overflow: hidden;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.22);
  background-color: white;
  &>:not(:last-child) {
    border-bottom: solid 0.8px rgba(0,0,0,0.1);
  }
`

class ClaimCompModal extends Component {

  constructor(props) {
    super(props)
  }

  claim = (gasEfficient) => {
    if(gasEfficient){
      this.props.efficientClaim()
    } else {
      this.props.fullClaim()
    }
    EventBus.$emit("close-modal")
  }

  render() {
    const {avatarCompBalance, compBalance, efficientCompClaimGasEstimate, compClaimGasEstimate} = compoundStore
    const efficientClaimPrecentage = parseInt(percentage(avatarCompBalance, compBalance))
    return (
      <Container>
        <Header>
          <Title>Claim Comp</Title>
        </Header>
        <Flex justifyAround wrap style={{margin: "-30px 5% 0 5%"}}>
          <Body>
            <ContentBox>
                <Flex style={{padding: "22px"}} justifyBetween>
                  <Text>COMP</Text>
                  <Text>{displayNum(avatarCompBalance, 4)} COMP</Text>
                </Flex>
                <Flex style={{padding: "22px"}} justifyBetween>
                  <Text>Gas</Text>
                  <Text>{displayNum(efficientCompClaimGasEstimate, 4)} ETH</Text>
                </Flex>
            </ContentBox>
            <ExplainerText>
              Gas efficient claim process that will retrive {efficientClaimPrecentage}% of COMP
            </ExplainerText>
            <ModalButton onClick={()=> this.claim(true)}>
               <span>Efficient Claim</span>
            </ModalButton>
          </Body>
          <Body>
            <ContentBox>
                <Flex style={{padding: "22px"}} justifyBetween>
                  <Text>COMP</Text>
                  <Text>{displayNum(compBalance, 4)} COMP</Text>
                </Flex>
                <Flex style={{padding: "22px"}} justifyBetween>
                  <Text>Gas</Text>
                  <Text>{displayNum(compClaimGasEstimate, 4)} ETH</Text>
                </Flex>
            </ContentBox>
            <ExplainerText>
              Full calim process that will retrive 100% of COMP but with less gas efficiency.
            </ExplainerText>
            <ModalButton onClick={() => this.claim(false)}>
              <span>Full Claim</span>
            </ModalButton>
          </Body>
        </Flex>
      </Container>
    )
  }
}

export default observer(ClaimCompModal)