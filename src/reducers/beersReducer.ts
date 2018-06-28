import { Action, AnyAction } from "redux";

const SEARCHED_BEERS = "SEARCHED_BEERS";
const RECEIVED_BEERS = "RECEIVED_BEERS";
const SEARCHED_BEERS_ERROR = "SEARCHED_BEERS_ERROR";

export const TYPES = {
    SEARCHED_BEERS,
    RECEIVED_BEERS,
    SEARCHED_BEERS_ERROR,
};

export interface Beer {
    id: number | string;
    image_url: string;
    name: string;
    tagline: string;
}

export interface SearchBeersAction extends Action {
    payload: {
        query: string;
    };
}

export function searchBeers(query: string): SearchBeersAction {
    return {
        type: SEARCHED_BEERS,
        payload: { query },
    };
}

export interface ReceivedBeersAction extends Action {
    payload: {
        beers: Beer[];
    };
}

export function receiveBeers(beers: Beer[]): ReceivedBeersAction {
    return {
        type: RECEIVED_BEERS,
        payload: { beers },
    };
}

export interface SearchBeersErrorAction extends Action {
    payload: {
        message: string;
    };
}

export function searchBeersError(error: Error): SearchBeersErrorAction {
    return {
        type: SEARCHED_BEERS_ERROR,
        payload: { message: error.message },
    };
}

export const ACTIONS = {
    searchBeers,
    receiveBeers,
    searchBeersError,
};

export interface ErrorType {
    type: string;
    text: string;
}

export interface IBeersStore {
    loading: boolean;
    beers: Beer[];
    messages: ErrorType[];
}

const initialState: IBeersStore = {
    messages: [],
    beers: [],
    loading: false,
};

export function beersReducer(
    state = initialState,
    { type, payload }: AnyAction,
) {
    switch (type) {
        case SEARCHED_BEERS:
            return {
                ...state,
                loading: true,
                messages: [],
            };
        case SEARCHED_BEERS_ERROR:
            return {
                ...state,
                loading: false,
                messages: [{ type: "error", text: payload.message }],
            };
        case RECEIVED_BEERS:
            return {
                ...state,
                beers: payload.beers,
                loading: false,
            };
        default:
            return state;
    }
}
