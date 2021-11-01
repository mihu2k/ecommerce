import * as types from '../type';

export const getCart = () => ({
  type: types.GET_CART_SUCCESS,
});

export const addCart = (product) => ({
  type: types.ADD_CART_SUCCESS,
  payload: product,
});

export const deleteCart = (id) => ({
  type: types.DELETE_CART_SUCCESS,
  payload: id,
});

export const increaseCount = (id) => ({
  type: types.INCREASE_COUNT_SUCCESS,
  payload: id,
});

export const decreaseCount = (id) => ({
  type: types.DECREASE_COUNT_SUCCESS,
  payload: id,
});

export const changeCount = (id, quantity) => ({
  type: types.CHANGE_COUNT_SUCCESS,
  payload: {
    id,
    quantity,
  },
});
