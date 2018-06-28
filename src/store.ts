import {
    applyMiddleware,
    compose,
    createStore,
    combineReducers,
    AnyAction,
    Middleware,
} from "redux";

import { createEpicMiddleware } from "redux-observable";

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import * as reducers from "./reducers";

import { IStoriesStore } from "./reducers/storiesReducer";
import { UsersStore } from "./reducers/usersReducer";
import { IBeersStore } from "./reducers/beersReducer";

import { rootEpic } from "./epics";

export interface ICombinedStore {
    stories: IStoriesStore;
    users: UsersStore;
    beers: IBeersStore;
}

const epicMiddleware = createEpicMiddleware();

export default function create(initialState: any = {}) {
    const middlewares: Middleware[] = [epicMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];

    const reducer = combineReducers({
        stories: reducers.storiesReducer,
        users: reducers.usersReducer,
        beers: reducers.beersReducer,
    });

    const store = createStore<ICombinedStore, AnyAction, any, any>(
        reducer,
        initialState,
        composeEnhancers(...enhancers),
    );

    epicMiddleware.run(rootEpic);

    return store;
}
