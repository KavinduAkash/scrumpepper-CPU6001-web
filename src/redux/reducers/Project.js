import * as actions from '../constants/Project';

const initState = {
    id: 0,
    project: null
};

const Project = (state = initState, action) => {
    switch (action.type) {
        case actions.STORE_PROJECT_ID:
            return {
                ...state,
                id: action.value,
                project: null
            };
        default:
            return state;
    }
}

export default Project;
