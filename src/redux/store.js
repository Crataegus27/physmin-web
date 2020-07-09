import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './Reducers/mainReducer';
import uiReducer from './Reducers/UIReducer';

const initialState = {};

const middlewar = [thunk];

const reducers = combineReducers({
    main: mainReducer,
    UI: uiReducer
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enchancer = composeEnhancers(applyMiddleware(...middlewar));
const store = createStore(reducers, initialState, enchancer);

export default store;
