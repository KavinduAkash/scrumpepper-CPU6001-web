import * as actions from '../constants/Poker';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const initState = {
    room: null
};

const poker = (state = initState, action) => {
    switch (action.type) {
        case actions.STORE_CURRENT_POKER_ROOM:
            return {
                ...state,
                room: action.value
            };
        case actions.REMOVE_CURRENT_POKER_ROOM:
            return {
                ...state,
                room: action.value
            };
        default:
            return state;
    }
}


const persistConfig = {
    keyPrefix: "scrum-",
    key: "poker",
    storage
}

export default persistReducer( persistConfig, poker )
