import * as actions from '../constants/Corporate';

const initState = {
    corporate_id: 0,
    id: 1
};

const corporate = (state = initState, action) => {
    switch (action.type) {
        case actions.STORE_CORPORATE_ID:
            console.log("corporate_id", action.value);
            return {
                ...state,
                corporate_id: action.value
            };
        default:
            return state;
    }
}

export default corporate;
