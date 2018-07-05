import { switchMap, map } from "rxjs/operators";

import {
    ACTIONS,
    FetchUserAction,
    TYPES,
    User,
} from "../reducers/usersReducer";
import { ActionsObservable } from "redux-observable";
import { AnyAction } from "redux";
import { Observable } from "rxjs";
import { ICombinedStore } from "../store";

export const fetchUserEpic = (
    action$: ActionsObservable<AnyAction>,
    store: ICombinedStore,
    dependencies: { ajax: { getJSON: <T>(url: string) => Observable<T> } },
) =>
    action$.ofType(TYPES.FETCH_USER).pipe(
        switchMap(
            ({ payload: { login } }: FetchUserAction) =>
                dependencies.ajax.getJSON(
                    `https://api.github.com/users/${login}`,
                ) as Observable<User>,
        ),
        map(ACTIONS.fetchUserFulfilledAction),
    );
