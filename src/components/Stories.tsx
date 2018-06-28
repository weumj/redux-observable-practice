import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ICombinedStore } from "../store";
import { IStoriesStore, ACTIONS, Story } from "../reducers/storiesReducer";

export function Stories(props: IStoriesStore & { fetchStories: () => void }) {
    if (props.loading) {
        return <p>Please wait...</p>;
    }
    return (
        <div>
            <button
                type="button"
                onClick={props.fetchStories.bind(null, undefined)}
            >
                Load top 5 stories
            </button>
            <StoryList items={props.items} />
        </div>
    );
}

function StoryList(props: IStoriesStore) {
    return (
        <ul>
            {props.items.map(story => (
                <li key={story.id}>
                    <Story story={story} />
                </li>
            ))}
        </ul>
    );
}

function Story({ story }: { story: Story }) {
    return <a href={story.url}>{story.title}</a>;
}

const mapStateToProps = (state: ICombinedStore) => state.stories;
const mapDispatchToProps = bindActionCreators.bind(null, ACTIONS);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stories);
