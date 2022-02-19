import * as actions from '../constants/Documents';

export const storeCurrentDocument=(data)=>{
    return {
        type: actions.STORE_CURRENT_DOCUMENT,
        value: data
    }
};

export const removeCurrentDocument=()=>{
    return {
        type: actions.REMOVE_CURRENT_DOCUMENT,
        value: null
    }
};

