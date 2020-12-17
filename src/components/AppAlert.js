import React, {Component} from "react";
import {numm} from "../lib/Utils";
import EventBus from "../lib/EventBus";
import styled from "styled-components"
import { setTimeout } from "timers";

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
    margin-left: 15px;
    padding: 0 6px;
    color: #bf8517;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid rgb(251, 201, 89);
    border-radius: 6px;
    :hover {
        cursor: pointer;
        opacity: 0.8;
    }
`

export default class AppAlert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alert: false,
            alertMessage: "",
            actionBtn: null,
            actionFn: null
        }
    }

    componentDidMount() {
        EventBus.$on('app-alert',(msg, actionBtn, actionFn) => {
            this.setState({alert: true, alertMessage: msg, actionBtn, actionFn});
        });
    }

    async callActionFn(fn){
        await fn()
        setTimeout(()=> {
            this.setState({alert: false})
        }, 3000)
    }

    render() {

        const {alert, alertMessage, actionBtn, actionFn} = this.state;

        return (
            <div>
                {alert && 
                    <Alert>
                        <span>{alertMessage}</span>
                        {actionBtn && <AlertActionBtn onClick={()=> this.callActionFn(actionFn)}> {actionBtn} </AlertActionBtn>}
                    </Alert>
                }
            </div>
        )
    }
}
