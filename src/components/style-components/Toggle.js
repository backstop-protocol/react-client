/**
 * @format
 */
import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import LoadingRing from "../LoadingRing";
import { depositEth } from "../../lib/compound.interface";
import {device} from "../../screenSizes";
import {ActionEnum} from "../../lib/compound.util"
import VIcon from "../../assets/v-icon-white-thick.svg";



const Text = styled.div`
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    padding: 2px 7px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.65px;
    color: #17ab57;
    @media ${device.largeLaptop} {
        font-size: 13px;
    }
    @media ${device.laptop} {
        font-size: 13px;
    }
    @media ${device.mobile} {
        display: none;
    }
`
const Container = styled.div`
    visibility: ${({hide})=> hide ? "hidden" : "visible"}; 
    .tickbox{
        margin: 3px 2px 0 0;
    }
    pointer-events: ${({disable})=> disable ? "none" : "auto"};
    .in-toggle-v{
      position: absolute;
      right: 3px;
      top: 3px;
      width: 12px;
      z-index: 1;
    }
`

class Toggle extends Component{

    constructor(props) {
        super(props);

        this.state = {
            toggled: false,
            waiting: false,
        }
    }

    onToggle = async () => {
        try{
            if(this.state.unlocked){
                return
            }
            const {action} = this.props
            this.setState({waiting: true});
            await action()
            this.setState({
                toggled: true,
                waiting: false,
            })
        } catch (err){
            this.setState({
                toggled: false,
                waiting: false,
            })
        }
    }

    render () {

        let {waiting} = this.state
        const {action, toggled} = this.props
        const unlocked = toggled || this.state.toggled // this is used to acount for UI delay
        let text = ""
        if(toggled){
            text = "Done"
        }
        else if(waiting){
            text = "In Progress"
        }
        return (
            <Container disable={unlocked} >
                <Flex justifyEnd>
                    <Text className="toggle-text">
                        {text}
                    </Text>
                    <div className={'tickbox'+(waiting ? ' loading' : (unlocked? " active": " clickable"))} onClick={this.onToggle}>
                        {waiting && <LoadingRing />}
                        {unlocked && <img className="in-toggle-v fade-in" src={VIcon} />}
                    </div>
                </Flex>
            </Container>
        )
    }
}

export default observer(Toggle)