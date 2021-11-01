import { createStore } from 'redux';
import { rootReducer } from './redux/reducers';

const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};

export default configureStore;
