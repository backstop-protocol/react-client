import React, { useState } from "react";
import styled from 'styled-components';
import Flex from "styled-flex-component";
import { observer } from 'mobx-react'
import {exportBackToMakerDao} from '../lib/Actions'
import Loading from "./action-panels/Loading";
import { useHistory } from "react-router-dom";

const ExportBtn = styled.div`
    height: 72px;
    min-width: 300px;   
    border-radius: 5px;
    background-color: red;
    color: darkred;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.9px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 16px;
    font-weight: 600;
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
    justify-content: space-between;
    flex-direction: row;
`

const OverideBorder = styled.div`
    min-height: 200px;
    .currency-action-panel {
        border: none;
    }
`

const LeavUs = observer(props => {
    const [wating, setWating] = useState(false)
    const [done, setDone] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [txErr, setTxErr] = useState(false)
    const [hash, setHash] = useState("")
    const history = useHistory()

    const reset = ()=> {
        debugger
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
            const recipt = await exportBackToMakerDao(setHash)
            setDone(true)
            reset()
        }catch (err){
            setTxErr(err)
            reset()
        }
    }

    return (
        <OverideBorder>   
            <Flex full justifyStart column alignCenter>
                { !wating  && 
                    <React.Fragment>
                        <ExportBtn onClick={migrate}>
                            <Centerd>
                                export back to Maker
                            </Centerd>
                        </ExportBtn>
                        <ErrMsg>{errorMsg}</ErrMsg>
                    </React.Fragment>
                }
                { wating && 
                    <Loading style={{ border: 'none'}} hash={hash} actioning={'Exporting your Vault to MakerDAO'} value={''} currency={''} completed={done} failed={txErr} />
                }
            </Flex>
        </OverideBorder>
    )
})

export default LeavUs