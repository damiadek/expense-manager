import React, { Component } from "react";
import ProductActions from "../partials/product-actions";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { fetchProducts } from "../../redux/actions/cart-actions";

class ProductDetails extends Component {
  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    const { id } = this.props.match.params;
    let products = this.props.products;

    let product = products[products.findIndex(product => product.id == id)];

    return (
      <div className="container">
        <div className="row justify-content-center pt-5">
          <div className="col-5">
            <img
              className="img img-thumbnail"
              src={product.image_url}
              alt={product.name}
              width={400}
            />
          </div>
          <div className="col-5 pt-5">
            <h2 className="text-info">{product.name}</h2>
            <br />
            <b>
              <span className="display-4">${product.price}</span> per item
            </b>
            <br />
            <br />

            <h4>
              <span
                className={product.in_stock ? "text-secondary" : "text-danger"}
              >
                {product.quantity + " item" + (product.quantity > 1 ? "s" : "")}
              </span>
              <small> in stock</small>
            </h4>
            <ProductActions
              product={product}
              onAdd={this.props.onAdd}
              onDelete={this.props.onDelete}
              onDecrement={this.props.onDecrement}
              onIncrement={this.props.onIncrement}
              style={{
                width: 150,
                fontSize: 38,
                borderRadius: 4
              }}
            />
            <Link className="btn btn-default btn-sm" to="/products">
              <i className="fa fa-arrow-left" /> back to products
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.cart.products
});

const mapDispatchToProps = () => ({
  fetchProducts
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(ProductDetails);
