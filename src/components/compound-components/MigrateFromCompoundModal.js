import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import XIcon from "../../assets/x-icon.svg";
import EventBus from "../../lib/EventBus"
import Flex, {FlexItem} from "styled-flex-component";
import CoinStatusEnum from "../../lib/compound.util"
import compoundMigrationStore from "../../stores/compoundMigration.store"
import MigrationAssetList from "./MigrationAssetList";
import infographic from "../../assets/images/compound-import-popup.png"
import {device} from "../../screenSizes"

const Container = styled.div`
    width: 1075px;
    padding: 0 0 23px;
    border-radius: 5px;
    box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.2), 0 0 8px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden;
    overflow-y: scroll;
    max-height: 90vh;
    @media ${device.largeLaptop} {
        width: 994px;
    }
    @media ${device.laptop} {
        width: 894px;
    }
`

const GreenRectangle = styled.div`
    width: 100%;
    height: 237px;
    background-image: linear-gradient(182deg, rgba(37, 192, 104, 0) 83%, rgba(12, 233, 108, 0.45) 115%), linear-gradient(to bottom, #f2fbf6, #f2fbf6);
    @media ${device.largeLaptop} {
        height: 218px;
    }
    @media ${device.laptop} {
        height: 196px;
    }
`

const CompoundMigrationImg = styled.img`
    margin-top: 32px;
    height: 64px;
    @media ${device.largeLaptop} {
        margin-top: 29px;
        height: 59;
    }
    @media ${device.laptop} {
        margin-top: 26px;
        height: 53px;
    }
`

const Content = styled.div`
    margin-top: -237px;
    @media ${device.largeLaptop} {
        margin-top: -218px;
    }
    @media ${device.laptop} {
        margin-top: -196px;
    }
`

const Title = styled.div`
    margin-top: 15px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 35px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.6px;
    color: #17111e;
    @media ${device.largeLaptop} {
        margin-top: 14px;
        font-size: 32px;
    }
    @media ${device.laptop} {
        margin-top: 13px;
        font-size: 29px;
    }
`

const AssetsLists = styled.div`
    margin-top: 40px;
    width: 100%;
    @media ${device.largeLaptop} {
        margin-top: 37px;
    }
    @media ${device.laptop} {
        margin-top: 33px;
    }
    ${({disabled}) => {
        if (disabled){
            return `
                pointer-events: none;
            `
        }
    }}
`

const ExplainerText = styled.div`
    width: 694px;
    margin-top: 40px;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.65px;
    text-align: center;
    color: #17111e;
    @media ${device.largeLaptop} {
        font-size: 12px;
        margin-top: 37px;
    }
    @media ${device.laptop} {
        font-size: 11px;
        margin-top: 33px;
    }
`

const ActionButton = styled.div`
position: relative;
  width: 263px;
  height: 59px;
  border-radius: 4.2px;
  background-color: #12c164;
  color: white;
  font-size: 16.6px;
  font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
  transition: opacity .1s ease-in-out;
  &:hover {
      opacity: 0.8;
  }

  ${({disabled}) => {
        if (disabled){
            return `
                pointer-events: none;
                background-color: grey;
            `
        }
    }}
`

const Risks = styled.div`
    width: 427px;
    margin-top: 9px;
    opacity: 0.62;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 11px;
    letter-spacing: 0.55px;
    text-align: center;
    color: #17111e;
`

const ErrText = styled.div`
    padding-top: 20px;
    min-height: 40px;
    opacity: 0.6;
    font-family: "NeueHaasGroteskDisp Pro Md", sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.55px;
    text-align: center;
    color: red;
    @media ${device.largeLaptop} {
        font-size: 13px;
        min-height: 37px;
    }
    @media ${device.laptop} {
        font-size: 12px;
        min-height: 33px;
    }
    
`

class MigrateFromCompoundModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMsg: "",
            hash: ""
        }
    }
    
    closeModalBox (){
        EventBus.$emit('close-modal');
    }

    migrate (supply, borrow) {
        // validateSupplyHasAllowance
        const supplyHasAllowance = compoundMigrationStore.validateSupplyHasAllowance(supply)
        if(supplyHasAllowance){
            compoundMigrationStore.migrateFromCompound(supply, borrow, this.closeModalBox)
        }
    }

    render () {
        const {supply, borrow} = compoundMigrationStore
        const borrowCanBeCoverd = compoundMigrationStore.validateBorrowCanBeCovered(borrow)

        return (
            <Container>
                <GreenRectangle>
                    
                    <div className="modal-close-btn" style={{margin: "0px", padding: "30px"}} onClick={this.closeModalBox}>
                        <img src={XIcon} />
                    </div>
                </GreenRectangle>
                <Content>
                    <Flex column full alignCenter>
                        <CompoundMigrationImg src={infographic}/>
                        <Title>
                            Import your account
                        </Title>
                        <AssetsLists disabled={!borrowCanBeCoverd}>
                            <Flex justifyCenter alignStart>
                            {!!supply.length && <MigrationAssetList type="deposit" list={supply}/>}
                            {!!borrow.length && <MigrationAssetList type="borrow" list={borrow}/>}
                            </Flex>
                        </AssetsLists>

                        <ExplainerText>
                            By Importing your Compound account, you give priority to B.Protocol in the liquidation process. <br/>
                            The account remains under your full control and you will start accumulating B.Protocol’s score. <br/><br/>
                            
                            In order to Import you need to unlock each of your collateral, and to confirm each transaction separately. <br/>
                        </ExplainerText>

                        <ErrText>
                            {compoundMigrationStore.validationErr}
                        </ErrText>
                        
                        <ActionButton className={borrowCanBeCoverd ? "clickable" : ""} disabled={!borrowCanBeCoverd} onClick={()=> this.migrate(supply, borrow)}>
                            <div style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)"
                            }}>IMPORT</div>
                        </ActionButton>
                        <Risks>
                            Read the <a href="/risk" target="_blank">risks</a> of using B.Protocol <br/>
                            B.Protocol doesn’t protect you from liquidations
                        </Risks>
                    </Flex>
                </Content>
            </Container>
        )
    }
}

export default observer(MigrateFromCompoundModal)