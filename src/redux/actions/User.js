import * as actions from '../constants/User';

export const storeUser=(data)=>{
    return {
        type: actions.STORE_USER,
        value: data
    }
};

export const removeUser=()=>{
    return {
        type: actions.REMOVE_USER,
        value: null
    }
};

