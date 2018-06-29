import { AnyAction } from "redux";
import { ActionsObservable } from "redux-observable";

import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
    switchMap,
    map,
    debounceTime,
    catchError,
    concatMapTo,
    filter,
    pluck,
} from "rxjs/operators";

import { ACTIONS, SearchBeersAction, TYPES } from "../reducers/beersReducer";

const beers = `https://api.punkapi.com/v2/beers`;
const search = (term: string) =>
    `${beers}?beer_name=${encodeURIComponent(term)}`;

export const searchBeersEpic = (action$: ActionsObservable<AnyAction>) =>
    action$.ofType<SearchBeersAction>(TYPES.SEARCHED_BEERS).pipe(
        debounceTime(500),
        pluck<SearchBeersAction, string>("payload", "query"),
        map(query => query.trim()),
        filter(query => query.length > 0),
        switchMap(query =>
            of(ACTIONS.searchBeersLoading(true)).pipe(
                concatMapTo(ajax.getJSON(search(query))),
                map(ACTIONS.receiveBeers),
                catchError(err => of(ACTIONS.searchBeersError(err))),
            ),
        ),
    );
