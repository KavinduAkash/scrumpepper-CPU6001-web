import * as actions from '../constants/Navigation'

export const handlerNavigation=(data)=>{
    return {
        type: actions.CHANGE_NAVIGATION,
        value: data
    }
};
