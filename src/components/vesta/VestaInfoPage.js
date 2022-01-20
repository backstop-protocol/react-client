import React, { Component } from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import ConnectButton from "../stability-pool/ConnectButton"
import TermsButton from "../stability-pool/TermsButton"

const Jumbotron = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  background-position: right center;
  background-size: cover;
  overflow: hidden;
  @media screen and (min-width: 300px){
    padding: 180px 28px 28px;
    background-position: center bottom;
    background-image: url("${require("../../assets/vesta/group-vesta-3.png")}");
    height: 519px;
  }
  @media screen and (min-width: 700px){
    padding: 85px;
    background-image: url("${require("../../assets/vesta/group-vesta-2.png")}");
    height: 306px;
  }
  @media screen and (min-width: 1000px){
    padding: 95px;
    background-image: url("${require("../../assets/vesta/group-vesta-1.png")}");
    height: 306px;
  }
  @media screen and (min-width: 1200px){
    padding: 105px;
    height: 353px;
    background-image: url("${require("../../assets/vesta/group-vesta.png")}");
  }
`

const Title = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  letter-spacing: 1.09px;
  color: rgb(23, 17, 30);
  line-height: 1.33;

  @media screen and (min-width: 300px){
    font-size: 35px;
  }

  @media screen and (min-width: 700px){
    padding: 0px;
    font-size: 35px;
    width: 450px;
  }
    
  @media screen and (min-width: 1000px){
    padding: 0px;
    font-size: 46px;
    width: 603px;
  }

  @media screen and (min-width: 1200px){
    padding: 0px;
    font-size: 51px;
    width: 665px;
  }
`

const SubTitle = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-family: Poppins, sans-serif;
  font-weight: 200;
  letter-spacing: 0.73px;
  color: rgb(23, 17, 30);
  @media screen and (min-width: 300px){
    font-size: 30px;
  }
  @media screen and (min-width: 700px){
    font-size: 30px;
  }
  @media screen and (min-width: 1000px){
    font-size: 33px;
  }
  @media screen and (min-width: 1200px){
    font-size: 36px;
  }
`

const Body = styled.div`
  color: rgb(23, 17, 30)!important;
  background-color: white;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;

  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  line-height: 1.5;
  font-weight: 400;
  @media screen and (min-width: 300px){
    flex-direction: column;
    padding: 28px;
  }
  @media screen and (min-width: 700px){
    flex-direction: row;
    padding: 65px 85px 85px;
  }
  @media screen and (min-width: 1000px){
      padding: 75px 95px 95px;
  }
  @media screen and (min-width: 1200px){
      padding: 85px 105px 105px;
  }
`

const GridItem = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  flex-direction: column;
  align-items: flex-start;
  display: flex;
`

const Image = styled.img`
  box-sizing: border-box;
  min-width: 0px;
  margin: 10px 10px 10px 0px;
  @media screen and (min-width: 300px){
    margin-top: 80px;
    height: 102px;
  }
  @media screen and (min-width: 700px){
    margin-top: 10px;
    height: 55px;
  }
  @media screen and (min-width: 1000px){
    height: 55px;
  }
  @media screen and (min-width: 1200px){
    height: 73px;
  }
`

const GiTitle = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  padding: 20px 20px 20px 0px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  font-weight: 600;
  @media screen and (min-width: 300px){
      font-size: 30px;
      width: 100%;
  }
  @media screen and (min-width: 700px){
      font-size: 23px;
      width: 219px;
  }
  @media screen and (min-width: 1000px){
      font-size: 23px;
      width: 219px;
  }
  @media screen and (min-width: 1200px){
    font-size: 26px;
    width: 270px;
  }
`

const GiText = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  padding: 10px 10px 10px 0px;
  letter-spacing: 0.7px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  @media screen and (min-width: 300px){
    font-size: 18px;
    width: 100%;
    max-width: 100%;
  }
  @media screen and (min-width: 700px){
    font-size: 12px;
    max-width: 290px;
  }
  @media screen and (min-width: 1000px){
    font-size: 12px;
    max-width: 290px;
  }
  @media screen and (min-width: 1200px){
    font-size: 13px;
    max-width: 290px;
  }

`

const ConnectContainer = styled.div`
  line-height: 1.5;
  font-weight: 400;
  height: 100%;
  box-sizing: border-box;
  min-width: 0px;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  max-width: 200px;
  margin: -30px 0px 0px;
  
  @media screen and (min-width: 300px){
    margin-left: calc(50% - 100px);
  }
  @media screen and (min-width: 700px){
    margin-left: 85px;
  }
  @media screen and (min-width: 1000px){
    margin-left: 95px;
  }
  @media screen and (min-width: 1200px){
    margin-left: 105px;
  }
  #connect-button{
    background-color: var(--contrast-inverse);
  }
`

class VestaInfoPage extends Component {

  render() {
    const image1 = require(`../../assets/vesta/icon-a-1.svg`)
    const image2 = require(`../../assets/vesta/icon-a-2.svg`)
    const image3 = require(`../../assets/vesta/icon-a-3.svg`)
    return(
      <div style={{backgroundColor: "white"}}>
        <Jumbotron>
          <Title>Automated Rebalancing for Vesta Stability Pool</Title>
          <SubTitle>Powered by B.Protocol v2</SubTitle>
        </Jumbotron>
        <ConnectContainer>
          <ConnectButton/>
          <TermsButton/>
        </ConnectContainer>
        <Body>
            <GridItem>
              <Image src={image1}/>
              <GiTitle>
                Stabilize <br/>
                Vesta Protocol
              </GiTitle>
              <GiText>
                B.Protocol v2 and its novel Backstop AMM (B.AMM) automates the rebalancing of Vesta Stability Pool to maintain its strength. Read more on how the Vesta SP is working here.
              </GiText>
            </GridItem>
            <GridItem>
              <Image src={image2}/>
              <GiTitle>
                Get Passive <br/>
                Yield on Your VST
              </GiTitle>
              <GiText>
                By using B.Protocol to deposit your VST into Vesta Stability Pool, you can save the manual operation of selling your accumulated ETH back to VST every time a liquidation is taking place. Read more about how it’s done here.
              </GiText>
            </GridItem>
            <GridItem>
              <Image src={image3}/>
              <GiTitle>
                Using <br/>
                B.Protocl V2
              </GiTitle>
              <GiText>
              The integration of Liqity with B.Protocol v2 is a step forward towards a more stabilized DeFi ecosystem. Read more about the novel B.AMM design that enables that here.
              </GiText>

            </GridItem>
        </Body>
      </div>
    )
  }
}

export default observer(VestaInfoPage)