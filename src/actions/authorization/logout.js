import fetch from 'isomorphic-fetch';
import ActionTypes from './../../constants/actionTypes';
import addLogEntry from './../log/addLogEntry';
import LogMessageType from './../../constants/logMessageType';
import Defaults from './../../constants/defaults';


export function requestLogout()
{
    const action =
    {
        type: ActionTypes.RequestLogout
    };

    return action;
}

export function receiveLogout()
{
    const action =
    {
        type: ActionTypes.ReceiveLogout
    };

    return action;
}

export function receiveLogoutError()
{
    const action =
    {
        type: ActionTypes.ReceiveLogoutError
    };

    return action;
}

export function logout()
{
    return function (dispatch)
    {
        dispatch(requestLogout());
        let url = Defaults.Url;
        url += '/api/useridentity/logout';
        let header = new Headers();
        let token = sessionStorage.getItem('tokenKey');
        if(token)
        {
            header.append('Authorization', 'Bearer ' + token);
        }
        let promise = fetch(url,
        {
            method: 'POST',
            headers: header
        })
        .then(response =>
        {
            if(response.ok)
            {
                sessionStorage.removeItem('tokenKey')
                sessionStorage.removeItem('loginName')
                dispatch(receiveLogout());
                dispatch(addLogEntry('Пользователь вышел из системы!', LogMessageType.Warning));
            }
            else
            {
                throw new Error('POST: ' + response.url + ' ' + response.status + ' (' + response.statusText + ')');
            }
        })
        .catch(exc =>
        {
            dispatch(receiveLogoutError());
            dispatch(addLogEntry(exc.message));
        });

        return promise;
    }
}
