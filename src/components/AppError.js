import React, {Component} from "react";
import {numm} from "../lib/Utils";
import EventBus from "../lib/EventBus";

export default class AppError extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMessage : ""
        }
    }

    componentDidMount() {
        EventBus.$on('app-error',(err) => {
            this.setState({error: true, errorMessage: err || "A MetaMask error has occured"});
            console.error(err)
            setTimeout(() => {
                this.setState({error: false});
            }, 3000)
        });

    }

    render() {

        const {error} = this.state;

        return (
            <div>
                {error && <div className="app-error">{this.state.errorMessage}</div>}
            </div>
        )
    }
}
