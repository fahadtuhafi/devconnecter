import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Set up a store subscription listener to store the user's token in localStorage

// Initializing current state from redux store for subscription comparison prevents undefined error
let currentState = store.getState();

store.subscribe(() => {
  // Keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();

  // If the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;
