import axios from "axios";
import nprogress from "nprogress";

const requestUser = () => {
    return {
        type: "REQUEST_USER"
    }
}

const receiveUser = (auth) => {
    return {
        type: "RECEIVE_USER",
        auth
    }
}

const failUser = () => {
    return {
        type: "FAIL_USER"
    }
}

export const fetchUser = () => {
    return dispatch => {
        nprogress.start();
        dispatch(requestUser());
        return axios.get("/api/auth").then(res => {
            dispatch(receiveUser());
            nprogress.done();
        }).catch(err => {
            throw err;
        });
    }
}

export const login = (username, password) => {
    return dispatch => {
        nprogress.start();
        return axios.post("/api/login", {username, password}).then(res => {
            if(res.data) {
                dispatch(receiveUser(res.data));
            } else {
                dispatch(failUser());
            }
            nprogress.done();
        }).catch(err => {
            throw err;
        });
    }
}

export const logout = () => {
    return dispatch => {
        nprogress.start();
        return axios.post("/api/logout").then(res => {
            dispatch(receiveUser(res.data));
            nprogress.done();
        }).catch(err => {
            throw err;
        });
    }
}