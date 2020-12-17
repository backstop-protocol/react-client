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

            // update user info, and also refresh after 15 seconds and 30 seconds
            // to handle reorgs
            setTimeout(() => {
                EventBus.$emit("get-user-info");
            }, 1500);

            setTimeout(() => {
                EventBus.$emit("get-user-info");
            }, 5000);

            setTimeout(() => {
                EventBus.$emit("get-user-info");
            }, 19000);

            setTimeout(() => {
                EventBus.$emit("get-user-info");
            }, 30000);            
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
                <div>The Vault remains under your full control, and will start accumulate a user score</div>
                <div><br></br>Read the risks of using B.Protocol</div>
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
