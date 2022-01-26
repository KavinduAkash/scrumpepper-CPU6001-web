import * as actions from '../constants/Project'

export const handleProjectId=(data)=>{
    return {
        type: actions.STORE_PROJECT_ID,
        value: data
    }
};

export const handleProjectData=(data)=>{
    return {
        type: actions.STORE_PROJECT_DATA,
        value: data
    }
};
