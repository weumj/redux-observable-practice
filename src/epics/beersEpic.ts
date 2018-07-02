import { AnyAction } from "redux";
import { ActionsObservable } from "redux-observable";

import { of, concat } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
    switchMap,
    map,
    debounceTime,
    catchError,
    filter,
    pluck,
    takeUntil,
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
            concat(
                of(ACTIONS.searchBeersLoading(true)),
                ajax.getJSON(search(query)).pipe(
                    takeUntil(action$.ofType(TYPES.CANCEL_SEARCH)),
                    map(ACTIONS.receiveBeers),
                    catchError(err => of(ACTIONS.searchBeersError(err))),
                ),
            ),
        ),
    );
