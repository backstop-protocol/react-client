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

const Text = styled.div`
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0b0412;
`
const Container = styled.div`
    visibility: ${({hide})=> hide ? "hidden" : "visible"}; 
`

class Unlock extends Component{

    constructor(props) {
        super(props);

        this.state = {
            locked: !props.coin.isUnlocked(),
            unlocking: false,
        }
    }

    onUnlock = async () => {
        try{
            if(!this.state.locked){
                return
            }
            const {coin} = this.props
            this.setState({unlocking: true});
            await coin.unlock()
            this.setState({
                locked: false,
                unlocking: false,
            })
        } catch (err){
            this.setState({
                locked: true,
                unlocking: false,
            })
        }
    }

    render () {

        const {unlocking, locked} = this.state
        const {coin} = this.props
        const text = locked ? `Unlock ${coin.symbol} to continue` : `${coin.symbol} is unlocked`
        return (
            <Container hide={coin.symbol == "ETH"}>
                <Flex style={{marginTop: "15px"}} justifyBetween>
                    <Text>
                        {text}
                    </Text>
                    <div className={'tickbox'+(unlocking ? ' loading' : (locked? '':' active'))} onClick={this.onUnlock}>
                        {unlocking && <LoadingRing />}
                    </div>
                </Flex>
            </Container>
        )
    }
}

export default observer(Unlock)