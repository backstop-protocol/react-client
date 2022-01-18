import React, { Component } from "react";
import {observer} from "mobx-react"
import Flex, {FlexItem} from "styled-flex-component"
import styled from "styled-components"
import { makeAutoObservable, runInAction, observable } from "mobx"
import {device} from "../../screenSizes";
import View from "./View"
import BpLoader from "../style-components/BpLoader"
import VIcon from "../../assets/v-icon.svg";
import XIcon from "../../assets/red-x-icon.svg";
import ANS from "../style-components/AnimateNumericalString"
import {Close} from "../style-components/Buttons"

const AnimatedContent = styled.div`
    height: 100%;
    transition: ${({open}) => open ? "all 0.3s ease-in-out 0.3s" : "" };
    visibility: ${({open}) => open ? "visible" : "hidden" }; 
    position: ${({open}) => open ? "initial" : "absolute" }; 
    opacity: ${({open}) => open ? 1 : 0 }; 
    padding-top: ${({open}) => open ? "40px" : 0 }; 
    margin: 0 40px;
    /* all childern */
    & > * {
        display: ${({open}) => open ? "" : "none" };
    }
`

const AnimatedContainer = styled.div` 
    transition: height 0.3s ease-in-out;
    height: ${({open, height}) => open ? height || "400px" : 0 }; 
`

const ErrorMessage = ({children}) => {
  if(!children) return null
  return (
    <small style={{
        color: "var(--del-color)",
        display: "block",
        position: "relative",
        top: "0",
        left: "0",
        height: "var(--spacing)",
        marginTop: "calc(0px - var(--spacing))",
      }}>
      {children}
    </small>
  )
}

const Unlock = observer(({grantAllowance, hasAllowance, allowanceInProgress, asset, action}) => {
  let msg = hasAllowance ? `${asset} is unlocked` : `Unlock ${asset} to continue`
  if(allowanceInProgress) {
    msg = `Unlocking ${asset}`
  }
  return (
    <div style={{width: "50%", minWidth: "300px", marginRight: "var(--grid-spacing-horizontal)", pointerEvents: hasAllowance ? "none" : "auto", visibility: action === "Deposit" ? "visible" : "hidden"}}>
          <Flex justifyBetween alignCenter>
            <label htmlFor="switch">
              {msg}
            </label>
            <input aria-busy={allowanceInProgress} onChange={grantAllowance} checked={hasAllowance} type="checkbox" id="switch" name="switch" role="switch"/>
          </Flex>
    </div>
  )
})

const SpFooterContent = observer((props) => {
  const {footerIsOpen, txInProgress, action, err, inputErrMsg, inputIsValid, inputIsInvalid, hash, walletBalance, closeFooter, asset, onInputChange, val, collaterals, withdrawValues} = props.store
  const {grantAllowance, hasAllowance, allowanceInProgress, collPercnet, usdPercnet } = props.store
  let doAction = action === "Deposit" ? props.store.deposit : props.store.withdraw
  return (
    <div>
      <Close onClick={()=>closeFooter()}/>
        <h2>{action}</h2>
        <div>
          <div>
            <p>How much <strong>{asset}</strong> would you like to {action}?</p>
            <Flex wrap>
              <input value={val} onChange={onInputChange} style={{width: "50%", minWidth: "300px", marginRight: "var(--grid-spacing-horizontal)"}}type="number" step="0.01" placeholder={`Amount in ${asset}`} aria-invalid={inputIsInvalid} required/> 
              <div style={{width: "25%", minWidth: "180px"}}>
                <button disabled={inputIsInvalid} onClick={()=> doAction(val)}>{action}</button>
              </div>
            </Flex>
            <ErrorMessage>{inputErrMsg}</ErrorMessage>
            {action == "Deposit" && <Unlock {...{grantAllowance, hasAllowance, allowanceInProgress, asset, action}} />}
          </div>
        </div>
        {action == "Deposit" && <div>
            <div style={{paddingTop: "var(--spacing)"}}>Wallet Balance</div>
            <div className="grid">
              <p>
                <ANS val={walletBalance} decimals={4}/> <strong>{asset}</strong>
              </p>
            </div>
          </div>}
        {action == "Withdraw" && <div>
          <div style={{paddingTop: "var(--spacing)"}}>Current Withdraw Values</div>
          <div className="grid">
            <p>
              <small> {usdPercnet}% </small> <br/>
              <ANS val={withdrawValues.usd} decimals={4}/> <strong>{asset}</strong> 
            </p>
            <p>
              <small> {collPercnet}% in collateral ({collaterals.map(coll => <strong>{coll.symbol} </strong>)})</small> <br/>
              <ANS val={withdrawValues.coll} decimals={4}/> <strong>{asset}</strong> <br/>
            </p>
          </div>
        </div>}
    </div>
  )
})

const ClaimContent = observer((props) => {
  const {footerIsOpen, txInProgress, action, err, inputErrMsg, inputIsValid, inputIsInvalid, hash, walletBalance, closeFooter, asset, onInputChange, val, collaterals, withdrawValues} = props.store
  const {grantAllowance, hasAllowance, allowanceInProgress, collPercnet, usdPercnet, reward } = props.store
  let doAction = props.store.claimReward
  if(!reward) return null
  return (
    <div>
      <Close onClick={()=>closeFooter()}/>
        <h2>Claim Reward</h2>
          <Flex column>
            <div>
              <h4>
                <ANS val={reward.unclaimed} decimals={4}/> <strong>{reward.symbol}</strong>
              </h4>
              <div style={{width: "25%", minWidth: "180px"}}>
                <button disabled={inputIsInvalid} onClick={()=> doAction(val)}>{action}</button>
              </div>
            </div>
            <div>
              <div style={{paddingTop: "var(--spacing)"}}>Wallet Balance</div>
              <div className="grid">
                <p>
                  <ANS val={reward.balance} decimals={4}/> <strong>{reward.symbol}</strong>
                </p>
              </div>
            </div>
          </Flex>
    </div>
  )
})

const TxMessage = styled.h5`
  margin: 0;
  padding: 0 var(--spacing);
  opacity: 0;
  animation: fadein 1s forwards;
`

const ResIcon = styled.img`
  width: 20px;
  opacity: 0;
  animation: fadein 1s forwards;
`

const SpTx = observer((props)=> {
  const {txInProgress, hash, action, val, asset, success, err} = props.store
  const msg =`${action}ing ${val} ${asset} `
  return (
      <Flex column justifyCenter full>
        <Flex justifyBetween alignCenter full>
          {!err && !success && <Flex alignCenter>
              <BpLoader color="var(--contrast)"/>
              <TxMessage>{msg}</TxMessage>
            </Flex>}
          {err && 
            <Flex alignCenter>
              <ResIcon src={XIcon} />
              <TxMessage>{msg + "failed"}</TxMessage>
            </Flex>}
          {success && <Flex alignCenter>
              <ResIcon src={VIcon} />
              <TxMessage>{msg + "completed"}</TxMessage>
            </Flex>}
          {hash && 
            <View hash={hash} />}
         </Flex>
      </Flex>
  )
})

const SpFooter = observer((props)=> {
  const {footerIsOpen, action, errMsg, tx, walletBalance, closeFooter, txInProgress} = props.store
  const depositBoxIsOpen = footerIsOpen && action == "Deposit" && !txInProgress
  const withdrawBoxIsOpen = footerIsOpen && action == "Withdraw" && !txInProgress
  const claimBoxIsOpen = footerIsOpen && action == "Claim" && !txInProgress
  return (
    <AnimatedContainer open={footerIsOpen} height={txInProgress ? "200px" : null}>
      <footer style={{height: "100%"}}>
        <AnimatedContent open={depositBoxIsOpen}>
          <SpFooterContent store={props.store}/>
        </AnimatedContent>
        <AnimatedContent open={withdrawBoxIsOpen}>
          <SpFooterContent store={props.store}/>
        </AnimatedContent>
        <AnimatedContent open={claimBoxIsOpen}>
          <ClaimContent store={props.store}/>
        </AnimatedContent>
        <AnimatedContent open={txInProgress} >
          <SpTx store={props.store}/>
        </AnimatedContent>
      </footer>
    </AnimatedContainer>
  )
})

class SpActionBox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {asset, userShareInUsd, apy, walletBalance, tvl, footerIsOpen, action, openFooter, closeFooter, reward} = this.props.store
    return (
    <article>
      <Flex justifyBetween alignCenter wrap column={false}>
          <strong>{asset}</strong>
          <Flex column alignCenter justifyBetween style={{padding: "0 --spacing"}}>
            <div>$<ANS val={userShareInUsd} decimals={2}/></div>
            <small>Balance</small>
          </Flex>
          <Flex column alignCenter justifyBetween style={{padding: "0 --spacing"}}>
            <div>{apy}%</div>
            <small>APY</small>
          </Flex>
          <Flex column alignCenter justifyBetween style={{padding: "0 --spacing"}}>
            <div>$<ANS val={tvl} decimals={2}/></div>
            <small>TVL</small>
          </Flex>
          <Flex column alignCenter justifyBetween style={{padding: "0 var(--spacing)"}}>
            <a onClick={()=>openFooter("Deposit")}>Deposit</a>
            <a onClick={()=>openFooter("Withdraw")}>Withdraw</a>
            {reward && <a onClick={()=>openFooter("Claim")}>Claim</a>}
          </Flex>
      </Flex>
      <SpFooter store={this.props.store}/>
    </article>
    )
  }
}

export default observer(SpActionBox)