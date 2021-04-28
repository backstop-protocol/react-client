import React, { Component } from "react";
import routerStore from "../stores/router.store"
import {observer} from "mobx-react"
import {makeAutoObservable, runInAction} from 'mobx';
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component"
import ConnectButton from "../components/ConnectButton"
import userStore from "../stores/user.store"
import ConnectWallet from "../assets/connect-your-wallet.svg"
import BproClaimModal from "../components/modals/BproClaimModal"
import BproCompound from "../lib/genesis/compound_merkle.json"
import BproMaker from "../lib/genesis/maker_merkle.json"
import {makerGenesisIsClaimed, compoundGenesisIsClaimed, makerGenesisClaim, compoundGenesisClaim} from "../lib/claimInterface"
import {ApiAction} from "../lib/ApiHelper"
import Web3 from "web3"
const {fromWei} = Web3.utils

class GenesisStore {
  cantClaimMaker = true
  cantClaimCompound = true
  constructor (){
    makeAutoObservable(this)
  }

  getClaims(user){
    return {
      maker: BproMaker.claims[user],
      compound: BproCompound.claims[user]
    }
  }

  checkIfBproIsClaimed = async () =>{
    try{
      const {web3, user} = userStore
      const {maker, compound} = this.getClaims(user)
      const promises = [
        maker ? makerGenesisIsClaimed(web3, maker.index) : Promise.resolve(true),
        compound ? compoundGenesisIsClaimed(web3, compound.index) : Promise.resolve(true)
      ]
      const [cantClaimMaker, cantClaimCompound] = await Promise.all(promises)
      runInAction(()=> {
        this.cantClaimCompound = cantClaimCompound
        this.cantClaimMaker = cantClaimMaker
      })
    } catch(err){
      console.error(err)
    }
  }
}

export const genesisStore = new GenesisStore()

class GenesisClaim extends Component {

  constructor (props) {
    super(props)
    this.state = {
      cantClaimMaker: true,
      cantClaimCompound: true
    }
  }

  componentDidMount() {
    routerStore.setRouteProps(this.props.history) 
  }

  getClaimProps({maker, compound}){
    const {web3, user} = userStore
    const bproMakerClaimProps = {}
    bproMakerClaimProps.header = "BPRO Maker Genesis"
    bproMakerClaimProps.balance = maker && maker.amount ? parseFloat(fromWei(maker.amount)).toFixed(9) : "0"
    bproMakerClaimProps.disabled = !maker
    bproMakerClaimProps.cantClaim = genesisStore.cantClaimMaker
    bproMakerClaimProps.action = ()=> {
      if(!user){
        userStore.showConnect()
        return
      }
      const tx = makerGenesisClaim(web3, maker.index, user, maker.amount, maker.proof)
      return ApiAction(tx, user, web3).then(genesisStore.checkIfBproIsClaimed)
    }
    
    const bproCompoundClaimProps = {}
    bproCompoundClaimProps.header = "BPRO Compound Genesis"
    bproCompoundClaimProps.balance = compound && compound.amount ? parseFloat(fromWei(compound.amount)).toFixed(9) : "0"
    bproCompoundClaimProps.disabled = !compound
    bproCompoundClaimProps.cantClaim = genesisStore.cantClaimCompound
    bproCompoundClaimProps.action = ()=> {
      if(!user){
        userStore.showConnect()
        return
      }
      const tx = compoundGenesisClaim(web3, compound.index, user, maker.amount, compound.proof)
      return ApiAction(tx, user, web3).then(genesisStore.checkIfBproIsClaimed)
    }

    return { bproMakerClaimProps, bproCompoundClaimProps }
  }

  render() {
    const {user} = userStore 
    const claims = genesisStore.getClaims(user)
    const {bproMakerClaimProps, bproCompoundClaimProps} = this.getClaimProps(claims)
    const { handleItemChange, history } = this.props
    const {cantClaimCompound, cantClaimMaker} = this.state
    return (
      <div className="item-page-content">
        <div className="menu-item-header" style={{ height: "176px" }}>
          <div className="container" >
            <div className="split title-bar">
              <h1 style={{fontSize: "2em", fontWeight: "bold"}}>BPRO Genesis Claim</h1>
              <div className="connect-container">
                  <ConnectButton />
                  {(userStore.displayConnect || false)&& <div className="connect-wallet">
                    <i> </i>
                    <h3>Connect your wallet</h3>
                    <img src={ConnectWallet} />
                  </div>}
                  {(userStore.displayTermsRequired || false)&& <div className="connect-wallet">
                    <h3 style={{padding: "5px", textAlign: "center"}}>to connect <br/> please go over <br/>the terms and conditions <br/>  and click on agree</h3>
                </div>}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ height: "calc(100vh - 176px)" }}
        >
        <div className="container" style={{paddingTop: "20px" }}>
          <Flex justifyAround>
            <BproClaimModal {...bproMakerClaimProps}/>
            <BproClaimModal {...bproCompoundClaimProps}/>
          </Flex>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(GenesisClaim)
