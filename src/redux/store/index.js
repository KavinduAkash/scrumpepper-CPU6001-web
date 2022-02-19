import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

function configureStore(preloadedState) {
 
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  const persistConfig = {
    key: "root",
    storage
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  const store = createStore(persistedReducer, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  const persistor = persistStore(store);
  return store;
}

const store = configureStore();

export default store;

