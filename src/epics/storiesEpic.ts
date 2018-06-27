import { of, OperatorFunction } from "rxjs";
import { switchMap, delay } from "rxjs/operators";

import { ACTIONS, TYPES } from "../reducers/storiesReducer";
import { ActionsObservable } from "redux-observable";
import { Action, AnyAction } from "redux";

export const loadStoriesEpic = (action$: ActionsObservable<AnyAction>) =>
    action$.ofType(TYPES.LOAD_STORIES).pipe(
        switchMap(() => of(ACTIONS.clear())) as OperatorFunction<
            Action<typeof TYPES.LOAD_STORIES>,
            Action<typeof TYPES.CLEAR_STORIES>
        >,
        delay(2000),
    );
