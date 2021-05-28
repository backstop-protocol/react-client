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
import TermsAndConditionsContent from "./TermsAndConditionContent"
import BproClaimModal from "./BproClaimModal"

const Container = styled.div`
  min-width: 454px;
  min-height: 400px;
  border-radius: 4px;
  width: 80vw;
  height: 90vh;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.2), 0 0 8px 0 rgba(0, 0, 0, 0.1);
  @media ${device.mobile} {
    min-width: 360px;
  }
`

const Header = styled.div`
  padding-top: 26px;
  width: 100%;
  height: 77px;
  background-image: linear-gradient(-182deg, rgba(37, 192, 104, 0) 83%, rgba(12, 233, 108, 0.45) 115%), linear-gradient(to bottom, #f2fbf6, #f2fbf6);
`

const Footer = styled.div`
  width: 100%;
  height: 77px;
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

const Button = styled.div`
  transition: all 0.3s ease-in-out;
  margin-top: 40px;
  min-width: 218px;
  width: 100%;
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
  &.done{
    background-color: white;
    border: 2px solid #12c164;
    pointer-events: none;
    span{
      color: #12c164!important;
    }
  }
`

const Content = styled.div`
 padding: 40px;
 height: calc(90vh - 77px);
 overflow-y: hidden;
 overflow-y: scroll;
`

class TermsAndConditionsModal extends Component {

  constructor(props) {
    super(props)
  }

  iAgree = () => {
    // todo: 
    bproStore.iAgree()
    const noWrapper = true
    EventBus.$emit('show-modal', <BproClaimModal {...this.props}/>, noWrapper);
  }
  
  render () {
    return (
      <Container>
        <Header>
          <Title>Terms And Conditions</Title>
        </Header>
          <Content>
            <TermsAndConditionsContent/>
            <Button onClick={this.iAgree}>
              <span>
                i agree to terms and Conditions
              </span>
            </Button>
          </Content>
      </Container>
    )
  }
}

export default observer(TermsAndConditionsModal)