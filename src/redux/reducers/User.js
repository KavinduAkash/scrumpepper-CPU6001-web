import * as actions from '../constants/User';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const initState = {
    user: null
};

const user = (state = initState, action) => {
    switch (action.type) {
        case actions.STORE_USER:
            return {
                ...state,
                user: action.value
            };
        case actions.REMOVE_USER:
            return {
                ...state,
                user: action.value
            };
        default:
            return state;
    }
}


const persistConfig = {
    keyPrefix: "scrum-",
    key: "user",
    storage
}

export default persistReducer( persistConfig, user )
