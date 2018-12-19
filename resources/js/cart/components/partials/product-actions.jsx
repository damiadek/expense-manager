import React, { Component } from "react";

import { connect } from "react-redux";
import { handleIncrementCartCount } from "../../redux/actions/cart-actions";

class ProductActions extends Component {
  render() {
    const { product, onAdd, onIncrement, onDecrement, style } = this.props;

    return (
      <div className="py-1" style={style || {}}>
        {product.cart_count === 0 && (
          <button
            className="btn btn-sm btn-default"
            disabled={!product.in_stock}
            onClick={() => onAdd(product.id)}
          >
            add to cart
          </button>
        )}
        {product.cart_count > 0 && (
          <React.Fragment>
            <span className="clearfix">
              <button
                className="btn btn-sm btn-danger mr-2"
                onClick={() => onDecrement(product.id)}
              >
                -
              </button>
              <span>{product.cart_count}</span>
              <button
                className="btn btn-sm btn-success mx-2"
                onClick={() => this.props.handleIncrementCartCount(product.id)}
              >
                +
              </button>
            </span>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.cart.products
});

export default connect(
  mapStateToProps,
  { handleIncrementCartCount }
)(ProductActions);
