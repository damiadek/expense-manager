import React, { Component } from "react";
import Product from "./product";

class Products extends Component {
  render() {
    const {
      children,
      products,
      onAdd,
      onDelete,
      onIncrement,
      onDecrement
    } = this.props;
    return (
      <React.Fragment>
        {children}
        <div className="row">
          {products.map(product => (
            <Product
              key={product.id}
              product={product}
              onAdd={onAdd}
              onDelete={onDelete}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
