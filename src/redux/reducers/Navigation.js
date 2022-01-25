import * as actions from '../constants/Navigation';

const initState = {
    navigation: 2
};

const Navigation = (state = initState, action) => {
    switch (action.type) {
        case actions.CHANGE_NAVIGATION:
            return {
                ...state,
                navigation: action.value
            };
        default:
            return state;
    }
}

export default Navigation;
