import React from "react";
import WhiteBgViewIcon from "../../assets/view-icon.svg";
import BlacBgViewIcon from "../../assets/view-icon-opeq-bg.svg";
import {isKovan} from "../../lib/Utils"

// TODO: userStore.scannerUrl
export default function View(props) {
  const {hash} = props
  const kovan = isKovan() 
  const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const viewIcon = darkMode ? BlacBgViewIcon : WhiteBgViewIcon
  return (
    <div>
        <a className="secondary" href={'https://' + (kovan ? 'kovan.' : '') + 'etherscan.io/tx/' + hash} target="_blank">
            <span>View on etherscan</span>
        </a>
    </div>
  )
}
