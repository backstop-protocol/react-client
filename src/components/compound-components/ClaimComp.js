import React, {Component} from "react";
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {observer} from "mobx-react"
import {device} from "../../screenSizes";

const Container = styled.div`
    img{
        width: 30px;
        height: 30px;
    }
    button.currency-input-button{
        font-size: 13px;
        height: 30px;
        @media ${device.largeLaptop} {
            font-size: 12px;
        }
        @media ${device.laptop} {
            font-size: 11px;
        }
    }
`

class ClaimComp extends Component{
    render () {
        const disabled = true

        return (
            <Container>
                <Flex full justifyBetween>
                    <img src={require("../../assets/com-icon-bl.svg")}/>
                    <button onClick={()=>alert("not ready yet!")} className={`currency-input-button ${disabled ? "disabled" : ""}`} disabled={disabled}>
                            Claim Comp
                    </button>
                </Flex>
            </Container>
        )
    }
}

export default observer(ClaimComp)