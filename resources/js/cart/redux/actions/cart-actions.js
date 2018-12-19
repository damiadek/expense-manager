import {
    INCREMENT_CART_COUNT,
    FETCH_PRODUCTS,
    DECREMENT_CART_COUNT,
    REMOVE_FROM_CART
} from "./types";

import products from "../../data/products";
import cartItems from "../../data/cart-items.js";

const persistState = newState => {
    for (const key in newState) {
        if (newState.hasOwnProperty(key)) {
            localStorage.setItem(key, JSON.stringify(newState[key]));
        }
    }
};

const objectToArray = object => {
    let array = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            array.push(element);
        }
    }
    return array;
};

const incrementCartCount = product => {
    if (product.quantity > 0) {
        product.cart_count += 1;
        product.quantity -= 1;
    }
    if (product.quantity === 0) {
        product.in_stock = false;
    }
    return product;
};

const getProductsById = () => {
    let productsById = {};
    let cartItemsByProductId = getCartItemsByProductId();

    products.forEach(product => {
        let cartItem = cartItemsByProductId[product.id];
        product.cart_count = cartItem ? cartItem.count : 0;
        productsById[product.id] = product;
    });

    return productsById;
};

const getCartItemsByProductId = () => {
    let cartItemsByProductId = {};

    cartItems.forEach(item => {
        cartItemsByProductId[item.product_id] = item;
    });

    return cartItemsByProductId;
};

export const fetchProducts = () => dispatch => {
    products.map(product => {
        let cartItemIndex = cartItems.findIndex(cartItem => {
            return cartItem.product_id == product.id;
        });

        cartItemIndex == -1
            ? (product.cart_count = 0)
            : (product.cart_count = cartItems[cartItemIndex]["count"]);
    });

    dispatch({
        type: FETCH_PRODUCTS,
        payload: { products, cartItems }
    });
};

export const performCartActions = (product_id, action) => {
    let productsById = getProductsById();
    let product = action(productsById[product_id]);

    let products = objectToArray(productsById);

    //   this.setState({ products });

    let cartItemsByProductId = getCartItemsByProductId();
    let cartItem = cartItemsByProductId[product_id] || {
        id: cartItems.length + 1,
        product_id: product.id,
        count: 0
    };

    cartItem["count"] = product.cart_count;
    cartItemsByProductId[cartItem.product_id] = cartItem;

    if (cartItem["count"] === 0) {
        delete cartItemsByProductId[cartItem.product_id];
    }

    let cartItems = objectToArray(cartItemsByProductId);

    //   this.setState({ cartItems });
    persistState({ products, cartItems });

    return dispatch => {
        dispatch({
            type: INCREMENT_CART_COUNT,
            payload: {
                cartItems,
                products
            }
        });
    };
};

export const handleIncrementCartCount = product_id => {
    performCartActions(product_id, incrementCartCount);
};
