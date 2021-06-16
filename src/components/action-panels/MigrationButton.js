import React, { Component } from 'react';
import EventBus from "../../lib/EventBus";
import FragLoader from '../FragLoader';
import VIcon from '../../assets/v-icon.svg';
import XIcon from '../../assets/red-x-icon.svg';
import MigrationModal from '../modals/MigrationModal';

const MigrationStatus = {
    none: 'none',
    pending: 'pending',
    success: 'success',
    failed: 'failed'
}

export default class MigrationButton extends Component {
    constructor(props) {
        super(props);
        this.state = { status: MigrationStatus.none };
        this.showMigratePopup = this.showMigratePopup.bind(this);
    }

    componentDidMount() {
        EventBus.$on('migration-started', () => {
            this.setState({
                status: MigrationStatus.pending
            });
        });
        EventBus.$on('migration-failed', () => {
            this.setState({
                status: MigrationStatus.failed
            });

            setTimeout(() => {
                this.setState({
                    status: MigrationStatus.none
                })
            }, 1500);
        });
        EventBus.$on('migration-completed', () => {
            this.setState({
                status: MigrationStatus.success
            });
        });
    }

    showMigratePopup() {
        if (this.state.status === MigrationStatus.none) {
            EventBus.$emit('show-modal', <MigrationModal />);
        }
    }

    render() {
        const { status } = this.state;
        let text = "", icon = null;

        switch (status) {
            case MigrationStatus.success:
                text = "Completed";
                icon = VIcon;
                break;

            case MigrationStatus.failed:
                text = "Failed";
                icon = XIcon;
                break;

            case MigrationStatus.pending:
                text = "Importing";
                break;

            default:
            case MigrationStatus.none:
                text = "Import";
                break;
        }

        let extraClass = status !== MigrationStatus.none ? 'currency-action-panel' : '';
        let btnContainerCls = status !== MigrationStatus.none ? "disabled" : "";

        return (
            <div className={`migrate-btn ${btnContainerCls}`} onClick={this.showMigratePopup}>
                <div className={`centered ${extraClass}`}>
                    <h3>
                        {icon && <img className="result" src={icon} />}
                        {status === MigrationStatus.pending && <FragLoader />}
                        <span>{text}</span>
                    </h3>
                </div>
            </div>
        );
    }
}
