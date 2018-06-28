import { forkJoin, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { switchMap, map, mergeMap } from "rxjs/operators";

import {
    TYPES,
    ACTIONS,
    Story,
    FetchStoriesFulfilledAction,
} from "../reducers/storiesReducer";
import { ActionsObservable } from "redux-observable";
import { AnyAction } from "redux";

const topStories = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
const toItemUrl = (id: number) =>
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

export const loadStoriesEpic = (
    action$: ActionsObservable<AnyAction>,
): Observable<FetchStoriesFulfilledAction> =>
    action$.ofType(TYPES.FETCH_STORIES).pipe(
        switchMap(({ payload: { count } }) =>
            ajax.getJSON<number[]>(topStories).pipe(
                map(ids => ids.slice(0, count)),
                map(ids => ids.map(toItemUrl)),
                map(urls => urls.map(url => ajax.getJSON<Story>(url))),
                mergeMap(reqs => forkJoin(reqs)),
                map(ACTIONS.fetchStoriesFulfilledAction),
            ),
        ),
    );
