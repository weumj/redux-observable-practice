import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ICombinedStore } from "../store";
import { IStoriesStore, ACTIONS, Story } from "../reducers/storiesReducer";

export function Stories(props: IStoriesStore & typeof ACTIONS) {
    return (
        <div>
            <button type="button" onClick={props.loadStories}>
                Load Top 3 Stories
            </button>
            <button type="button" onClick={props.clear}>
                Clear
            </button>
            <StoryList {...props} />
        </div>
    );
}

function StoryList(props: IStoriesStore) {
    if (props.items.length === 0) {
        return null;
    }
    return (
        <div>{props.items.map(item => <Story {...item} key={item.id} />)}</div>
    );
}

function Story(props: Story) {
    return <p>{props.title}</p>;
}

const mapStateToProps = (state: ICombinedStore) => state.stories;
const mapDispatchToProps = bindActionCreators.bind(null, ACTIONS);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stories);
