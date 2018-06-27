import React from "react";
import { connect } from "react-redux";
import { ACTIONS, User, UsersStore } from "../reducers/usersReducer";
import { bindActionCreators } from "redux";
import { ICombinedStore } from "../store";

export function User(props: User) {
    return (
        <div className="user">
            <figure>
                <img src={props.avatar_url} alt="" />
            </figure>
            <p>
                {props.name} ({props.login})
            </p>
        </div>
    );
}

export function Users(props: UsersStore & typeof ACTIONS) {
    return (
        <div>
            <ul>
                {props.users.map(login => (
                    <li key={login}>
                        {login}
                        <button
                            type="button"
                            onClick={props.fetchUserAction.bind(null, login)}
                        >
                            Load user
                        </button>
                    </li>
                ))}
            </ul>
            {props.loading && <p>Please wait!</p>}
            {props.current && <User {...props.current} />}
        </div>
    );
}

const mapStateToProps = (state: ICombinedStore) => state.users;
const mapDispatchToProps = bindActionCreators.bind(null, ACTIONS);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Users);
