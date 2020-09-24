import React, {Component} from "react";
import Logo from "../assets/bprotocol.svg";
import Github from "../assets/github.svg";
import Twitter from "../assets/twitter-icon.svg";
import Linkedin from "../assets/linkedin.svg";
import Discord from "../assets/discord.svg";
import AAVELogo from "../assets/aav-ewhite-logo.svg";
import CompoundLogo from "../assets/compound-logo.svg";
import MakerLogo from "../assets/logo-maker-white.svg";
import EventBus from "../lib/EventBus";
import MigrationModal from "./modals/MigrationModal";
import {numm} from "../lib/Utils";

export default class Sidebar extends Component {

    showMigratePopup() {
        EventBus.$emit('show-modal', <MigrationModal />);
    }


    render() {

        const {userInfo} = this.props;


        return (
            <div className="sidebar">
                <img className="logo" alt="Logo" src={Logo} />
                <div className="ln"> </div>
                <div className="sidebar-content">
                    {(userInfo && userInfo.makerdaoCdpInfo.hasCdp) &&
                        <div>
                        <div className="cdp-convert">
                            <div className="migrate-btn" onClick={this.showMigratePopup}>Migrate</div>
                            <p>Import your CDP<br />from MakerDAO system <br/>to B.Protocol</p>
                            <div className="even">
                                <div>
                                    <small>ETH Locked</small>
                                    <p>{numm(userInfo.makerdaoCdpInfo.ethDeposit, 4)} ETH</p>
                                </div>
                                <div>
                                    <small>DAI Debt</small>
                                    <p>{numm(userInfo.makerdaoCdpInfo.daiDebt, 2)} DAI</p>
                                </div>
                            </div>

                        </div>
                        <div className="ln"> </div>
                        </div>
                    }
                    <div className="products">
                        <div className="product selected">
                            <img src={MakerLogo} />
                        </div>
                        <div className="product">
                            <img src={CompoundLogo} /><small>(Coming soon)</small>
                        </div>
                        <div className="product">
                            <img src={AAVELogo} /><small>(Coming soon)</small>
                        </div>
                    </div>
                    <div className="ln"> </div>

                </div>
                <div className="sidebar-footer">
                    <h3>B.Protocol community</h3>
                    <div className="social-icons">
                        <a href="https://github.com/backstop-protocol" target="_blank"><img src={Github} /></a>
                        <a href="https://twitter.com/bprotocoleth" target="_blank"><img src={Twitter} /></a>
                        <a href="https://www.linkedin.com/company/67182876/admin/" target="_blank"><img src={Linkedin} /></a>
                        <a href="https://discord.gg/3RmqN2K" target="_blank"><img src={Discord} /></a>
                    </div>
                    <p className="credits">&copy; 2020 B.Protocol</p>
                </div>
            </div>
        )
    }
}
