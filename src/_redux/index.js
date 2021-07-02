import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import wilayah from "./wilayah";
import auth from "./auth";

const reducers = combineReducers({
    wilayah,
    auth,
});

const middleware = applyMiddleware(thunk);

const store = createStore(
    reducers,
    process.env.NODE_ENV === "development"
        ? composeWithDevTools(middleware)
        : middleware
);

export { store };
