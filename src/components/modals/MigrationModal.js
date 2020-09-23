import React, {Component} from "react";
import MigrationDrawing from "../../assets/images/maker-migration.png";

export default class MigrationModal extends Component {

    render() {

        return (
            <div className="migrate">
                <h2>Migrate your CDP</h2>
                <div className="migration-drawing">
                    <img src={MigrationDrawing} />
                </div>
                <button className="migration-btn">Migrate</button>
            </div>
        )
    }
}
