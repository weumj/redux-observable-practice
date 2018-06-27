import { ajax } from "rxjs/ajax";
import { switchMap, map } from "rxjs/operators";

import {
    ACTIONS,
    FetchUserAction,
    TYPES,
    User,
} from "../reducers/usersReducer";
import { ActionsObservable } from "redux-observable";
import { AnyAction } from "redux";
import { Observable } from "rxjs/index";

export const fetchUserEpic = (action$: ActionsObservable<AnyAction>) =>
    action$.ofType(TYPES.FETCH_USER).pipe(
        switchMap(
            ({ payload: { login } }: FetchUserAction) =>
                ajax.getJSON(
                    `https://api.github.com/users/${login}`,
                ) as Observable<User>,
        ),
        map(ACTIONS.fetchUserFulfilledAction),
    );
