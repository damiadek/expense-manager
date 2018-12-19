import React, { Component } from "react";

class CartItem extends Component {
  render() {
    const { cartItem, product } = this.props;

    return (
      <React.Fragment>
        {cartItem.count > 0 && (
          <div
            className="col-12 border border-default rounded py-2 mb-1"
            key={cartItem.id}
          >
            <b>{product.name}</b> - <b>{cartItem.count}</b> item
            {cartItem.count > 1 && "s"} in cart
            <button
              className="btn btn-sm btn-danger float-right"
              onClick={() => this.props.onDelete(product.id)}
            >
              <i className="fa fa-trash" />
            </button>
            <span className="mx-2 float-right font-weight-bold bg-white text-info p-1 rounded">
              ${cartItem.count * product.price}
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CartItem;
