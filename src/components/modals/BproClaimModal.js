import React, {Component} from "react"
import {observer} from "mobx-react"
import styled from "styled-components"
import EventBus from "../../lib/EventBus"
import Flex, {FlexItem} from "styled-flex-component"
import CoinStatusEnum from "../../lib/compound.util"
import compoundMigrationStore from "../../stores/compoundMigration.store"
import infographic from "../../assets/images/compound-import-popup.png"
import {device} from "../../screenSizes"
import LoadingRing from "../LoadingRing"
import BpLoader from "../../components/style-components/BpLoader"
import ModalClaimHeader from "../../components/style-components/ModalClaimHeader"
import VIcon from "../../assets/v-icon.svg"
import bproStore from "../../stores/bpro.store"
import TermsAndConditionsModal from "./TermsAndConditionsModal"
import AnimateNumericalString from "../../components/style-components/AnimateNumericalString"
import {stringToFixed} from '../../lib/Utils'


const Container = styled.div`
  width: 554px;
  min-height: 400px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.2), 0 0 8px 0 rgba(0, 0, 0, 0.1);

/**
 * ----------------------------------------
 * animation heartbeat
 * ----------------------------------------
 */
@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);

    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}


#flip-animation {
	/* -webkit-animation: heartbeat 1.5s ease-in-out 3s both;
	        animation: heartbeat 1.5s ease-in-out 3s both; */
}

`

const Header = styled.div`
  width: 100%;
  height: 157px;

`

const Title = styled.div`
  margin-top: -135px;
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
  margin-top: 21px;
  width: 387px;
  border-radius: 9.9px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.22);
  background-color: white;
  div:not(:last-child) {
    border-bottom: solid 0.8px rgba(0,0,0,0.1);
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
`

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

class BproClaimModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      actionState: null
    }
  }

  showTermsAndConditions = () => {
    const noWrapper = true
    EventBus.$emit('show-modal', <TermsAndConditionsModal {...this.props}/>, noWrapper);
  }

  async doAction (){
    try{
      if(this.props.actionState == "done"){
        return
      }
      this.setState({actionState: "waiting"})
      await bproStore.claim()
      this.setState({actionState: "done"})
      setTimeout(() => {
        EventBus.$emit('close-modal');
      }, 3000)
    }catch(err){ 
      console.error(err)
      this.setState({actionState: "failed"})
    }
  }
  
  render () {
    const {walletBalance, claimable, unclaimable, totalBproNotInWallet} = bproStore
    const {actionState} = this.state
    const claimed = actionState == "done"
    const balance = stringToFixed(totalBproNotInWallet, 9)
    const agreed = bproStore.userAgreesToTerms
    const disabled = claimable == "0"
    return (
      <Container>
        <Header>
          <ModalClaimHeader/>
          <Title>Claim BPRO</Title>
        </Header>
        <Flex full column alignCenter>
          <Balance>
              {balance.split("").map((num, i) => <span key={i}>{num}</span>)}
          </Balance>
          <ContentBox>
              <Flex style={{padding: "22px"}} justifyBetween>
                <Text>Wallet Balance</Text>
                <Text><AnimateNumericalString val={walletBalance} decimals={9}/></Text>
              </Flex>
              <Flex style={{padding: "22px"}} justifyBetween>
                <Text>Unclaimable Balance</Text>
                <Text><AnimateNumericalString val={unclaimable} decimals={9}/></Text>
              </Flex>
              <Flex style={{padding: "22px"}} justifyBetween>
                <Text>Claimable Balance</Text>
                <Text><AnimateNumericalString val={claimable} decimals={9}/></Text>
              </Flex>
          </ContentBox>
          {agreed &&
          <Button onClick={()=>this.doAction()} 
            className={`${disabled || balance === "0" ? "disabled" : ""} ${claimed ? "done" : ""}`}>
            {actionState == "waiting" &&
              <BpLoader color="white"/>
            }
            {actionState == null &&
              <span>
                CLAIM
              </span>
            }
            {actionState == "done" && 
              <Flex>
                <img src={VIcon}/>
                <span>
                  CLAIMED
                </span>
              </Flex>
            }
          </Button>}
          {!agreed && <Button onClick={this.showTermsAndConditions}>
            <span>
              agree to terms and Claim
            </span>
          </Button>}
        </Flex>
      </Container>
    )
  }
}

export default observer(BproClaimModal)