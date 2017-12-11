import fetch from 'isomorphic-fetch';
import ActionTypes from './../../constants/actionTypes';
import addLogEntry from './../log/addLogEntry';
import Defaults from './../../constants/defaults';


export function requestObject(typeName, id)
{
    const action =
    {
        type: ActionTypes.RequestObject,
        payload:
        {
            typeName: typeName,
            id: id
        }
    };

    return action;
}

export function receiveObject(typeName, id, payload)
{
    const action =
    {
        type: ActionTypes.ReceiveObject,
        payload:
        {
            typeName: typeName,
            id: id,
            item: payload.item,
            receivedAt: Date.now()
        }
    };

    return action;
}

export function receiveObjectError(typeName, id)
{
    const action =
    {
        type: ActionTypes.ReceiveObjectError,
        payload:
        {
            typeName: typeName,
            id: id,
            item: null
        }
    };

    return action;
}

export function fetchObject(typeName, id)
{
    return function (dispatch)
    {
        dispatch(requestObject(typeName, id));
        let url = Defaults.Url;
        url += '/api/' + typeName;
        if(id)
        {
            url += '/' + id;
        }
        let header = new Headers(
        {
            'Accept': 'application/json'
        });
        let token = sessionStorage.getItem('tokenKey');
        if(token)
        {
            header.append('Authorization', 'Bearer ' + token);
        }
        let promise = fetch(url,
        {
            method: 'GET',
            headers: header
        })
        .then(response =>
        {
            if(response.ok)
            {
                let contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1)
                {
                    return response.json();
                }
                else
                {
                    throw new TypeError('Oops, we haven\'t got JSON!');
                }
            }
            else
            {
                let responseUrl = response.url === '' ? url : response.url;
                throw new Error('GET: ' + responseUrl.toLowerCase() + ' ' + response.status + ' (' + response.statusText + ')');
            }
        })
        .then(json =>
        {
            dispatch(receiveObject(typeName, id, json));
        })
        .catch(exc =>
        {
            dispatch(receiveObjectError(typeName, id));
            dispatch(addLogEntry(exc.message));
        });

        return promise;
    }
}
