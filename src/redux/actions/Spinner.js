import * as actions from '../constants/Spinner'

export const handlerSpinner=(data)=>{
    return {
        type: actions.SPINNER_HANDLER,
        value: data
    }
};
