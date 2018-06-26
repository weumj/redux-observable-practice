import { AnyAction } from "redux";

export interface IStoriesStore {
    items: any[];
}
const initialState: IStoriesStore = {
    items: [],
};

export function storiesReducer(
    state: IStoriesStore = initialState,
    action: AnyAction,
): IStoriesStore {
    return state;
}
