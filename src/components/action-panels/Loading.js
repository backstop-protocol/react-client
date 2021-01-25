import React, { Component } from "react";
import WhiteBgViewIcon from "../../assets/view-icon.svg";
import BlacBgViewIcon from "../../assets/view-icon-opeq-bg.svg";
import BIcon from "../../assets/b-icon.svg";
import VIcon from "../../assets/v-icon.svg";
import XIcon from "../../assets/red-x-icon.svg";
import FragLoader from "../FragLoader";

const blackBgStyle = {
    color: '#647686', 
    fill: '#647686', 
    'flex-direction': 'column', 
    'justify-content': 'space-between',
    height: '91px',
    padding: 0,
}

export default class Loading extends Component {

    render() {
        const kovan = parseInt(window.ethereum.chainId) === parseInt("0x2A")
        const { actioning, value, currency, completed, failed, hash, blackBg } = this.props;

        const icon = completed ? VIcon : (failed ? XIcon : BIcon);
        const resultText = completed ? 'Completed' : (failed ? 'Failed' : '');
        const ViewIcon = blackBg ? BlacBgViewIcon : WhiteBgViewIcon
        const extraStyle = blackBg ? blackBgStyle : {}

        return (
            <div style={extraStyle} className="currency-action-panel centered">
                <h3>
                    {completed || failed && <img className="result" src={icon} />}
                    {(!completed && !failed) && <FragLoader />}

                    <span>{actioning} {value} {currency} {resultText}</span></h3>
                {(!failed && hash) && <div className="view-button">
                    <a href={'https://' + (kovan ? 'kovan.' : '') + 'etherscan.io/tx/' + hash} target="_blank">
                        <span>View</span>
                        <img src={ViewIcon} />
                    </a>
                </div>}
            </div>
        )
    }
}
