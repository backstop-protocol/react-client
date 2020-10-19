import React, { Component } from "react";
import MigrationDrawing from "../../assets/images/maker-migration.png";
import EventBus from "../../lib/EventBus";
import { migrateMakerDao } from "../../lib/Actions";

export default class MigrationModal extends Component {
    onMigrate = async () => {
        EventBus.$emit("migration-started");
        EventBus.$emit("close-modal");
        try {
            await migrateMakerDao();
            EventBus.$emit("migration-completed");

            setTimeout(() => {
                EventBus.$emit("get-user-info");
            }, 1500);
        }
        catch (e) {
            EventBus.$emit("migration-failed");
        }
    };

    render() {

        return (
            <div className="migrate">
                <h2>Import your Vault</h2>
                <div><br></br>By importing your MakerDAO Vault you give priority to B.Protocol in the liquidation process</div>
                <div>The Vault remains under your full control, and will start accumulate user rating</div>
                <div><br></br>Read the <a href="/risk" target="_blank">risks</a> of using B.Protocol</div>
                <div><b>B.Protocol does not protect you from liquidations</b></div>
                <div className="migration-drawing">
                    <img src={MigrationDrawing} />
                </div>
                <button className="migration-btn" onClick={this.onMigrate}>
                    Import
                </button>
            </div>
        )
    }
}
