import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from 'styled-components';
import ReactTooltip from "react-tooltip"
import mainStore from "../stores/main.store"
import apyStore from "../stores/apy.store"
import {toCommmSepratedString} from '../lib/Utils'
import liquityStore from "../stores/main.liquity.store"
import mainHundredStore from "../stores/main.hundred.store"

const ToolTipLine = styled.div`
    min-width: 160px;
    padding: 5px;
    font-family: "Poppins", sans-serif;
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    /* div:first-child {${({withTab})=> withTab ? "padding-left: 10px;" : ""})}} */
`

const ToolTipTitle = styled.div`
    min-width: 300px;
    padding: 5px 5px 0 5px;
    font-family: "Poppins", sans-serif;
    color: black;
    opacity: 0.5;
    border-bottom: 1px;
    border-bottom-style: solid;
    border-bottom-color: grey;
    display: flex;
    justify-content: space-between;
`

class TvlTooltip extends React.Component {
  
  render() {
    const { liquityTvlNumeric } = liquityStore
    const totalDeposits = parseFloat(apyStore.totalCollateral) + liquityTvlNumeric + mainHundredStore.TVL
    return (
      <span className="tooltip-container">
        <a data-tip data-for="tvl-tooltip">
          <img className="info-icon" src={require("../assets/i-icon-green.svg")} />
        </a>
        <ReactTooltip id="tvl-tooltip" className="react-tooltip-custom" effect='solid' type="light" place="right">
          <ToolTipLine>
            <div> total deposits: </div>
            <div> ${toCommmSepratedString(parseFloat(totalDeposits).toFixed(2))} </div>
          </ToolTipLine>
          <ToolTipLine>
            <div> total debt: </div>
            <div> ${toCommmSepratedString(parseFloat(apyStore.totalDebt).toFixed(2))} </div>
          </ToolTipLine>

          <ToolTipTitle>
            <span> Maker </span>
            <span>  </span>
          </ToolTipTitle>
          <ToolTipLine withTab>
            <div> deposits: </div>
            <div> ${toCommmSepratedString(parseFloat(apyStore.makerTotalCollateral).toFixed(2))} </div>
          </ToolTipLine>
          <ToolTipLine withTab>
            <div> debt: </div>
            <div> ${toCommmSepratedString(parseFloat(apyStore.makerTotalDebt).toFixed(2))} </div>
          </ToolTipLine>

          <ToolTipTitle>
            <span> Compound </span>
            <span>  </span>
          </ToolTipTitle>
          <ToolTipLine withTab>
            <div> deposits: </div>
            <div> ${toCommmSepratedString(parseFloat(apyStore.compoundTotalCollateral).toFixed(2))} </div>
          </ToolTipLine>
          <ToolTipLine withTab>
            <div>  debt: </div>
            <div> ${toCommmSepratedString(parseFloat(apyStore.compoundTotalDebt).toFixed(2))} </div>
          </ToolTipLine>
          <ToolTipTitle>
            <span> Liquity </span>
            <span>  </span>
          </ToolTipTitle>
          <ToolTipLine withTab>
            <div style={{textTransform: "none"}}>Deposits: </div>
            <div> ${toCommmSepratedString((liquityTvlNumeric).toFixed(2))} </div>
          </ToolTipLine>
          <ToolTipTitle>
            <span> Hundred </span>
            <span>  </span>
          </ToolTipTitle>
          <ToolTipLine withTab>
            <div style={{textTransform: "none"}}> Arbitrum: </div>
            <div> ${toCommmSepratedString((mainHundredStore.hundredTvlArbitrum).toFixed(2))} </div>
          </ToolTipLine>
          <ToolTipLine withTab>
            <div style={{textTransform: "none"}}> Fantom: </div>
            <div> ${toCommmSepratedString((mainHundredStore.hundredTvlFantom).toFixed(2))} </div>
          </ToolTipLine>
        </ReactTooltip>
      </span>
    )
  }
}

export default observer(TvlTooltip)