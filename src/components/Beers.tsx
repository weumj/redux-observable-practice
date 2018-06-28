import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ICombinedStore } from "../store";
import { IBeersStore, ACTIONS, ErrorType } from "../reducers/beersReducer";

export function Search({
    defaultValue,
    onChange,
    messages,
}: {
    defaultValue: string;
    onChange: (val: string) => void;
    messages: ErrorType[];
}) {
    return (
        <div className="Search">
            <input
                type="text"
                placeholder="Search for a Beer"
                defaultValue={defaultValue}
                onChange={evt => onChange(evt.target.value)}
            />
            {messages.length > 0 && (
                <ul>
                    {messages.map(message => (
                        <li
                            key={message.text}
                            className={`Message Message--${message.type}`}
                        >
                            {message.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function Beers({ beers, loading }: IBeersStore) {
    return (
        <div className="Beer-List">
            <h3>
                Search Results: ({beers.length}){" "}
                {loading && (
                    <img src="https://rawgit.com/eggheadio-projects/up-and-running-with-redux-observable/aa156d8009629b5d01b6aa76948380c055772f77/Lesson-07/public/ajax-loader.gif" />
                )}
            </h3>
            {beers.length > 0 && (
                <ul>
                    {beers.map(beer => (
                        <li key={beer.id} className="Beer">
                            <figure className="Beer-Image">
                                <img src={beer.image_url} alt="" />
                            </figure>
                            <p>
                                {beer.name} <small>{beer.tagline}</small>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

interface StateProps extends IBeersStore {}
interface DispatchProps {
    searchBeers: typeof ACTIONS.searchBeers;
}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;
interface State {}

export class SearchBeer extends React.Component<Props, State> {
    public render() {
        return (
            <div className="App">
                <Search
                    defaultValue={""}
                    onChange={this.handleBeerSearch}
                    messages={this.props.messages}
                />
                <Beers {...this.props} />
            </div>
        );
    }

    private handleBeerSearch = (query: string) => {
        this.props.searchBeers(query);
    };
}

const mapStateToProps = (state: ICombinedStore) => state.beers;
const mapDispatchToProps = bindActionCreators.bind(null, ACTIONS);

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(SearchBeer);
