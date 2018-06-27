import { combineEpics } from "redux-observable";
import { loadStoriesEpic } from "./storiesEpic";

export const rootEpic = combineEpics(loadStoriesEpic);
