import React, {Component} from "react";
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';


const TvlBox = styled.div`
    width: 466px;
    height: 118px;
    background-size: contain;
    background-image: url(${require("../assets/tvl-bg.svg")});
`

const LeftBox = styled.div`
    display: flex;
    flex-direction: column
`

const RightBox = styled.div`
    flex: 1;
    dispaly: flex;
    width: 100px;  
`

const TvlTitle = styled.div`
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.04;
    letter-spacing: -0.29px;
    color: #17ab57;
`

const TvlAmount = styled.div`
    padding-top: 10px;
    font-family: NHaasGroteskDSPro-65Md;
    font-size: 41px;
    color: #0b0412;
`

const TvlGraphImg = styled.div`
    display: block;
    width: 100px;
`

export default class Tvl extends Component {
    render() {
       return (
           <div>
               <TvlBox>
                   <Flex>
                       <FlexItem order="2">World</FlexItem>
                       <FlexItem order="1">Hello</FlexItem>
                   </Flex>
                    <div>
                        {/* <TvlTitle>
                            total value locked
                        </TvlTitle>
                        <TvlAmount>
                            $ 1,858,082.1
                        </TvlAmount> */}
                    </div>
                    <div>

                        {/* <img src={require("../assets/tvl-graph.svg")} /> */}
                    </div>
                </TvlBox>
           </div>
       )
    }
}