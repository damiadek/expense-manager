import {
  INCREMENT_CART_COUNT,
  DECREMENT_CART_COUNT,
  REMOVE_FROM_CART,
  FETCH_PRODUCTS
} from "../actions/types";

const initialState = {
  products: [],
  cartItems: []
};

const CartReducer = (state = initialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        ...payload
      };

    case INCREMENT_CART_COUNT:
      break;

    case DECREMENT_CART_COUNT:
      break;

    case REMOVE_FROM_CART:
      break;

    default:
      return state;
  }
};

export default CartReducer;
