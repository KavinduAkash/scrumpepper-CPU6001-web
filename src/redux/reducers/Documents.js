import * as actions from '../constants/Documents';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const initState = {
    document: null
};

const documents = (state = initState, action) => {
    switch (action.type) {
        case actions.STORE_CURRENT_DOCUMENT:
            return {
                ...state,
                document: action.value
            };
        case actions.REMOVE_CURRENT_DOCUMENT:
            return {
                ...state,
                document: action.value
            };
        default:
            return state;
    }
}


const persistConfig = {
    keyPrefix: "scrum-",
    key: "document",
    storage
}

export default persistReducer( persistConfig, documents )
