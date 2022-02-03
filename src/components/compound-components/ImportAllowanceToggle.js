/**
 * @format
 */
import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import Flex, {FlexItem} from "styled-flex-component";
import ActionBoxFooter from "./ActionBoxFooter"
import LoadingRing from "../LoadingRing";
import { depositEth } from "../../lib/compound.interface";
import {device} from "../../screenSizes";
import WhiteBgViewIcon from "../../assets/view-icon.svg";
import {isKovan} from "../../lib/Utils"

const Text = styled.div`
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0b0412;
    @media ${device.largeLaptop} {
        font-size: 13px;
    }
    @media ${device.laptop} {
        font-size: 13px;
    }
`
const Container = styled.div`
    padding-right: 20px; 
    visibility: ${({hide})=> hide ? "hidden" : "visible"}; 
    .tickbox{
        margin: 3px 2px 0 0;
    }
`

class ImportAllowanceToggle extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            locked: !props.coin.hasMigrationAllowance(),
            unlocking: false,
            hash: ""
        }
    }

    onHash = (hash) => {
        this.setState({hash})
    };

    onUnlock = async () => {
        try{
            if(!this.state.locked){
                return
            }
            const {coin} = this.props
            this.setState({unlocking: true});
            await coin.grantImportAllowance(this.onHash)
            this.setState({
                locked: false,
                unlocking: false,
            })
            setTimeout(()=> {
                this.setState({hash: ""})
            }, 3000)
        } catch (err){
            this.setState({
                locked: true,
                unlocking: false,
            })
        }
    }

    render () {
        const kovan = isKovan()
        const {unlocking, locked, hash} = this.state
        const {coin} = this.props
        const text = locked ? `Unlock ${coin.symbol} to continue` : `${coin.symbol} is unlocked`
        return (
            <Container>
                <Flex justifyEnd alignCenter>
                    {hash && <div className="view-button" style={{marginRight: "15px"}} >
                        <a href={'https://' + (kovan ? 'kovan.' : '') + 'etherscan.io/tx/' + hash} target="_blank">
                            <span>View</span>
                            <img src={WhiteBgViewIcon} />
                        </a>
                    </div>}
                    <div id={`${coin.symbol}-allowance-toggle`} className={'tickbox'+(unlocking ? ' loading' : (locked? ' clickable':' active'))} onClick={this.onUnlock}>
                        {unlocking && <LoadingRing />}
                    </div>
                </Flex>
            </Container>
        )
    }
}

export default observer(ImportAllowanceToggle)