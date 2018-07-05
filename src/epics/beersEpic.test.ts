import { Observable, from, VirtualTimeScheduler } from "rxjs";
import createStore from "../store";

import { ACTIONS, Beer } from "../reducers/beersReducer";

it("should return userFulfilled action", () => {
    const beer: Beer = {
        id: "kolsh",
        image_url: "kolsh",
        name: "kolsh",
        tagline: "kolsh",
    };

    const scheduler = new VirtualTimeScheduler();
    const depens = {
        scheduler,
        ajax: {
            getJSON: () => from([[beer]]) as Observable<any>,
        },
    };

    const store = createStore({}, depens);
    const action = ACTIONS.searchBeers("kolsh");

    store.dispatch(action);
    scheduler.flush();

    // console.dir(store.getState().beers);
    expect(store.getState().beers.beers.length).toBe(1);
});
