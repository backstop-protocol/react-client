import React, {Component} from "react"
import {observer} from "mobx-react"
import styled from "styled-components"
import EventBus from "../../lib/EventBus"
import Flex, {FlexItem} from "styled-flex-component"
import {device} from "../../screenSizes"
import Toggle from "../style-components/Toggle"
import {ModalButton} from "../style-components/Buttons"
import makerStoreManager from "../../stores/maker.store"
import {openProxy, unlockGem} from "../../lib/Actions"
import {hasAllowance as _hasAllowance} from "../../lib/Utils"
import BpLoader from "../style-components/BpLoader"
import VIcon from "../../assets/v-icon-white.svg";
import Web3 from "web3"
const {toBN} = Web3.utils

const Container = styled.div`
  overflow: hidden;
  min-width: 360px;
  width: 40vw;
  background: white;
  border-radius: 5px;
  padding-bottom: 40px;
  box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.2), 0 0 8px 0 rgba(0, 0, 0, 0.1);
  @media ${device.mobile} {
    min-width: 300px;
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

const ExplainerText = styled.div`
  margin-top: 30px;
  width: 267px;
  margin: 40px 149px 20px 165px;
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
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ContentBox = styled.div`
  width: 33vw;
  border-radius: 9.9px;
  overflow: hidden;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.22);
  background-color: white;
  &>:not(:last-child) {
    border-bottom: solid 0.8px rgba(0,0,0,0.1);
  }
  @media ${device.mobile}{
    width: 300px;
  }

  .step-text{
    margin-left: 10px;
    font-size: 13px;
    font-weight: normal;
    .title {
      font-size: 18px;
      font-weight: 600;
    }
  }
`

const BigNum = styled.div`
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-size: 55px;
  color: ${({active})=> active ? "#17ab57" : "#0b0412"};
  opacity: ${({active})=> active ? "1" : "0.06"};

`

const StepContainer = styled.div`
  transition: all 0.3s ease-in-out;
  height: 100px;
  padding-right: 30px;
  background-image: ${({active})=> active ? "linear-gradient(to left, rgba(250, 253, 251, 0), #f2fbf6)" : "white"};
`

const GreenStripe = styled.div`
  transition: all 0.3s ease-in-out;
  width: 6px;
  margin-right: 24px;
  height: 100%;
  background-color: #17ab57;
  opacity: ${({active})=> active ? "1" : "0"};
`

const Step = (props) => {
  return (
    <StepContainer active={props.active}>
      <Flex alignCenter full>
        <GreenStripe active={props.active}/>
        <BigNum active={props.active}>{props.num}</BigNum>
        <Flex column className="step-text">
          <div className="title">{props.title}</div>
          <div>{props.text}</div>
        </Flex>
        <FlexItem grow="1">
          <Toggle toggled={props.toggled} action={props.action}/>
        </FlexItem>
      </Flex>
    </StepContainer>
  )
}

class GemModal extends Component {

  constructor(props) {
    super(props)
    this.state = {depositStatus: null}
  }

  openProxy = async ()=> {
    await openProxy()
    await makerStoreManager.getMakerStore().getUserInfo()
  }

  unlockGem = async ()=> {
    await unlockGem()
    await makerStoreManager.getMakerStore().getUserInfo()
  }

  depositGem = async ()=> {
    const depositInProcess = this.state.depositStatus
    if(depositInProcess){
      return // exit
    }
    this.setState({depositStatus: "depositing"})
    await this.props.depositFn()
    this.setState({depositStatus: "done"})
    await makerStoreManager.getMakerStore().getUserInfo()
    setTimeout(() => {
      EventBus.$emit('close-modal')
    }, 3000)
  }

  render() {
    const {userInfo, userInfoUpdate} = makerStoreManager.getMakerStore()
    // to do listen to the user info change event here from Mobx
    if(!userInfo){ return null }
    const hasProxy = !!userInfo.proxyInfo.userProxy && userInfo.proxyInfo.userProxy !== "0x0000000000000000000000000000000000000000"
    const hasAllowance = _hasAllowance(userInfo.userWalletInfo.gemAllowance)
    return (
      <Container>
        <Header>
          <Title>Follow Steps</Title>
        </Header>
        <Body>
          <ContentBox>
            <Step num={1} active={!hasProxy} action={()=> this.openProxy()} toggled={hasProxy} title="Open Proxy" text="Create a proxy account"/>
            <Step num={2} active={hasProxy && !hasAllowance} action={()=> this.unlockGem()} toggled={hasAllowance} title="Unlock" text="Give the contract allowance"/>
          </ContentBox>
          <ExplainerText>
             After completing the steps, click Deposit to complete the process
          </ExplainerText>
            <ModalButton className={!hasProxy || !hasAllowance ? "disabled" : ""} onClick={()=> this.depositGem()}>
              {!this.state.depositStatus && <span>Deposit</span>}
              {this.state.depositStatus == "depositing" && <BpLoader color="white"/>}
              {this.state.depositStatus == "done" && 
                <Flex>
                  <img src={VIcon}/>
                  <span>
                    Done
                  </span>
                </Flex>
              }
            </ModalButton>
        </Body>
      </Container>
    )
  }
}

export default observer(GemModal)