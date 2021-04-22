import React, { Component } from "react";
import {observer} from "mobx-react"
import styled from 'styled-components'
import Flex, {FlexItem} from "styled-flex-component"
import {VoteBox, VoteTitle, VoteButton, GreenLink, Container, GreyTitle, RightSection, RightSectionDivider, BoldNumber, ClaimButton, VoteProgressBar} from "./VotingStyleComponents"
import HeaderBorrowLimit from "../compound-components/HeaderBorrowLimit"
import compVoteStore from "../../stores/compoundVote.store"
import mainCompStore from "../../stores/main.comp.store"
import compoundStore from "../../stores/compound.store"

class CompoundVotingContent extends Component {

  componentDidMount(){
    compVoteStore.getData()
  }

  render() {
    const {originalUserScore: userScore, originaltotalScore :totalScore} = compoundStore
    const { forVotes, scoreClaimedFromJar, cantClaim, cantVote, voted, personalJarBalance, calcVotePrecent } = compVoteStore
    const votingPower = userScore ? ((userScore/totalScore)*100).toFixed(8) : 0
    const voteForPrecent = calcVotePrecent(forVotes, totalScore)
    console.log({userScore, forVotes, totalScore})

    return (
    <Container>
      <Flex>
        <FlexItem style={{width: "70%"}}>
          <GreyTitle>Open Votes</GreyTitle>
          <VoteBox>
            <VoteTitle>Migration to Tokenized Governance</VoteTitle>
            <Flex full>
              <Flex justifyBetween column alignCenter style={{width: "100%", }}>
                <VoteProgressBar precent={voteForPrecent}/>
              </Flex>
              <Flex justifyBetween column alignCenter style={{minWidth: "200px"}}>
                <VoteButton onClick={()=>compVoteStore.vote()} voted={voted} disabled={cantVote}/>
                <GreenLink href="https://forum.bprotocol.org/t/b-protocol-governance-token/48">More Details</GreenLink>
              </Flex>
            </Flex>
          </VoteBox>

        </FlexItem>
        <RightSection style={{width: "30%"}}>
          <GreyTitle>Voting Power</GreyTitle>
          <BoldNumber>{votingPower}%</BoldNumber>
          <RightSectionDivider/>
          {/* <GreyTitle>Claim Jar Balance</GreyTitle> 
          <Flex alignCenter> 
            <BoldNumber>${ cantClaim ? 0 : personalJarBalance }</BoldNumber>
            <ClaimButton disabled={cantClaim} onClick={()=>compVoteStore.claim()}>CLAIM</ClaimButton>
          </Flex>  */}
        </RightSection>
      </Flex>
    </Container>
    )
  }
}

export default observer(CompoundVotingContent)