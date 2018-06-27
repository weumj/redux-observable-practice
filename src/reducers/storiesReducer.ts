import { AnyAction } from "redux";

const LOAD_STORIES = "LOAD_STORIES";
const CLEAR_STORIES = "CLEAR_STORIES";

export const TYPES = {
    LOAD_STORIES,
    CLEAR_STORIES,
};

function loadStories() {
    return {
        type: LOAD_STORIES,
    };
}

function clear() {
    return {
        type: CLEAR_STORIES,
    };
}

export const ACTIONS = {
    loadStories,
    clear,
};

export interface Story {
    by: string;
    id: number;
    title: string;
    url: string;
}

const stories: Story[] = [
    {
        by: "bleakgadfly",
        id: 14967192,
        title: "To Protect Voting, Use Open-Source Software",
        url:
            "https://mobile.nytimes.com/2017/08/03/opinion/open-source-software-hacker-voting.html",
    },
    {
        by: "mtyurt",
        id: 14966545,
        title: "Git: Using Advanced Rebase Features for a Clean Repository",
        url:
            "https://mtyurt.net/2017/08/08/git-using-advanced-rebase-features-for-a-clean-repository/",
    },
    {
        by: "callumlocke",
        id: 14967335,
        title: "Inside an AI brain: What does machine learning look like?",
        url:
            "https://www.graphcore.ai/posts/what-does-machine-learning-look-like",
    },
];

export interface IStoriesStore {
    items: Story[];
}
const initialState: IStoriesStore = {
    items: [],
};

export function storiesReducer(
    state: IStoriesStore = initialState,
    action: AnyAction,
): IStoriesStore {
    switch (action.type) {
        case LOAD_STORIES:
            return {
                ...state,
                items: stories.slice(),
            };
        case CLEAR_STORIES:
            return {
                ...state,
                items: [],
            };
        default:
            return state;
    }
}
