import { ajax } from "rxjs/ajax";
import { switchMap, map, debounceTime } from "rxjs/operators";

import { ACTIONS, SearchBeersAction, TYPES } from "../reducers/beersReducer";
import { ActionsObservable } from "redux-observable";
import { AnyAction } from "redux";

const beers = `https://api.punkapi.com/v2/beers`;
const search = (term: string) =>
    `${beers}?beer_name=${encodeURIComponent(term)}`;

export const searchBeersEpic = (action$: ActionsObservable<AnyAction>) =>
    action$.ofType<SearchBeersAction>(TYPES.SEARCHED_BEERS).pipe(
        debounceTime(500),
        switchMap(({ payload: { query } }) => ajax.getJSON(search(query))),
        map(ACTIONS.receiveBeers),
    );
