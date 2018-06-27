import { combineEpics } from "redux-observable";
import { loadStoriesEpic } from "./storiesEpic";
import { fetchUserEpic } from "./usersEpic";

export const rootEpic = combineEpics(loadStoriesEpic, fetchUserEpic);
