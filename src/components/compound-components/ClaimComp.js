import React, {Component} from "react";
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import {observer} from "mobx-react"
import {device} from "../../screenSizes";
import compoundStore from "../../stores/compound.store";
import FragLoader from "../FragLoader";
import WhiteBgViewIcon from "../../assets/view-icon.svg";
import VIcon from "../../assets/v-icon.svg";
import XIcon from "../../assets/red-x-icon.svg";

const Overide = styled.div`
    border: none;
    padding: 0;
    &.currency-action-panel svg{
        width: 30px;
    }
    .result{
        width: 20px;
    }

`

const Container = styled.div`
    img{
        width: 30px;
        height: 30px;
    }
    button.currency-input-button{
        font-size: 13px;
        margin-bottom: 0;
        height: 30px;
        @media ${device.largeLaptop} {
            font-size: 12px;
        }
        @media ${device.laptop} {
            font-size: 11px;
        }
        .view-button{
            img{
                width: 20px;
                height: 20px;
            }
        }
    }
`

const ClaimStatus = {
    none: "none",
    success: "success",
    failed: "failed",
    inProgress: "inProgress",
}

class ClaimComp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            hash: "",
            status: ClaimStatus.none
        }
    }

    onHash = (hash) => {
        this.setState({hash})
    }

    claim = async () => {
        try{
            this.setState({status: ClaimStatus.inProgress})
            await compoundStore.claimComp(this.onHash)
            this.setState({status: ClaimStatus.success})
        } catch (err){
            this.setState({status: ClaimStatus.failed})
        } finally {
            setTimeout(()=> {
                this.setState({status: ClaimStatus.none})
            }, 5000)
        }

        
    }

    render () {
        const disabled = this.props.compBalance == "0" 
        const {hash, status} = this.state
        const kovan = parseInt(window.ethereum.chainId) === parseInt("0x2A")

        return (
            <Container>
                <Flex full justifyBetween>
                    {status == ClaimStatus.none && 
                        <React.Fragment>
                        <img src={require("../../assets/com-icon-bl.svg")}/>
                        <button onClick={this.claim} className={`currency-input-button ${disabled ? "disabled" : ""}`} disabled={disabled}>
                                <span>Claim Comp</span>
                        </button>
                        </React.Fragment>
                    }
                    {status != ClaimStatus.none &&
                        <React.Fragment>    
                            <Overide className="currency-action-panel">
                                {status == ClaimStatus.inProgress && <FragLoader />}
                                {status == ClaimStatus.success && <img className="result" src={VIcon} />}
                                {status == ClaimStatus.failed && <img className="result" src={XIcon} />}
                            </Overide>
                            {hash && <div className="view-button">
                                <a href={'https://' + (kovan ? 'kovan.' : '') + 'etherscan.io/tx/' + hash} target="_blank">
                                    <span>View</span>
                                    <img src={WhiteBgViewIcon} />
                                </a>
                            </div>}
                        </React.Fragment>
                    }
                </Flex>
            </Container>
        )
    }
}

export default observer(ClaimComp)