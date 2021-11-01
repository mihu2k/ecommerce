import { combineReducers } from 'redux';

// Reducers
import { productReducer } from './product.reducer';
import { cartReducer } from './cart.reducer';

export const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});
