import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import {device} from "../../screenSizes";
import Flex, {FlexItem} from "styled-flex-component";
import {ClHeader} from "./CoinListHeader"
import {Icon, Symbol, GreyText} from "./CoinListItem"
import {displayNum} from "../../lib/compound.util"
import ImportAllowanceToggle from"./ImportAllowanceToggle"


const Container = styled.div`
    width: 465px;
    position: relative;
    margin: 0 20px;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
    background-image: radial-gradient(circle at 48% 100%, rgba(206, 255, 225, 0.3), rgba(212, 242, 224, 0) 55%), linear-gradient(to bottom, white, white);
    min-height: 137px;
    overflow: hidden;
    @media ${device.largeLaptop} {
        width: 430px;
        min-height: 126px;
    }
    @media ${device.laptop} {
        width: 387px;
        min-height: 112px;
    }
`

const Title = styled.div`
    padding: 15px 0 0 31px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 18px;
`

const ListHeader = styled(ClHeader)`
    padding-left: 31px;
`

const ListItem = styled.div`
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    letter-spacing: 0.75px;
    border-top: 1px solid rgba(151, 151, 151, 0.25);
    padding-left: 31px;
    background-color: white;
`

class MigrationAssetList extends Component{

    render () {
        const {type, list} = this.props
        const isAssetList = type == "deposit"
        return(
            <Container>
                <Title>
                    {isAssetList ? "Supply" : "Borrow"}
                </Title>
                <ListHeader>
                    <Flex justifyAround full center>
                        <FlexItem style={{width: "33%"}}>
                            Asset
                        </FlexItem>
                        <FlexItem style={{width: "33%"}}>
                            Balance
                        </FlexItem>
                        <FlexItem style={{width: "33%"}}>
                        </FlexItem>
                    </Flex>
                </ListHeader>
                {list.map((coin, index)=> {
                    return (
                        <ListItem key={index}>
                            <Flex justifyAround full center>
                                <FlexItem style={{width: "33%"}}>
                                    <Flex alignCenter>
                                        <Icon src={coin.icon} />
                                        <Symbol> {coin.symbol} </Symbol>
                                    </Flex>
                                </FlexItem>
                                <FlexItem style={{width: isAssetList ? "33%" : "66%"}}>
                                    <Flex column>
                                        {displayNum(isAssetList ? coin.underlyingBalanceUsdStr :  coin.borrowedUsd, 4)} USD 
                                        <GreyText>{displayNum(isAssetList ? coin.underlyingBalanceStr : coin.borrowed, 4)} {coin.symbol}</GreyText>
                                    </Flex>
                                </FlexItem>
                                {isAssetList &&<FlexItem style={{width: "33%"}}>
                                     <ImportAllowanceToggle coin={coin}/>
                                </FlexItem>}
                            </Flex>
                        </ListItem>
                    )
                })}
            </Container>
        )
    }
}

export default observer(MigrationAssetList)