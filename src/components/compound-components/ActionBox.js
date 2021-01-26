import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import ActionBoxFooter from "./ActionBoxFooter"
import Unlock from "./Unlock"
import TxInProgress from "./TxInProgress"
import Loading from "../action-panels/Loading"
import Tooltip from "../Tooltip"
import {ActionEnum} from "../../lib/compound.util"
import compoundStore from "../../stores/compound.store"

const Container = styled.div`
    transition: all 0.3s ease-in-out;
    height: ${({open, tx}) => {
        if (!open) return 0
        if (!tx) return "310px"
        if (tx) return "100px"
    }};
    .currency-input-button{
        text-transform: capitalize;
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
`

const SubTitle = styled.div`
    margin-top: 8px;
    margin-bottom: 11px;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #0b0412;
`

class ActionBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            transactionInProgress: false,
            hash: null,
            val: "",
            err: "",
            inputIsValid: false,
            inputErrMsg: ""
        }
    }

    reset = () => {
        setTimeout(()=> {
            this.setState({
                transactionInProgress: false,
                hash: null,
                val: "",
                err: "",
                success: false
            })
            this.props.close()
        }, 3000)
    }

    onHash = hash => {
        this.setState({hash})
    }

    doAction = async () => {
        try{
            const {coin, action} = this.props
            this.setState({transactionInProgress: true})
            await coin[action](this.state.val, this.onHash)
            this.setState({success: true})
            this.reset()
        } catch (err){
            this.setState({err: err.message})
            this.reset()
        }
    }

    onInputChange = (e) => {
        const {coin, action} = this.props
        const val = e.target.value;
        const [inputIsValid, inputErrMsg] = coin.validateInput(val, action)
        this.setState({val, inputIsValid, inputErrMsg});
    };

    render () {
        const { isOpen, close, action, coin } = this.props
        const { transactionInProgress, hash, err, val, success, inputErrMsg, inputIsValid } = this.state
        const actioning = action.charAt(0).toUpperCase() + action.slice(1) + "ing"
        return (
            <Container open={isOpen} tx={transactionInProgress}>
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
                            <Flex style={{width: "50%"}} column>
            
                                <div className="currency-input tooltip-container">
                                    <input type="text" value={this.state.val} onChange={this.onInputChange} placeholder={`Amount in ${coin.symbol}`} ref={e => this.input = e} />
                                    {inputErrMsg && <Tooltip bottom={true} className={'warning'}>{inputErrMsg}</Tooltip>}
                                </div>
                                <Unlock coin={coin}/>
                            </Flex>
                            <FlexItem style={{width: "50%"}}>
                                <button onClick={this.doAction} className={`currency-input-button ${!inputIsValid ? "disabled" : ""}`} disabled={!inputIsValid}>
                                    {action}
                                </button>
                            </FlexItem>
                        </Flex>
                        <ActionBoxFooter coin={coin} action={action} value={inputIsValid ? val : "0"} hash={this.state.hash}/>
                    </AnimatedContent>
            </Container>
        )

    }
}

export default observer(ActionBox)