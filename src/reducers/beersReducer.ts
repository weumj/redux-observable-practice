import { Action, AnyAction } from "redux";

const SEARCHED_BEERS = "SEARCHED_BEERS";
const RECEIVED_BEERS = "RECEIVED_BEERS";

export const TYPES = {
    SEARCHED_BEERS,
    RECEIVED_BEERS,
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

export const ACTIONS = {
    searchBeers,
    receiveBeers,
};

export interface IBeersStore {
    loading: boolean;
    beers: Beer[];
}

const initialState: IBeersStore = {
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
