import { Observable, of } from "rxjs";
import { toArray } from "rxjs/operators";
import { ActionsObservable } from "redux-observable";
import { fetchUserEpic } from "./usersEpic";
import { ICombinedStore } from "../store";

import { ACTIONS } from "../reducers/usersReducer";

it("should return userFulfilled action", () => {
    const userName = "user";
    const action$ = ActionsObservable.of(ACTIONS.fetchUserAction(userName));

    const depens = {
        ajax: {
            getJSON: () =>
                of({
                    avatar_url: "avatar",
                    name: userName,
                    login: userName,
                }) as Observable<any>,
        },
    };

    const output$ = fetchUserEpic(action$, {} as ICombinedStore, depens);

    output$.pipe(toArray()).subscribe(actions => {
        expect(actions[0]).toBe(
            ACTIONS.fetchUserFulfilledAction({
                avatar_url: "avatar",
                name: userName,
                login: userName,
            }),
        );
    });
});
