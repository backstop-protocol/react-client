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
import VIcon from "../../assets/v-icon.svg"
import bproStore from "../../stores/bpro.store"
import TermsAndConditionsModal from "./TermsAndConditionsModal"

const Container = styled.div`
  width: 554px;
  min-height: 400px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.2), 0 0 8px 0 rgba(0, 0, 0, 0.1);
`

const Header = styled.div`
  padding-top: 26px;
  width: 100%;
  height: 157px;
  background: url("${require("../../assets/images/modal-header.svg")}");
`

const Title = styled.div`
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
  border-radius: 3.4px;
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
      actionState: this.props.actionState
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
      await this.props.action()
      this.setState({actionState: "done"})
    }catch(err){ 
      console.error(err)
      this.setState({actionState: "failed"})
    }
  }
  
  render () {
    const { data, action, balance, header, disabled, cantClaim } = this.props
    const {actionState} = this.state
    const claimed = balance !== "0" && cantClaim
    const agreed = bproStore.userAgreesToTerms
    return (
      <Container>
        <Header>
          <Title>{header}</Title>
        </Header>
        <Flex full column alignCenter>
          <Balance>
            {cantClaim ? <span>0</span> : balance.split("").map((num, i) => <span key={i}>{num}</span>)}
          </Balance>
          {data && <ContentBox>
            {data.map(line => {
              return (
                <Flex style={{padding: "22px"}} justifyBetween>
                  <Text>{line.label}</Text>
                  <Text>{line.number}</Text>
                </Flex>
              )
            })}
          </ContentBox>}
          {agreed &&
          <Button onClick={()=>this.doAction()} 
            className={`${disabled || balance === "0" ? "disabled" : ""} ${claimed ? "done" : ""}`}>
            {actionState == "waiting" && !claimed &&
              <BpLoader color="white"/>
            }
            {actionState !== "waiting" && !claimed &&
              <span>
                CLAIM
              </span>
            }
            {claimed && 
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