import React, { Component } from "react";
import { Button, Table, Card, Col } from "reactstrap";
import AddExpense from "../components/add-expense";
import ExpenseItem from "../components/expense-item";
import axios from "axios";

class ExpensesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            expenseDate: this.getShortDate(),
            expenseReason: "",
            expenseValue: 1,
            vat: 0,
            modal: false,
            EUR: false
        };

        this.toggle = this.toggle.bind(this);
        this.createExpense = this.createExpense.bind(this);
        this.getEuroConversion = this.getEuroConversion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setEuroValue = this.setEuroValue.bind(this);
    }

    componentDidMount() {
        let value = parseInt(this.state.expenseValue).toFixed(2);
        let vat = (value - value / 1.2).toFixed(2);

        this.setState({
            vat: vat
        });

        this.getEuroConversion().then(response =>
            this.setState({
                EUR: response
            })
        );

        axios.get("/expenses").then(
            response => {
                let expenses = response.data;
                this.setState({ expenses });
            },
            error => console.log(error)
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        if (e.target.name == "expenseValue") {
            let value = this.state.expenseValue;

            value = parseFloat(this.state.expenseValue).toFixed(2);
            let vat = (value - value / 1.2).toFixed(2);

            if (vat > 0)
                this.setState({
                    vat: vat
                });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let value = this.state.expenseValue;
        let EUR = value.toString().indexOf("EUR") !== -1;

        this.setState(prevState => {
            return {
                expenseValue: parseFloat(prevState.expenseValue).toFixed(2)
            };
        });

        if (EUR) {
            if (this.state.EUR) {
                this.setEuroValue();
                this.createExpense();
            } else {
                this.getEuroConversion().then(
                    response => {
                        this.setState({
                            EUR: response
                        });
                        this.setEuroValue();
                        this.createExpense();
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        } else {
            this.createExpense();
        }
    }

    async getEuroConversion() {
        try {
            const response = await axios.get(
                `https://ratesapi.io/api/latest?base=EUR&symbols=GBP`
            );
            return response.data.rates.GBP;
        } catch (error) {
            return false;
        }
    }

    setEuroValue() {
        this.setState(prevState => {
            return {
                expenseValue: parseFloat(
                    parseFloat(this.state.EUR) * prevState.expenseValue
                ).toFixed(2)
            };
        });
    }

    createExpense() {
        let value = this.state.expenseValue;
        let vat = this.state.vat;

        if (value.toString().indexOf("EUR") !== -1) {
            value = (parseFloat(this.state.EUR) * parseFloat(value)).toFixed(2);
            vat = (value - value / 1.2).toFixed(2);
        }

        axios
            .post("/expenses", {
                value: value,
                reason: this.state.expenseReason,
                expense_date: this.state.expenseDate,
                vat: vat
            })
            .then(
                response => {
                    let expenses = [...this.state.expenses];
                    expenses.push(response.data);
                    this.setState({ expenses });
                    this.toggle();
                    this.resetInputs();
                },
                error => console.log(error)
            );
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    resetInputs() {
        this.setState({
            expenseDate: this.getShortDate(),
            expenseReason: "",
            expenseValue: 1
        });
    }

    getShortDate() {
        let date = new Date();
        return (
            date.getFullYear() +
            "-" +
            (parseInt(date.getMonth()) + 1) +
            "-" +
            date.getDate()
        );
    }

    render() {
        return (
            <Col sm="12" md="6" className="p-5">
                {this.state.expenses.length > 0 ? (
                    <React.Fragment>
                        <div>
                            <h4>
                                Expenses
                                <Button
                                    className="btn btn-sm btn-danger float-right"
                                    onClick={this.toggle}
                                >
                                    Add Expense
                                </Button>
                            </h4>
                        </div>
                        <div className="table-responsive p-2">
                            <Table
                                striped
                                hover={true}
                                className="shadow rounded p-3"
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Expense Value (&#163;)</th>
                                        <th>VAT (&#163;)</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.expenses.map(
                                        (expense, index) => (
                                            <ExpenseItem
                                                expense={expense}
                                                index={index}
                                                key={expense.id}
                                            />
                                        )
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Card body>
                            <h1 className="text-center mb-5 mt-5">
                                <i className="fa fa-coin" />
                                <br />
                                No Expenses yet
                            </h1>
                            <Button
                                className="btn btn-lg btn-danger"
                                onClick={this.toggle}
                            >
                                Create new Expense
                                <i className="fa fa-plus-square ml-3" />
                            </Button>
                        </Card>
                    </React.Fragment>
                )}

                <AddExpense
                    modal={this.state.modal}
                    toggle={this.toggle}
                    expenseDate={this.state.expenseDate}
                    expenseValue={this.state.expenseValue}
                    vat={this.state.vat}
                    expenseReason={this.state.expenseReason}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </Col>
        );
    }
}

export default ExpensesView;
