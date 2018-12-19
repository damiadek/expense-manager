import React, { Component } from "react";
import Products from "../partials/products";
import Cart from "../partials/cart";

import { connect } from "react-redux";
import { fetchProducts } from "../../redux/actions/cart-actions";

import PropTypes from "prop-types";

class ProductsView extends Component {
    componentWillMount() {
        this.props.fetchProducts();
    }

    render() {
        console.log(this.props.products);
        return (
            this.props.products.length > 0 && (
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-7">
                            <div className="bg-light text-danger display-1 text-center my-3 font-weight-bold shadow-sm">
                                50% Discount
                            </div>
                            <Products
                                products={this.props.products}
                                onAdd={this.props.onAdd}
                                onDelete={this.props.onDelete}
                                onDecrement={this.props.onDecrement}
                                onIncrement={this.props.onIncrement}
                            >
                                <h2 className="mt-5 mb-2">
                                    Products
                                    {this.props.products.length > 0 && (
                                        <small>
                                            ({this.props.products.length} item
                                            {this.props.products.length > 1 &&
                                                "s"}
                                            )
                                        </small>
                                    )}
                                </h2>
                            </Products>
                            <Cart
                                cartItems={this.props.cartItems}
                                products={this.props.products}
                                onDelete={this.props.onDelete}
                            >
                                <h2 className="mt-5 mb-2">
                                    Cart
                                    {this.props.cartItems.length > 0 && (
                                        <React.Fragment>
                                            <small>
                                                ({this.props.cartItems.length}{" "}
                                                item
                                                {this.props.cartItems.length >
                                                    1 && "s"}
                                                )
                                            </small>
                                            <small className="float-right">
                                                Total:{" "}
                                                <b>
                                                    $
                                                    {
                                                        this.props.cartSummary
                                                            .total_price
                                                    }
                                                </b>
                                            </small>
                                        </React.Fragment>
                                    )}
                                </h2>
                            </Cart>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

ProductsView.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    cartItems: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    products: state.cart.products
});

const mapDispatchToProps = () => ({
    fetchProducts
});

export default connect(
    mapStateToProps,
    { fetchProducts }
)(ProductsView);
