import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {device} from "../screenSizes";

const Container = styled.div`
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    height: 40px;
    width: 100%;
    opacity: 0.28;
    font-size: 12px;
    letter-spacing: 0.6px;
    color: #0b0412;
    line-height: 1.5;
    padding: 0 20px;
    border-bottom: 1px solid rgba(151, 151, 151, 0.25);
    .asset{
        width: 33%;
    }
    .fee{
        width: 27%;
    }
    .balance{
        width: 40%;
    }
    @media ${device.largeLaptop} {
        font-size: 11px;
        .asset{
            width: 30%;
        }
    }
    @media ${device.laptop} {
        font-size: 11px;
    }

`

class CurrencyBoxHeader extends Component {

    render () {
        const {showStabilityFee} = this.props
        return (
            <Container>
                <Flex justifyAround full center>
                    <FlexItem className="asset" >
                        Asset
                    </FlexItem>
                    <FlexItem className="fee" >
                        {showStabilityFee && <span>Stability fee</span>}
                    </FlexItem>
                    <FlexItem className="balance" >
                        Balance
                    </FlexItem>
                </Flex>
            </Container>
        )
    }
}

export default observer(CurrencyBoxHeader)