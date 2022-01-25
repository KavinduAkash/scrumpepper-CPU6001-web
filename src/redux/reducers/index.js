import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import CorporateReducer from './Corporate';
import SpinnerReducer from './Spinner';
import NavigationReducer from './Navigation';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    corporateReducer: CorporateReducer,
    spinnerReducer: SpinnerReducer,
    navigationReducer: NavigationReducer
});

export default reducers;
