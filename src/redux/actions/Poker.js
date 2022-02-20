import * as actions from '../constants/Poker';

export const storePokerRoom=(data)=>{
    return {
        type: actions.STORE_CURRENT_POKER_ROOM,
        value: data
    }
};

export const removePokerRoom=()=>{
    return {
        type: actions.REMOVE_CURRENT_POKER_ROOM,
        value: null
    }
};

