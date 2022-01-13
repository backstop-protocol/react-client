import React, {Component} from "react";
import {numm} from "../lib/Utils";
import EventBus from "../lib/EventBus";
import styled from "styled-components"
import { setTimeout } from "timers";
import LoadingRing from "./LoadingRing";

const Alert = styled.div`
    display: flex;
    color: #bf8517;
    background-color: white;
    background-image: linear-gradient(rgba(251, 201, 89, 0.3), rgba(251, 201, 89, 0.3));
    font-size: 12px;
    justify-content: center;
    align-items: center;
    height: 27px;
`

const AlertActionBtn = styled.div`
    min-width:  80px;
    margin-left: 15px;
    padding: 0 6px;
    color: #bf8517;
    text-align: center;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid rgb(251, 201, 89);
    border-radius: 6px;
    :hover {
        cursor: pointer;
        opacity: 0.8;
    }
`

const Overides = styled.div`
    min-width:  80px;
    margin-left: 15px;
    padding: 0 30px;
    transform: scale(0.7);
    .lds-ring div {
        border-color: #bf8517 transparent transparent transparent;
    }
`

export default class AppAlert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alert: false,
            alertMessage: "",
            actionBtn: null,
            actionFn: null,
            waiting: null
        }
    }

    componentDidMount() {
        EventBus.$on('app-alert',(msg, actionBtn, actionFn) => {
            this.setState({alert: !!msg, alertMessage: msg, actionBtn, actionFn});
        });
    }

    async callActionFn(fn){

        try{
            this.setState({waiting: true})
            await Promise.all([fn(), new Promise((resolve, reject)=> {setTimeout(resolve, 3000)})])
        } catch (err){
            console.error(err)
        } finally {
            this.setState({waiting: false})
        }
    }

    render() {
        const {alert, alertMessage, actionBtn, actionFn, waiting} = this.state;
        return (
            <div>
                {alert && 
                    <Alert>
                        <span>{alertMessage}</span>
                        {actionBtn && 
                            <div>
                                {!waiting && <AlertActionBtn onClick={()=> this.callActionFn(actionFn)}> {actionBtn} </AlertActionBtn>}
                                {waiting && <Overides><LoadingRing /></Overides>}
                            </div>
                        }
                    </Alert>
                }
            </div>
        )
    }
}
