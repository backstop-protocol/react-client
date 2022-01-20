import React, { Component } from "react";
import {observer} from "mobx-react"
import styled from "styled-components"

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
    font-size: 40px;
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
    font-size: 35px;
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
  color: rgb(41, 49, 71);
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


class VestaInfoPage extends Component {
  render() {
    return(
      <div>
        <Jumbotron>
          <Title>Automated Rebalancing for Vesta Stability Pool</Title>
          <SubTitle>Powered by B.Protocol v2</SubTitle>
        </Jumbotron>
        <Body>
            <GridItem>
              <Image src={require("../../assets/icon-a-1.svg")}/>
              <GiTitle>
                Stabilize <br/>
                Vesta Protocol
              </GiTitle>
              <GiText>
                B.Protocol v2 and its novel Backstop AMM (B.AMM) automates the rebalancing of Liquity Stability Pool to maintain its strength. Read more on how the Liquity SP is working here.
              </GiText>
            </GridItem>
            <GridItem>
              <Image src={require("../../assets/icon-a-2.svg")}/>
              <GiTitle>
                Get Passive <br/>
                Yield on Your VST
              </GiTitle>
              <GiText>
                By using B.Protocol to deposit your LUSD into Liquity Stability Pool, you can save the manual operation of selling your accumulated ETH back to LUSD every time a liquidation is taking place. Read more about how it’s done here.
              </GiText>
            </GridItem>
            <GridItem>
              <Image src={require("../../assets/icon-a-3.svg")}/>
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