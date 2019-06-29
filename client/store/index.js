//Redux
import { applyMiddleware, compose, createStore } from "redux";
import createRootReducer from "../reducers";
//Middleware
//Logger
import logger from "redux-logger";

//Router
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, createMemoryHistory } from "history";

//Sagas
import createSagaMiddleware from "redux-saga";
import rootSaga from "./../sagas";

// import Schemas from "./../api/schemas";

//Create Logger
const composeEnhancers = compose;
//Create Middleware
export const history = !process.browser
? createMemoryHistory() 
: createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
const INITIAL_STATE = {
  stations: {},
};

//Create Store
const store =
  process.env.NODE_ENV === "production"
    ? createStore(
        createRootReducer(history),
        applyMiddleware(routerMiddleware(history), sagaMiddleware)
      )
    : createStore(
        createRootReducer(history),
        INITIAL_STATE,
        composeEnhancers(
          applyMiddleware(
            routerMiddleware(history),
            logger,
            sagaMiddleware
          )
        )
      );

//Run sagas
sagaMiddleware.run(rootSaga);

export default store;
