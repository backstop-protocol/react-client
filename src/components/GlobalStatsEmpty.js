import React, {Component} from "react";
import DollarIcon from "../assets/bp-icon-gold.svg";
import Pulser from "./Pulser";
import {Observer} from "mobx-react"


export default class GlobalStats extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (          
        <Observer>
            {() => 
                <div className="overlay-container">
                    <div className={`global-stats even`}>
                        <div className="image-container">
                            <Pulser />
                            <img src={DollarIcon} className="dollar-icon floating centered" />
                        </div>
                        <div style={{backgroundColor: "red"}} className="image-container">
                        </div>
                    </div>
                </div>
            } 
        </Observer>
        )
    }
}
