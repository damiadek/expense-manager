import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./components/views/home";
import ProductDetails from "./components/views/product-details";
import ProductsView from "./components/views/products-view";

import Navbar from "./components/partials/navbar";

import products from "./data/products";
import cartItems from "./data/cart-items.js";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            cartItems: []
        };

        this.persistState(this.state);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
        this.handleIncrementCartCount = this.handleIncrementCartCount.bind(
            this
        );
        this.handleDecrementCartCount = this.handleDecrementCartCount.bind(
            this
        );
    }

    componentWillMount() {}

    persistState(newState) {
        for (const key in newState) {
            if (newState.hasOwnProperty(key)) {
                localStorage.setItem(key, JSON.stringify(newState[key]));
            }
        }
    }

    performCartActions(product_id, action) {
        let productsById = this.getProductsById();
        let product = action(productsById[product_id]);

        let products = this.objectToArray(productsById);

        this.setState({ products });

        let cartItemsByProductId = this.getCartItemsByProductId();
        let cartItem = cartItemsByProductId[product_id] || {
            id: this.state.cartItems.length + 1,
            product_id: product.id,
            count: 0
        };
        cartItem["count"] = product.cart_count;
        cartItemsByProductId[cartItem.product_id] = cartItem;

        if (cartItem["count"] === 0) {
            delete cartItemsByProductId[cartItem.product_id];
        }

        let cartItems = this.objectToArray(cartItemsByProductId);

        this.setState({ cartItems });
        this.persistState({ products, cartItems });
    }

    objectToArray(object) {
        let array = [];
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                array.push(element);
            }
        }
        return array;
    }

    addToCart(product) {
        if (product.quantity > 0) {
            product.cart_count = 1;
            product.quantity -= 1;
        }
        if (product.quantity === 0) {
            product.in_stock = false;
        }
        return product;
    }

    handleAddToCart(product) {
        this.performCartActions(product, this.addToCart);
    }

    incrementCartCount(product) {
        if (product.quantity > 0) {
            product.cart_count += 1;
            product.quantity -= 1;
        }
        if (product.quantity === 0) {
            product.in_stock = false;
        }
        return product;
    }

    handleIncrementCartCount(product_id) {
        this.performCartActions(product_id, this.incrementCartCount);
    }

    decrementCartCount(product) {
        product.cart_count > 0
            ? (product.cart_count -= 1)
            : (product.cart_count = 0);

        product.quantity += 1;

        if (product.quantity > 0) {
            product.in_stock = true;
        }
        return product;
    }

    handleDecrementCartCount(product_id) {
        this.performCartActions(product_id, this.decrementCartCount);
    }

    removeFromCart(product) {
        product.quantity += product.cart_count;
        product.cart_count = 0;
        if (product.quantity > 0) {
            product.in_stock = true;
        }
        return product;
    }

    handleDeleteFromCart(product_id) {
        this.performCartActions(product_id, this.removeFromCart);
    }

    getProductsById() {
        let productsById = {};
        let cartItemsByProductId = this.getCartItemsByProductId();

        this.state.products.forEach(product => {
            let cartItem = cartItemsByProductId[product.id];
            product.cart_count = cartItem ? cartItem.count : 0;
            productsById[product.id] = product;
        });

        return productsById;
    }

    getCartSummary() {
        let summary = {
            total_price: 0,
            no_of_items: 0
        };

        let products = this.getProductsById();

        this.state.cartItems.forEach(item => {
            summary.no_of_items += 1;

            summary.total_price = Number(
                (
                    summary.total_price +
                    products[item.product_id]["price"] * item.count
                ).toFixed(2)
            );
        });

        return summary;
    }

    getCartItemsByProductId() {
        let cartItemsByProductId = {};

        this.state.cartItems.forEach(item => {
            cartItemsByProductId[item.product_id] = item;
        });

        return cartItemsByProductId;
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <React.Fragment>
                        <Navbar />
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route
                                        path="/products/:id"
                                        render={props => (
                                            <ProductDetails
                                                products={this.state.products}
                                                onAdd={this.handleAddToCart}
                                                onDelete={
                                                    this.handleDeleteFromCart
                                                }
                                                onDecrement={
                                                    this
                                                        .handleDecrementCartCount
                                                }
                                                onIncrement={
                                                    this
                                                        .handleIncrementCartCount
                                                }
                                                productsById={this.getProductsById()}
                                                cartItemsByProductId={this.getCartItemsByProductId()}
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/products"
                                        render={props => (
                                            <ProductsView
                                                products={this.state.products}
                                                onAdd={this.handleAddToCart}
                                                onDelete={
                                                    this.handleDeleteFromCart
                                                }
                                                onDecrement={
                                                    this
                                                        .handleDecrementCartCount
                                                }
                                                onIncrement={
                                                    this
                                                        .handleIncrementCartCount
                                                }
                                                cartItems={this.state.cartItems}
                                                cartSummary={this.getCartSummary()}
                                                productsById={this.getProductsById()}
                                                cartItemsByProductId={this.getCartItemsByProductId()}
                                                {...props}
                                            />
                                        )}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </React.Fragment>
                </Router>
            </Provider>
        );
    }
}

export default App;
