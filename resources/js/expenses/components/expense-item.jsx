import React, { Component } from "react";

class ExpenseItem extends Component {
    render() {
        const { index, expense } = this.props;

        return (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{expense.expense_date}</td>
                <td>{expense.value}</td>
                <td>{expense.vat}</td>
                <td>{expense.reason}</td>
            </tr>
        );
    }
}

export default ExpenseItem;
