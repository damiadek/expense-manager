import React, { Component } from "react";
import CartItem from "./cart-item";

class CartItems extends Component {
  render() {
    const { cartItems, children, onDelete, products } = this.props;

    return (
      <React.Fragment>
        {children}
        {cartItems.length === 0 && (
          <h6 className="text-danger">
            No items in cart yet. Add something from the product list above to
            get started
          </h6>
        )}
        {cartItems.map(item => (
          <div className="row" key={item.id}>
            <CartItem
              cartItem={item}
              product={
                products[
                  products.findIndex(product => product.id === item.product_id)
                ]
              }
              onDelete={onDelete}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default CartItems;
