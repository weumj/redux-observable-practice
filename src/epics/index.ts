import { combineEpics } from "redux-observable";
import { loadStoriesEpic } from "./storiesEpic";
import { fetchUserEpic } from "./usersEpic";
import { searchBeersEpic } from "./beersEpic";

export const rootEpic = combineEpics(
    loadStoriesEpic,
    fetchUserEpic,
    searchBeersEpic,
);
