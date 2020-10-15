import React, {Component} from "react";
import XIcon from "../assets/x-icon.svg";
import EventBus from "../lib/EventBus";

export default class ModalContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            component : null
        }
    }

    componentDidMount() {
        EventBus.$on('show-modal', this.showModalBox.bind(this));
        EventBus.$on('close-modal', this.closeModalBox.bind(this));
    }

    showModalBox(component) {
        this.setState({component});
    }

    closeModalBox = () => {
        this.setState({component: null});
    };

    render() {
        const {component} = this.state;
        const cls = component !== null ? 'modal-container active' : 'modal-container';

        return (
            <div className={cls}>
                {this.state.component &&
                    <div className="modal-dialog">
                        <div className="modal-close-btn" onClick={this.closeModalBox}>
                            <img src={XIcon} />
                        </div>
                        <div>
                            {component}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
