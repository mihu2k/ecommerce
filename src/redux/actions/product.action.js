import * as types from '../type';

export const getProducts = () => ({
  type: types.GET_PRODUCTS_SUCCESS,
});

export const getProduct = (id) => ({
  type: types.GET_PRODUCT_SUCCESS,
  payload: id,
});
