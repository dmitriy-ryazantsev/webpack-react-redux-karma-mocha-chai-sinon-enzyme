import { combineReducers } from 'redux';
import ActionTypes from './../constants/actionTypes';
import userIdentity from './userIdentity';
import log from './log';
import isFetching from './isFetching';


const root = combineReducers(
{
    userIdentity,
    log,
    isFetching
});

export default root;
