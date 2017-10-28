import {combineReducers} from "redux";

const user = (state={
    fetching: false,
    auth: "",
    fail: false
}, action) => {
    switch(action.type) {
        case "REQUEST_USER":
            return Object.assign({}, state, {fetching: true});
        case "RECEIVE_USER":
            return Object.assign({}, state, {fetching: false, auth: action.auth, fail: false});
        case "FAIL_USER":
            return Object.assign({}, state, {fail: true});
        default:
            return state;
    }
}

export default combineReducers({
    user
});