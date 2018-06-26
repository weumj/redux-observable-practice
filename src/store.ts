import {
    applyMiddleware,
    compose,
    createStore,
    combineReducers,
    AnyAction,
    Middleware,
} from "redux";

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import * as reducers from "./reducers";

import { IStoriesStore } from "./reducers/storiesReducer";

export interface ICombinedStore {
    stories: IStoriesStore;
}

export default function create(initialState: any = {}) {
    const middlewares: Middleware[] = [];
    const enhancers = [applyMiddleware(...middlewares)];

    const reducer = combineReducers({
        stories: reducers.storiesReducer,
    });

    const store = createStore<ICombinedStore, AnyAction, any, any>(
        reducer,
        initialState,
        composeEnhancers(...enhancers),
    );

    return store;
}
