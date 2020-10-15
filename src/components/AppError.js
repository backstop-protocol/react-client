import React, {Component} from "react";
import {numm} from "../lib/Utils";
import EventBus from "../lib/EventBus";

export default class AppError extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false
        }
    }

    componentDidMount() {
        EventBus.$on('app-error',() => {
            this.setState({error: true});
            setTimeout(() => {
                this.setState({error: false});
            }, 3000)
        });

    }

    render() {

        const {error} = this.state;

        return (
            <div className="app-error-container">
                {error && <div className="app-error">A MetaMask error has occured</div>}
            </div>
        )
    }
}
