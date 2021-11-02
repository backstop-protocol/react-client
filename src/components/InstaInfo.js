import React, { Component } from "react";
import styled from "styled-components"
import { TableContainer, ContentBox, Cell, ANS, Button, Title} from "../containers/FarmInfo"
import Flex, {FlexItem} from "styled-flex-component"

export default class InstaInfo extends Component {

  render() {
    const {bproStore, account} = this.props
    return (
      <div>
        <Title>
          Instadapp account
        </Title>
        <Title>
          {account}
        </Title>
        <ContentBox wideTable={true}>
          <Flex Cell justifyBetween>
            <Cell></Cell>
            <Cell>uBPRO-BIP4</Cell>
            <Cell>BPRO <br/> {"(If TVL < $150m)"}</Cell>
            <Cell>BPRO <br/> {"(If TVL > $150m)"}</Cell>
          </Flex>
          {/* <Flex  justifyBetween>
            <Cell>User Reward</Cell>
            <Cell><ANS val={apyStore.apy}/>/month</Cell>
            <Cell><ANS val={apyStore.apy}/>/month</Cell>
            <Cell><ANS val={parseFloat(apyStore.apy)*3}/>/month</Cell>
          </Flex> */}
          <Flex  justifyBetween>
            <Cell>Accumulated</Cell>
            <Cell><ANS decimal={10} val={bproStore.totalBproNotInWallet}/></Cell>
            <Cell><ANS decimal={10} val={bproStore.totalBproNotInWallet}/></Cell>
            <Cell><ANS decimal={10} val={parseFloat(bproStore.totalBproNotInWallet)*3}/></Cell>
          </Flex>
          <Flex  justifyBetween>
            <Cell> 
              Claimable
            </Cell>
            <Cell><ANS decimal={10} val={bproStore.claimable}/></Cell>
            <Cell><ANS decimal={10} val={bproStore.claimable}/> </Cell>
            <Cell><ANS decimal={10} val={parseFloat(bproStore.claimable)*3}/> </Cell>
          </Flex>
          <Flex  justifyBetween>
            <Cell>Wallet Balance</Cell>
            <Cell><ANS decimal={10} val={bproStore.walletBalance}/></Cell>
            <Cell><ANS decimal={10} val={bproStore.walletBalance}/> </Cell>
            <Cell><ANS decimal={10} val={parseFloat(bproStore.walletBalance)*3}/> </Cell>
          </Flex>
          <Flex justifyAround>
            <Button onClick={()=>this.props.openClaimModal(bproStore)}>
              <span>
                CLAIM uBPRO-BIP4
              </span>
            </Button>
          </Flex>
        </ContentBox>
      </div>
    )
  }
}