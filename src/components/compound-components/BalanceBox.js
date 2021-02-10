import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import {Transition} from 'react-spring/renderprops'
import BalanceListBox from "./BalanceListBox"
import userStore from "../../stores/user.store"
import {device} from "../../screenSizes";
import Flex, {FlexItem} from "styled-flex-component";
import ResponsiveWidthCol from "../style-components/ResponsiveContainer"
const depositOval = require("../../assets/images/deposit-withdraw.png")
const borrowOval = require("../../assets/images/borrow-repay.png")

const Container = styled(ResponsiveWidthCol)`
    position: relative;
    margin: 0 20px;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
    background-image: radial-gradient(circle at 48% 100%, rgba(206, 255, 225, 0.3), rgba(212, 242, 224, 0) 55%), linear-gradient(to bottom, white, white);
    min-height: 137px;
    @media ${device.largeLaptop} {
        min-height: 126px;
    }
    @media ${device.laptop} {
        min-height: 112px;
    }
`

const BgImage = styled.div`
    position: absolute;
    top: calc(100% + 58px);
    @media ${device.largeLaptop} {
        top: calc(100% + 48px);
    }
    @media ${device.laptop} {
        top: calc(100% + 34px);
    }
    left: 50%;
    transform: translate(-50%, 0);
    width: 147px;
    height: 79px;
    background: url("${ ({type}) => type == "deposit" ? depositOval : borrowOval }");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 13px;
`

const HeroText = styled.div`
    transition: width 0.3s ease-in-out;
    text-align: center; 
    &.top {
        width: 140px;
    }
    &.center {
        width: 180px;
    }
`

const Hero = styled.div`
    position: absolute;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    transition: transform 0.3s ease-in-out,
                top 0.3s ease-in-out,
                font-size 0.3s ease-in-out,
                left 0.3s ease-in-out;
    &.top {
        top: 15px;
        left: 41px;
        font-size: 22px;
        @media ${device.largeLaptop} {
            font-size: 20px;
        }
        @media ${device.laptop} {
            font-size: 18px;
        }
    }
    &.center {
        font-size: 26px;
        @media ${device.largeLaptop} {
            font-size: 24px;
        }
        @media ${device.laptop} {
            font-size: 21px;
        }
        top: calc(50% - 13px);
        left: calc(50% - 90px);
    }

`

class BalanceBox extends Component {
    render () {
        const {type, list, showBox, coinStatusToShow} = this.props
        return (
            <Container>
                <Hero className={`${showBox ? "center" : "top" }`}>
                    <HeroText className={`${showBox ? "center" : "top" }`}>
                        {type == "deposit" ? "Deposit/Withdraw" : "Borrow/Repay"}
                    </HeroText>
                </Hero>

                <Transition
                    items={showBox}
                    config={{duration: 300}} 
                    dealy={500}
                    from={{ opacity: 0, height: 0, zIndex: 0}}
                    enter={{ opacity: 1 , height: "auto", zIndex: 1}}
                    leave={{ opacity: 0, height: 0, zIndex: 0}}>

                    {showBox =>
                        showBox
                        ? props => 
                            <div style={{height: props.height, zIndex: props.zIndex}}>
                                <div style={{opacity: props.opacity, position: "relative"}}>
                                    <BgImage type={type} />
                                </div>
                            </div>
                        : props => 
                        <div style={props}>
                            <BalanceListBox type={type} list={list} coinStatusToShow={coinStatusToShow} />
                        </div>

                    }
                </Transition>
            </Container>
        )
    }
}

export default observer(BalanceBox)