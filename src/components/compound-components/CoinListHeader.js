import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {device} from "../../screenSizes";

const ClHeader = styled.div`
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    padding-left: 40px;
    height: 45px;
    width: 100%;
    opacity: 0.28;
    font-size: 12px;
    letter-spacing: 0.6px;
    color: #0b0412;
    line-height: 1.5;
    @media ${device.largeLaptop} {
        font-size: 11px;
    }
    @media ${device.laptop} {
        font-size: 11px;
    }
`

class CoinListHeader extends Component {

    render () {
        return (
            <ClHeader>
                <Flex justifyAround full center>
                    <FlexItem style={{width: "25%"}}>
                        Asset
                    </FlexItem>
                    <FlexItem style={{width: "25%"}}>
                        APY
                    </FlexItem>
                    <FlexItem style={{width: "50%"}} >
                        Balance
                    </FlexItem>
                </Flex>
            </ClHeader>
        )
    }
}

export default observer(CoinListHeader)