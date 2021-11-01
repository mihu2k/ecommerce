/* eslint-disable no-unused-expressions */
import * as types from '../type';

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART_SUCCESS: {
      const newCart = [...state.cart];
      const isNotExist = newCart.every(
        (product) => product._id !== action.payload._id
      );

      isNotExist && newCart.push(action.payload);

      return {
        ...state,
        cart: newCart,
      };
    }

    case types.GET_CART_SUCCESS: {
      const dataCart = JSON.parse(localStorage.getItem('dataCart'));

      return {
        ...state,
        cart: dataCart ?? [],
      };
    }

    case types.INCREASE_COUNT_SUCCESS: {
      const updateCart = [...state.cart];
      updateCart.forEach((item) => {
        if (item._id === action.payload) item.count += 1;
      });

      return {
        ...state,
        cart: updateCart,
      };
    }

    case types.DECREASE_COUNT_SUCCESS: {
      const updateCart = [...state.cart];
      updateCart.forEach((item) => {
        if (item._id === action.payload) {
          item.count === 1 ? item.count : (item.count -= 1);
        }
      });

      return {
        ...state,
        cart: updateCart,
      };
    }

    case types.CHANGE_COUNT_SUCCESS: {
      const updateCart = [...state.cart];
      const { id, quantity } = action.payload;
      updateCart.forEach((item) => {
        if (item._id === id) {
          item.count = parseInt(quantity);
        }
      });

      return {
        ...state,
        cart: updateCart,
      };
    }

    case types.DELETE_CART_SUCCESS: {
      const updateCart = state.cart.filter(
        (item) => item._id !== action.payload
      );

      return {
        ...state,
        cart: updateCart,
      };
    }

    default:
      return state;
  }
};
