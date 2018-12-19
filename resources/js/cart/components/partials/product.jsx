import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductActions from "./product-actions";
import Card from "./card";
import "../../styles/product.css";

class Product extends Component {
  render() {
    const { product, onAdd, onDelete, onIncrement, onDecrement } = this.props;

    return (
      <div className="col-12 col-md-4 py-5 text-left" key={product.id}>
        <Card
          img={
            <img
              className="card-img-top"
              src={product.image_url}
              alt={product.name}
            />
          }
          style={{}}
          description={
            <React.Fragment>
              <Link to={"products/" + product.id}>{product.name}</Link>
              <br />
              <b>
                <span
                  className="text-black-50 mr-2"
                  style={{ textDecoration: "line-through" }}
                >
                  ${product.price}
                </span>
                ${product.price * 0.5}
              </b>
              {product.in_stock ? (
                <ProductActions
                  product={product}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onDecrement={onDecrement}
                  onIncrement={onIncrement}
                />
              ) : (
                <React.Fragment>
                  <br />
                  <span className="text-danger">out of stock</span>
                </React.Fragment>
              )}
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

export default Product;
