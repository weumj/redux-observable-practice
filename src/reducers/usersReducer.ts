import { Action, AnyAction } from "redux";

const FETCH_USER = "FETCH_USER";
const FETCH_USER_FULFILLED = "FETCH_USER_FULFILLED";

export const TYPES = {
    FETCH_USER,
    FETCH_USER_FULFILLED,
};

export interface FetchUserAction extends Action {
    payload: {
        login: string;
    };
}

function fetchUserAction(login: any): FetchUserAction {
    return {
        type: FETCH_USER,
        payload: { login },
    };
}

export interface FetchUserFullfilledAction extends Action {
    payload: {
        user: User;
    };
}
function fetchUserFulfilledAction(user: User): FetchUserFullfilledAction {
    return {
        type: FETCH_USER_FULFILLED,
        payload: { user },
    };
}

export const ACTIONS = {
    fetchUserAction,
    fetchUserFulfilledAction,
};

export interface User {
    avatar_url: string;
    name: string;
    login: string;
}

export interface UsersStore {
    users: string[];
    current: User | null;
    loading: boolean;
}
const initialState: UsersStore = {
    users: ["shakyshane", "sindresorhus", "substack"],
    current: null,
    loading: false,
};

export function usersReducer(
    state = initialState,
    action: AnyAction,
): UsersStore {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                current: null,
                loading: true,
            };
        case FETCH_USER_FULFILLED:
            return {
                ...state,
                current: action.payload.user,
                loading: false,
            };
        default:
            return state;
    }
}

export default usersReducer;
