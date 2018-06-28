import { Action, AnyAction } from "redux";

const FETCH_STORIES = "FETCH_STORIES";
const FETCH_STORIES_FULFILLED = "FETCH_STORIES_FULFILLED";

export const TYPES = {
    FETCH_STORIES,
    FETCH_STORIES_FULFILLED,
};

export interface FetchStoriesAction extends Action {
    payload: {
        count: number;
    };
}

function fetchStories(count: number = 5): FetchStoriesAction {
    return {
        type: FETCH_STORIES,
        payload: { count },
    };
}

export interface FetchStoriesFulfilledAction extends Action {
    payload: {
        stories: Story[];
    };
}

function fetchStoriesFulfilledAction(
    stories: Story[],
): FetchStoriesFulfilledAction {
    return {
        type: FETCH_STORIES_FULFILLED,
        payload: { stories },
    };
}

export const ACTIONS = {
    fetchStories,
    fetchStoriesFulfilledAction,
};

export interface Story {
    by: string;
    id: number;
    title: string;
    url: string;
}

export interface IStoriesStore {
    loading?: boolean;
    items: Story[];
}
const initialState: IStoriesStore = {
    loading: false,
    items: [],
};

export function storiesReducer(
    state: IStoriesStore = initialState,
    { type, payload }: AnyAction,
): IStoriesStore {
    switch (type) {
        case FETCH_STORIES:
            return {
                ...state,
                items: [],
                loading: true,
            };
        case FETCH_STORIES_FULFILLED:
            return {
                ...state,
                items: payload.stories,
                loading: false,
            };
        default:
            return state;
    }
}
