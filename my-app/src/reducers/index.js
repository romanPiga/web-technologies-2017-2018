import {combineReducers} from 'redux';
import user from './user';
import org from './org';
import fol from './fol';
import repo from './repo';

export default combineReducers({
    user, 
    org, 
    fol,
    repo
});