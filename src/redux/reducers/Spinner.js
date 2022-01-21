import * as actions from '../constants/Spinner';

const initState = {
    loading: false
};

const spinner = (state = initState, action) => {
    switch (action.type) {
        case actions.SPINNER_HANDLER:
            return {
                ...state,
                loading: action.value
            };
        default:
            return state;
    }
}

export default spinner;
