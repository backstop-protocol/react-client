import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import ActionBoxFooter from "./ActionBoxFooter"
import Unlock from "./Unlock"
import TxInProgress from "./TxInProgress"
import Loading from "../action-panels/Loading"
import Tooltip from "../Tooltip"
import {ActionEnum, roundBigFloatAfterTheDeciaml, displayNum} from "../../lib/compound.util"
import compoundStore from "../../stores/compound.store"
import {device} from "../../screenSizes";
import Web3 from "web3"
const {BN} = Web3.utils

const Container = styled.div`
    transition: all 0.3s ease-in-out;
    height: ${({open, tx}) => {
        if (!open) return 0
        if (!tx) return "310px"
        if (tx) return "100px"
    }};
    .currency-input input{
        font-family: Poppins;
        font-weight: 500;
        font-size: 18px;
        @media ${device.largeLaptop} {
            font-size: 17px;
        }
        @media ${device.laptop} {
            font-size: 16px;
        }
    }
    .currency-input-button{
        text-transform: uppercase;
    }
    .set-max{
        margin-top: 4px;
        font-size: 14px;
        @media ${device.largeLaptop} {
            margin-top: 1.5px;
            font-size: 13px;
        }
        @media ${device.laptop} {
            margin-top: 2px;
            font-size: 12px;
        }
    }
`

/**
 * Custom Enterence Animation
 */
const AnimatedContent = styled.div` 
    transition: ${({open}) => open ? "all 0.3s ease-in-out 0.2s" : "none" };
    visibility: ${({open}) => open ? "visible" : "hidden" }; 
    position: ${({open}) => open ? "initial" : "absolute" }; 
    opacity: ${({open}) => open ? 1 : 0 }; 
    padding-top: ${({open}) => open ? "20px" : 0 }; 
    margin: 0 40px;
    /* all childern */
    & > * {
        display: ${({open}) => open ? "" : "none" };
    }
    /* over riding some loader styles */
    .currency-action-panel{
        border: none;
        padding: 0;
        padding-right: 30px;
        h3 {
            font-family: "Poppins", sans-serif;
            font-size: 16px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.8px;
            color: #0b0412;

        }
        img.result{
            padding: 20px 10px;
        }
    }
`

const Title = styled.div`
    font-size: 18px;
    letter-spacing: 0.9px;
    color: #0b0412;
    text-transform: uppercase;
    @media ${device.largeLaptop} {
        font-size: 16px;
    }
    @media ${device.laptop} {
        font-size: 16px;
    }
`

const SubTitle = styled.div`
    margin-top: 8px;
    margin-bottom: 11px;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #0b0412;
    @media ${device.largeLaptop} {
        font-size: 13px;
    }
    @media ${device.laptop} {
        font-size: 13px;
    }
`

class ActionBox extends Component {

    constructor(props) {
        super(props);
        this.boxRef = React.createRef();
    }

    reset = () => {
        const {coin} = this.props
        setTimeout(()=> {
            this.props.close()
            setTimeout(()=> {
                compoundStore.toggleInTx(coin.address, false)
            }, 500)
        }, 3000)
    }

    onHash = hash => {
        const {store} = this.props
        store.hash = hash
    }

    doAction = async () => {
        const {coin, action, store} = this.props
        const [inputIsValid, inputErrMsg] = coin.validateInput(store.val, action)
        if(!inputIsValid){
            store.setErrMsg(inputErrMsg)
            return
        }
        try{
            coin.transactionInProgress = action
            store.transactionInProgress = true
            compoundStore.toggleInTx(coin.address, coin)
            await coin[action](store.val, this.onHash)
            store.success = true
        } catch (err){
            store.err = err.message
        }
        finally {
            this.reset()
        }
    }

    onInputChange = (e) => {
        const {coin, action, store} = this.props
        const val = e.target.value;
        const [inputIsValid, inputErrMsg] = coin.validateInput(val, action)
        store.val = val 
        store.inputIsValid = inputIsValid 
        store.setErrMsg(inputErrMsg)
    };

    showSetMax = () => {
        const {coin, action} = this.props
        if(action === ActionEnum.deposit && coin.symbol != "ETH" && coin.WalletBalanceStr > 0){
            return true
        }
        if(action === ActionEnum.withdraw){
            const noDebtAtAll = compoundStore.totalBorrowedBalanceInUsd <= 1
            if(noDebtAtAll){
                return true
            }
        }
        if(action === ActionEnum.repay){
            // debt is smaller than underlying wallet balance
            return true
        }
        return false
    }

    setMax = () => {
        const {coin, action, store} = this.props

        let val = ""
        if(action === ActionEnum.repay){
            const borrowed = coin.borrowed
            const balance = coin.WalletBalanceStr
            val = new BN(balance).gt(new BN(borrowed)) ? borrowed : balance
        }
        if(action === ActionEnum.deposit){
            val = coin.WalletBalanceStr
        }
        if(action === ActionEnum.withdraw){
            val = coin.underlyingBalanceStr
        }
        const [inputIsValid, inputErrMsg] = coin.validateInput(val, action)
        store.val = displayNum(val, 8)
        store.inputIsValid = inputIsValid 
        store.setErrMsg(inputErrMsg)
    }

    componentDidUpdate(prevProps, prevState) {
        const actionBoxIsOpening = this.props.isOpen && !prevProps.isOpen
        if(actionBoxIsOpening){
            const {bottom} = this.boxRef.current.getBoundingClientRect();
            const theBottomOfTheActionBoxIsNotInView = bottom + 300 > window.innerHeight
            if(theBottomOfTheActionBoxIsNotInView){
                // wait for it to open a bit then start scrolling it in to the  view
                setTimeout(()=> {
                    this.boxRef.current.scrollIntoView({behavior: "smooth", block: "center"});
                }, 200)
            }
        }
    }

    render () {
        const { isOpen, close, action, coin, store } = this.props
        const { transactionInProgress, hash, err, val, success, inputErrMsg, inputIsValid } = store
        const actioning = action.charAt(0).toUpperCase() + action.slice(1) + "ing"
        return (
            <Container ref={this.boxRef} open={isOpen} tx={transactionInProgress}>
                    <AnimatedContent open={isOpen && transactionInProgress && !err && !success}>
                        <Loading hash={hash} actioning={actioning} value={val} currency={coin.symbol} completed={success} failed={err} />
                    </AnimatedContent>
                    <AnimatedContent open={isOpen && transactionInProgress && err && !success}>
                        <Loading hash={hash} actioning={actioning} value={val} currency={coin.symbol} completed={success} failed={err} />
                    </AnimatedContent>
                    <AnimatedContent open={isOpen && transactionInProgress && !err && success}>
                        <Loading hash={hash} actioning={actioning} value={val} currency={coin.symbol} completed={success} failed={err} />
                    </AnimatedContent>

                    <AnimatedContent open={isOpen && !transactionInProgress }>
                        <Title>{action}</Title>
                        <SubTitle> how much {coin.symbol} would you like to {action}</SubTitle>
                        <Flex >
                            <Flex style={{minWidth: "50%"}} column>
            
                                <div className="currency-input tooltip-container">
                                {this.showSetMax() && <div className="set-max" onClick={this.setMax}>Set Max</div>}
                                    <input type="text" value={val} onChange={this.onInputChange} placeholder={`Amount in ${coin.symbol}`} ref={e => this.input = e} />
                                    {inputErrMsg && <Tooltip bottom={true} className={'warning'}>{inputErrMsg}</Tooltip>}
                                </div>
                                <Unlock coin={coin} action={action}/>
                            </Flex>
                            <FlexItem style={{width: "50%"}}>
                                <button onClick={this.doAction} className={`currency-input-button`}>
                                    {action}
                                </button>
                            </FlexItem>
                        </Flex>
                        <ActionBoxFooter coin={coin} action={action} value={inputIsValid ? val : "0"} hash={hash}/>
                    </AnimatedContent>
            </Container>
        )
    }
}

export default observer(ActionBox)