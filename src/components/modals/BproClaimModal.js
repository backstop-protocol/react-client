import React, {Component} from "react"
import {observer} from "mobx-react"
import styled from "styled-components"
import XIcon from "../../assets/x-icon.svg"
import EventBus from "../../lib/EventBus"
import Flex, {FlexItem} from "styled-flex-component"
import CoinStatusEnum from "../../lib/compound.util"
import compoundMigrationStore from "../../stores/compoundMigration.store"
import infographic from "../../assets/images/compound-import-popup.png"
import {device} from "../../screenSizes"
import LoadingRing from "../LoadingRing"
import BpLoader from "../../components/style-components/BpLoader"

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
  margin: 50px 0;
  width: 218px;
  height: 48px;
  border-radius: 3.4px;
  background-color: #12c164;
  display: flex;
  justify-content:center;
  cursor: pointer;
  &.disabled{
    background-color: #cccccc;
    pointer-events: none;
  }
  span {
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.7px;
    color: white;
  }
`

class BproClaimModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      actionState: "waiting"//this.props.actionState
    }
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
    const { data, action, balance } = this.props
    const {actionState} = this.state
    return (
      <Container>
        <Header>
          <Title>BPRO Balance</Title>
        </Header>
        <Flex full column alignCenter>
          <Balance>
            {balance.split("").map(num => <span>{num}</span>)}
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

          <Button onClick={this.doAction} className={actionState == "done" ? "disabled" : ""}>
            {actionState == "waiting" && 
              <BpLoader color="white"/>
            }
            {actionState !== "waiting" && <span>
              CLAIM
            </span>}
          </Button>
        </Flex>
      </Container>
    )
  }
}

export default observer(BproClaimModal)