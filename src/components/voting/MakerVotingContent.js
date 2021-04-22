import React, { Component } from "react";
import {observer} from "mobx-react"
import styled from 'styled-components'
import Flex, {FlexItem} from "styled-flex-component"
import {VoteBox, VoteTitle, VoteButton, GreenLink, Container, GreyTitle, RightSection, RightSectionDivider, BoldNumber, ClaimButton, VoteProgressBar} from "./VotingStyleComponents"
import HeaderBorrowLimit from "../compound-components/HeaderBorrowLimit"
import makerVoteStore from "../../stores/makerVote.store"
import mainStore from "../../stores/main.store"
import makerStore from "../../stores/maker.store"

class MakerVotingContent extends Component {

  componentDidMount(){
    makerVoteStore.getData()
  }

  render() {
    const { userInfo } = makerStore
    const { forVotes, scoreClaimedFromJar, cantClaim, cantVote, voted, personalJarBalance } = makerVoteStore
    const totalScore = userInfo ? userInfo.userRatingInfo.totalRating : 0 // TODO: get total rating from main makerStore
    const userScore = userInfo ? userInfo.userRatingInfo.userRating : 0
    const votingPower = userInfo ? ((userScore/totalScore)*100).toFixed(8) : 0
    
    const voteForPrecent = totalScore ? ((forVotes / totalScore)*100).toFixed(10) : 0
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
                <VoteButton onClick={()=>makerVoteStore.vote()} voted={voted} disabled={cantVote}/>
                <GreenLink href="https://forum.bprotocol.org/t/b-protocol-governance-token/48">More Details</GreenLink>
              </Flex>
            </Flex>
          </VoteBox>

        </FlexItem>
        <RightSection style={{width: "30%"}}>
          <GreyTitle>Voting Power</GreyTitle>
          <BoldNumber>{votingPower}%</BoldNumber>
          <RightSectionDivider/>
          <GreyTitle>Claim Jar Balance</GreyTitle> 
          <Flex alignCenter> 
            <BoldNumber>${ cantClaim ? 0 : personalJarBalance }</BoldNumber>
            <ClaimButton disabled={cantClaim} onClick={()=>makerVoteStore.claim()}>CLAIM</ClaimButton>
          </Flex> 
        </RightSection>
      </Flex>
    </Container>
    )
  }
}

export default observer(MakerVotingContent)