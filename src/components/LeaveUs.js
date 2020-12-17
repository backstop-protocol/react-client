import React, { useState } from "react";
import styled from 'styled-components';
import Flex, {FlexItem} from "styled-flex-component";
import { observer } from 'mobx-react'
import {exportBackToMakerDao} from '../lib/Actions'
import Loading from "./action-panels/Loading";
import { useHistory } from "react-router-dom";
import EventBus from "../lib/EventBus";
import { setTimeout } from "timers";
import {refreshUserInfo} from '../lib/Actions'

const ExportBtn = styled.div`
    border-radius: 6px;
    background-color: rgba(31, 173, 92, 0.2);
    height: 45px;
    width: 100%;
    padding: 12px;
    font-family: grotesk-display, sans-serif;
    font-size: 14px;
    font-weight: 550;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.7px;
    color: #17ab57;
    white-space: nowrap;
    :hover{
        cursor: pointer;
    }
`

const Line = styled.div`
    margin: 30px 0;
    background-color: rgba(100, 118, 134, 0.3);
    height: 1px;
`

const ErrMsg = styled.div`
    margin: 5px;
    color: red;
    font-size: 16px;
    font-weight: 500;
`

const Centerd = styled.a`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const OverideBorder = styled.div`
    margin: 0 20px;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .currency-action-panel {
        border: none;
    }
`

const ExportIcon = styled.img`
    margin-left: 14px;
    width: 16px;
    height: 16px;
`

const Text = styled.div`
    color: #647686;
    margin: 20px 0;
    font-size: 14px;
    line-height: 1.29;
    letter-spacing: 0.88px;
`

const LeavUs = observer(props => {
    const [wating, setWating] = useState(false)
    const [done, setDone] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [txErr, setTxErr] = useState(false)
    const [hash, setHash] = useState("")
    const history = useHistory()

    const reset = ()=> {
        setTimeout(()=> {
            setDone(false)
            setTxErr(false)
            setWating(false)
            history.push('/app')
        }, 2500)
    }

    let migrate = async () => {
        try{
            if (!props.userInfo) { 
                if (props.showConnect){
                    props.showConnect();
                } 
                return false;
            }
            if(!props.userInfo.bCdpInfo.hasCdp){
                setErrorMsg("you dont have a vault in b.protocol")
                return 
            } 
            setErrorMsg("")
            setWating(true)
            await exportBackToMakerDao(setHash)
            setDone(true)
            refreshUserInfo()
            reset()
        }catch (err){
            setTxErr(err)
            reset()
        }
    }

    return (
        <OverideBorder>   
            <Flex full justifyBetween column contentStretch alignCenter>
                { !wating  && 
                    <div>
                        <ExportBtn onClick={migrate}>
                            <Centerd>
                                EXPORT TO MAKER
                                <ExportIcon src={require("../assets/export-icon.svg")} />
                            </Centerd>
                        </ExportBtn>
                        <ErrMsg>{errorMsg}</ErrMsg>
                        <Text>
                            Export your Vault
                            from B.Protocol system
                            to MakerDAO
                        </Text>
                    </div>
                }
                { wating && 
                    <FlexItem grow>
                        <Loading blackBg={true} hash={hash} actioning={'Exporting your Vault to MakerDAO'} value={''} currency={''} completed={done} failed={txErr} />
                    </FlexItem>
                }
            </Flex>
            <Line/>
        </OverideBorder>
    )
})

export default LeavUs
