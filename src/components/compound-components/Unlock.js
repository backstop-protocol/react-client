/**
 * @format
 */
import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import ActionBoxFooter from "./ActionBoxFooter"
import LoadingRing from "../LoadingRing";
import { depositEth } from "../../lib/compound.interface";
import {device} from "../../screenSizes";
import {ActionEnum} from "../../lib/compound.util"

const Text = styled.div`
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0b0412;
    @media ${device.largeLaptop} {
        font-size: 13px;
    }
    @media ${device.laptop} {
        font-size: 13px;
    }
`
const Container = styled.div`
    visibility: ${({hide})=> hide ? "hidden" : "visible"}; 
    .tickbox{
        margin: 3px 2px 0 0;
    }
    pointer-events: ${({disable})=> disable ? "none" : "auto"};
`

class Unlock extends Component{

    constructor(props) {
        super(props);

        this.state = {
            unlocked: false,
            unlocking: false,
        }
    }

    onUnlock = async () => {
        try{
            if(this.state.unlocked){
                return
            }
            const {coin} = this.props
            this.setState({unlocking: true});
            await coin.unlock()
            this.setState({
                unlocked: true,
                unlocking: false,
            })
        } catch (err){
            this.setState({
                unlocked: false,
                unlocking: false,
            })
        }
    }

    render () {

        let {unlocking} = this.state
        const {coin, action} = this.props
        const unlocked = coin.isUnlocked() || this.state.unlocked // this is used to acount for UI delay
        const text = !unlocked ? `Unlock ${coin.symbol} to continue` : `${coin.symbol} is unlocked`
        return (
            <Container disable={unlocked} hide={coin.symbol == "ETH" || action === ActionEnum.borrow || action === ActionEnum.withdraw}>
                <Flex style={{marginTop: "15px"}} justifyBetween>
                    <Text>
                        {text}
                    </Text>
                    <div className={'tickbox'+(unlocking ? ' loading' : (unlocked? " active": " clickable"))} onClick={this.onUnlock}>
                        {unlocking && <LoadingRing />}
                    </div>
                </Flex>
            </Container>
        )
    }
}

export default observer(Unlock)