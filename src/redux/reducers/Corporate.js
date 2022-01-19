import * as actions from '../constants/Corporate';

const initState = {
    corporate_id: 0
};

const corporate = (state = initState, action) => {
    switch (action.type) {
        case actions.STORE_CORPORATE_ID:
            console.log("corporate_id", action.value.data);
            return {
                ...state,
                corporate_id: action.value.data
            }
        default:
            return state;
    }
}

export default corporate;
