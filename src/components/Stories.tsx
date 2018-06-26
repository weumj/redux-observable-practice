import React from "react";
import { connect } from "react-redux";
import { ICombinedStore } from "../store";
import { IStoriesStore } from "../reducers/storiesReducer";

export function Stories(props: IStoriesStore) {
    return (
        <pre>
            <code>{JSON.stringify(props, null, 2)}</code>
        </pre>
    );
}

const mapStateToProps = (state: ICombinedStore) => state.stories;

export default connect(mapStateToProps)(Stories);
