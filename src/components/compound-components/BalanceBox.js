import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import {Transition} from 'react-spring/renderprops'
import BalanceListBox from "./BalanceListBox"
import userStore from "../../stores/user.store"
import ResponsiveWidthCol from "../style-components/ResponsiveContainer"
const depositOval = require("../../assets/images/deposit-withdraw.png")
const borrowOval = require("../../assets/images/borrow-repay.png")

const Container = styled(ResponsiveWidthCol)`
    text-align: center;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 25px;
    /* width: 610px; */
    height: 137px;
    margin: 0 20px;
    padding: 58px 198px 49px 199px;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
    background-image: radial-gradient(circle at 48% 100%, rgba(206, 255, 225, 0.3), rgba(212, 242, 224, 0) 55%), linear-gradient(to bottom, white, white);
`

const BgImage = styled.div`
    width: 147px;
    height: 79px;
    margin: auto;
    margin-top: -30px;
    background: url("${ ({type}) => type == "deposit" ? depositOval : borrowOval }");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 13px;  
`

const Empty = (props) => {
    const {type} = props
    return (
        <Container>
            <div>{type == "deposit" ? "Deposit/Withdraw" : "Borrow/Repay"}</div>
            <BgImage type={type} />
        </Container>
    )
}

class BalanceBox extends Component {
    render () {
        const {type, list, showBox, coinStatusToShow} = this.props
        return (
            <Transition
                items={showBox}
                immediate={!userStore.loggedIn}
                config={{duration: 300}} 
                from={{ opacity: 0, height: 0, zIndex: 0}}
                enter={{ opacity: 1 , height: "auto", zIndex: 1}}
                leave={{ opacity: 0, height: 0, zIndex: 0}}>
                {showBox =>
                    showBox
                    ? props => <div style={props}>
                        <Container><div>{type == "deposit" ? "Deposit/Withdraw" : "Borrow/Repay"}</div>
                            <BgImage type={type} />
                        </Container>
                    </div>
                    : props => <div style={props}>
                        <BalanceListBox type={type} list={list} coinStatusToShow={coinStatusToShow} />
                    </div>
                }
            </Transition>
        )
    }
}

export default observer(BalanceBox)