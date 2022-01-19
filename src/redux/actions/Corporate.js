import * as actions from '../constants/Corporate';

export const storeCorporateId=(data)=>{
    return {
        type: actions.STORE_CORPORATE_ID,
        value: data
    }
};
