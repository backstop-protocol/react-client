import React, {Component} from "react";
import XIcon from "../assets/x-icon.svg";
import EventBus from "../lib/EventBus";

export default class ModalContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            component : null,
            noWrapper : null,
            show: false
        }
    }

    componentDidMount() {
        EventBus.$on('show-modal', this.showModalBox.bind(this));
        EventBus.$on('close-modal', this.closeModalBox.bind(this));
    }

    showModalBox(component, noWrapper) {
        document.body.style.overflow = "hidden"; // ADD THIS LINE
        this.setState({component, noWrapper, show: true});
    }

    closeModalBox = () => {
        this.setState({component: <div></div>, show: false});
        document.body.style.overflow = "auto"; // ADD THIS LINE
    };

    render() {
        const {component, noWrapper, show} = this.state;
        const cls = show ? 'modal-container active' : 'modal-container';

        return (
            <div className={cls}>
                {this.state.component && !noWrapper &&
                    <div className="modal-dialog">
                        <div className="modal-close-btn" onClick={this.closeModalBox}>
                            <img src={XIcon} />
                        </div>
                        <div >
                            {component}
                        </div>
                    </div>
                }
                {this.state.component && noWrapper && 
                    <div>
                        {component}
                    </div>
                }
            </div>
        )
    }
}
