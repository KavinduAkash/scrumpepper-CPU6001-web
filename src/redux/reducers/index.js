import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import CorporateReducer from './Corporate';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    corporateReducer: CorporateReducer
});

export default reducers;
