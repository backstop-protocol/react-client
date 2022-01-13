import React, {Component} from "react";
import {observer} from "mobx-react"
import { makeAutoObservable, runInAction} from "mobx"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {device} from "../../screenSizes";
import Loading from "../action-panels/Loading"

const Container = styled.div`
  font-size: 17px;
  @media ${device.largeLaptop} {
      font-size: 16px;
  }
  @media ${device.laptop} {
      font-size: 15px;
  }
  letter-spacing: 0.75px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  width: calc(100% - 80px);
  min-height: 10px;
  padding: 20px 40px;
  border-radius: 11px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
  background-color: white;
  margin: 0 40px 140px 40px;
`

const FooterContainer = styled.div`
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
    .set-max.comp{
        font-size: 14px;
        top: 13px;
        @media ${device.largeLaptop} {
            font-size: 13px;
        }
        @media ${device.laptop} {
            font-size: 12px;
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

const CircleX = styled.div`
    opacity: 0;
    visibility: hidden;
    width: 60px;
    height: 60px;
    background: url("${require("../../assets/circle-x-icon.svg")}");
    position: relative;
    left: calc(100% - 85px);
    margin-top: -50px;
    z-index: 0;
    &.show{    
        transition: all 0.5s ease-out;
        z-index: 1000;
        opacity: 1;
        visibility: visible;
        transform: rotate(180deg);
    }
    &.hide{
        transition: none!important;
    }
`

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
`

export const Icon = styled.img`
    width: 40px;
    height: 40px;
    padding: 20px 10px 20px 0;
    display: inline-block;
    @media ${device.largeLaptop} {
        width: 37px;
        height: 37px;
    }
    @media ${device.laptop} {
        width: 32px;
        height: 32px;
    }
`

const GreyText = styled.div`
    margin-bottom: -14px;
    opacity: 0.48;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 14px;
    letter-spacing: 0.6px;
    color: #0b0412;
    @media ${device.largeLaptop} {
        font-size: 11px;
    }
    @media ${device.laptop} {
        font-size: 11px;
    }
`

export const Symbol = styled.div`
    height: 100%;
    text-align: left;
    display: inline-block;
    font-size: 17px;
    letter-spacing: 0.75px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    @media ${device.largeLaptop} {
        font-size: 16px;
    }
    @media ${device.laptop} {
        font-size: 15px;
    }
`

const Header = ()=> {
  return (
    <Flex column>
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
    </Flex>
  )
}

const Main = observer(({actionBoxStore})=> {
  const symbol = 'USDC'

  return (
    <Flex column full> 
      <Flex justifyAround full center>
        <FlexItem style={{width: "25%"}}>
          <Flex alignCenter>
              <Icon src={require(`../../assets/coin-icons/${symbol}.png`)} />
              <Symbol> {symbol} </Symbol>
          </Flex>
        </FlexItem>
        <FlexItem style={{width: "25%"}}>
            7.6%
        </FlexItem>
        <FlexItem style={{width: "25%"}} >
          <Flex column>
              <span >{1234.4321} USDC</span> 
              <GreyText >{1234.4321} ETH</GreyText>
          </Flex>
        </FlexItem>
        <Flex justifyEnd style={{width: "25%"}}>
            <Flex column justifyAround>
                <button onClick={()=>actionBoxStore.openFn("Deposit")} style={{marginBottom: "10px"}}  className="currency-action-button">Deposit</button>
                <button onClick={()=>actionBoxStore.openFn("Withdraw")} className="currency-action-button">Withdraw</button>
            </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
})

class Footer extends Component {

    constructor(props) {
        super(props);
        this.boxRef = React.createRef();
        this.actionBoxStore = props.actionBoxStore
    }
/* 
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
        const {actionBoxStore} = this.props
        actionBoxStore.hash = hash
    }

    doAction = async () => {
        const {coin, action, actionBoxStore} = this.props
        const [inputIsValid, inputErrMsg] = coin.validateInput(actionBoxStore.val, action)
        if(!inputIsValid){
            actionBoxStore.setErrMsg(inputErrMsg)
            return
        }
        try{
            coin.transactionInProgress = action
            actionBoxStore.transactionInProgress = true
            compoundStore.toggleInTx(coin.address, coin)
            await coin[action](actionBoxStore.val, this.onHash)
            actionBoxStore.success = true
        } catch (err){
            actionBoxStore.err = err.message
        }
        finally {
            this.reset()
        }
    }

    onInputChange = (e) => {
        const {coin, action, actionBoxStore} = this.props
        const val = e.target.value;
        const [inputIsValid, inputErrMsg] = coin.validateInput(val, action)
        actionBoxStore.val = val 
        actionBoxStore.inputIsValid = inputIsValid 
        actionBoxStore.setErrMsg(inputErrMsg)
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
        const {coin, action, actionBoxStore} = this.props

        let val = ""
        if(action === ActionEnum.repay){
            val = coin.getMaximum(action)
        }
        if(action === ActionEnum.deposit){
            val = coin.WalletBalanceStr
        }
        if(action === ActionEnum.withdraw){
            val = coin.getMaximum(action)
        }
        const [inputIsValid, inputErrMsg] = coin.validateInput(val, action)
        actionBoxStore.val = displayNum(val, 8)
        actionBoxStore.inputIsValid = inputIsValid 
        actionBoxStore.setErrMsg(inputErrMsg)
    } */

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

    render() {
        const actionBoxStore = this.actionBoxStore
        const {transactionInProgress, err, success, hash, } = actionBoxStore
        const actioning = action.charAt(0).toUpperCase() + action.slice(1) + "ing"
        
        return (
            <FooterContainer open={actionBoxStore.footerType}>
                <AnimatedContent open={transactionInProgress && !err && !success}>
                    <Loading hash={hash} actioning={actioning} value={val} currency={coin.symbol} completed={success} failed={err} />
                </AnimatedContent>
                <AnimatedContent open={transactionInProgress && err && !success}>
                    <Loading hash={hash} actioning={actioning} value={val} currency={coin.symbol} completed={success} failed={err} />
                </AnimatedContent>
                <AnimatedContent open={transactionInProgress && !err && success}>
                    <Loading hash={hash} actioning={actioning} value={val} currency={coin.symbol} completed={success} failed={err} />
                </AnimatedContent>

                <AnimatedContent open={!transactionInProgress }>
                    <Title>{footerType}</Title>
                    <SubTitle> how much {coin.symbol} would you like to {action}</SubTitle>
                    <Flex >
                        <Flex style={{minWidth: "50%"}} column>
        
                            <div className={`currency-input tooltip-container ${showSetMax ? "placeholder-hide" : ""}`}>
                            {showSetMax && <div className="set-max comp" onClick={this.setMax}>Set Max</div>}
                                <input type="text" value={val} onChange={this.onInputChange} placeholder={`Amount in ${symbol}`} ref={e => this.input = e} />
                                {inputErrMsg && <Tooltip bottom={true} className={'warning limited-width'}>{inputErrMsg}</Tooltip>}
                            </div>
                            <Unlock coin={coin} action={action}/>
                        </Flex>
                        <FlexItem style={{width: "50%"}}>
                            <button onClick={this.doAction} className={`currency-input-button`}>
                                {action}
                            </button>
                        </FlexItem>
                    </Flex>
                </AnimatedContent>
            </FooterContainer>
        )

    }
}

class ActionBoxState {
  transactionInProgress = false
  hash = null
  val = ""
  err = ""
  success = ""
  inputIsValid = false
  inputErrMsg = ""
  open = false
  footerType = null

  constructor (){
    makeAutoObservable(this)
  }

  reset = () => {
    this.transactionInProgress = false
    this.hash = null
    this.val = ""
    this.err = ""
    this.success = ""
    this.inputIsValid = false
    this.inputErrMsg = ""
    this.timeout = null
  }

  openFn = (footerType) => {
    this.footerType = footerType
  }

  setErrMsg = (msg) => {
    this.inputErrMsg = msg
    if(this.timeout) {
        clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(()=> {
        runInAction(()=> this.inputErrMsg = "")
    }, 3000)
  }
}

class PureActionBox extends Component {

  constructor(props) {
    super(props);
    this.actionBoxStore = new ActionBoxState()
  }

  render() {
    return (
      <Container>
        <CircleX id={`close-btn-usdc`} className={`${this.actionBoxStore.footerType ? "show" : "hide"}`} onClick={()=> this.actionBoxStore.openFn()}/>
        <Header/>
        <Main actionBoxStore={this.actionBoxStore}/>
        <Footer actionBoxStore={this.actionBoxStore}/>
      </Container>
    )
  }
}

export default observer(PureActionBox)