import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import FragLoader from "../FragLoader";
import VIcon from '../../assets/v-icon.svg';
import XIcon from '../../assets/red-x-icon.svg';
import EventBus from "../../lib/EventBus";
import MigrateFromCompoundModal from "./MigrateFromCompoundModal"
import { makeAutoObservable } from "mobx"
import compoundMigrationStore, {MigrationStatus} from "../../stores/compoundMigration.store"
import BlacBgViewIcon from "../../assets/view-icon-opeq-bg.svg";
import {Transition} from 'react-spring/renderprops'
import {isKovan} from "../../lib/Utils"

const MigrationStates = {
    none: {
        icon: "",
        text: "Import"
    },
    pending: {
        icon: "",
        text: "Importing"
    },
    success: {
        icon: VIcon,
        text: "Completed"
    },
    failed: {
        icon: XIcon,
        text: "Failed"
    }
}

class MigrateFromCompound extends Component {

    showMigratePopup() {
        const noWrapper = true
        EventBus.$emit('show-modal', <MigrateFromCompoundModal />, noWrapper);
    }

    render () {
        const kovan = isKovan()
        const {status, hash, supply, borrow} = compoundMigrationStore
        const show = supply.length > 0 || borrow.length > 0
        const extraClass = status !== MigrationStatus.none ? 'currency-action-panel' : '';
        const {icon, text} = MigrationStates[status]
        const btnContainerCls = status !== MigrationStatus.none ? "disabled" : "";
        const delay = show ? 1 : 5000
        return (
            <Transition
                items={show}
                config={{duration: 300}} 
                delay={delay}
                from={{ opacity: 0, height: 0, zIndex: -10}}
                enter={{ opacity: 1 , height: "auto", zIndex: 1}}
                leave={{ opacity: 0, height: 0, zIndex: -10}}>
                {show => show && (props => <div style={props}>
                        <div className="cdp-convert">
                            <div className={`migrate-btn ${btnContainerCls}`} onClick={this.showMigratePopup}>
                                <div className={`centered ${extraClass}`}>
                                    <h3>
                                        {icon && <img className="result" src={icon} />}
                                        {status === MigrationStatus.pending && <FragLoader />}
                                        <span>{text}</span>
                                        
                                    </h3>
                                </div>
                            </div>
                            <p>
                                <span>
                                    Import your account
                                    from Compound  system
                                    to B.Protocol
                                </span>
                               
                                {hash && 
                                    <div className="view-button">
                                        <a href={'https://' + (kovan ? 'kovan.' : '') + 'etherscan.io/tx/' + hash} target="_blank">
                                            <span>View</span>
                                            <img src={BlacBgViewIcon} />
                                        </a>
                                    </div>
                                }
                            </p>
                        </div>
                        <div className="ln"> </div>
                </div>)}
            </Transition>
        )
    }
}

export default observer(MigrateFromCompound)