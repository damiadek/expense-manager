import React, { Component } from "react";
import { Modal } from "reactstrap";

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.toggle();
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modal}
                toggle={this.toggle}
                className={this.props.className}
            >
                {this.props.children}
            </Modal>
        );
    }
}

export default CustomModal;
