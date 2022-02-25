import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import CorporateReducer from './Corporate';
import SpinnerReducer from './Spinner';
import NavigationReducer from './Navigation';
import ProjectReducer from './Project';
import Documents from "./Documents";
import Poker from "./Poker";
import User from "./User";

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    corporateReducer: CorporateReducer,
    spinnerReducer: SpinnerReducer,
    navigationReducer: NavigationReducer,
    projectReducer: ProjectReducer,
    documentReducer: Documents,
    pokerReducer: Poker,
    userReducer: User
});

export default reducers;
