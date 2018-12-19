import React, { Component } from "react";
import {
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Form,
    FormGroup,
    FormText,
    Label
} from "reactstrap";
import CustomModal from "../components/modal";

class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle(e) {
        this.props.toggle(e);
    }

    handleChange(e) {
        this.props.handleChange(e);
    }

    handleSubmit(e) {
        this.props.handleSubmit(e);
    }

    render() {
        return (
            <CustomModal
                modal={this.props.modal}
                toggle={this.toggle}
                className=""
            >
                <ModalHeader toggle={this.toggle}>Add Expense</ModalHeader>
                <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="date">Date of Expense</Label>
                            <Input
                                type="date"
                                className="form-control"
                                id="date"
                                name="expenseDate"
                                aria-describedby="expensedate"
                                placeholder="Select date of expense"
                                onChange={this.handleChange}
                                value={this.props.expenseDate}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="value">Value of Expense</Label>
                            <FormText color="muted" className="pl-2">
                                Only Pounds and Euros are acceptable inputs.
                                <br />
                                Type "EUR" after the value for values written in
                                Euros. <br />
                                Other values are accepted as Pounds.
                            </FormText>
                            <Input
                                type="text"
                                className="form-control"
                                id="value"
                                name="expenseValue"
                                min={0}
                                aria-describedby="expenseValue"
                                placeholder="Enter value of expense in"
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                value={this.props.expenseValue}
                                required
                            />
                            <FormText color="danger" className="pl-2">
                                VAT:
                                <b>{this.props.vat}</b>
                            </FormText>
                        </FormGroup>
                        <div className="form-group">
                            <label htmlFor="expenseReason">
                                Expense Reason
                            </label>
                            <textarea
                                className="form-control"
                                id="expenseReason"
                                name="expenseReason"
                                cols="30"
                                rows="3"
                                onChange={this.handleChange}
                                value={this.props.expenseReason}
                                required
                            />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <div className="text-right">
                            <Button color="default" onClick={this.toggle}>
                                Cancel
                            </Button>

                            <Button
                                color="danger"
                                type="submit"
                                className="ml-2"
                            >
                                Save Expense
                            </Button>
                        </div>
                    </ModalFooter>
                </Form>
            </CustomModal>
        );
    }
}

export default AddExpense;
