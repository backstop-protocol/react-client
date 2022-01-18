import React from "react";
import WhiteBgViewIcon from "../../assets/view-icon.svg";
import BlacBgViewIcon from "../../assets/view-icon-opeq-bg.svg";
import userStore from "../../stores/user.store"

// TODO: userStore.scannerUrl
export default function View(props) {
  const {hash} = props
  const {blockExplorer} = userStore
  const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const viewIcon = darkMode ? BlacBgViewIcon : WhiteBgViewIcon
  return (
    <div>
        <a className="secondary" href={`https://${blockExplorer}/tx/${hash}`} target="_blank">
            <span>View Transaction</span>
        </a>
    </div>
  )
}
