import fetch from 'isomorphic-fetch';
import { openPage } from './../../actions/openPage';
import ActionTypes from './../../constants/actionTypes';
import addLogEntry from './../log/addLogEntry';
import Defaults from './../../constants/defaults';


export function requestDeleteObject(typeName, id)
{
    const action =
    {
        type: ActionTypes.RequestDeleteObject,
        payload:
        {
            typeName: typeName,
            id: id
        }
    };

    return action;
}

export function receiveDeleteObject(typeName, id)
{
    const action =
    {
        type: ActionTypes.ReceiveDeleteObject,
        payload:
        {
            typeName: typeName,
            id: id,
            receivedAt: Date.now()
        }
    };

    return action;
}

export function receiveDeleteObjectError(typeName, id)
{
    const action =
    {
        type: ActionTypes.ReceiveDeleteObjectError,
        payload:
        {
            typeName: typeName,
            id: id
        }
    };

    return action;
}

export function deleteObject(typeName, id, context)
{
    return function (dispatch)
    {
        dispatch(requestDeleteObject(typeName, id));
        let url = Defaults.Url;
        url += '/api/' + typeName + '/' + id;
        let promise = fetch(url,
        {
            method: 'DELETE',
            headers: new Headers(
            {
                'Authorization' : 'Bearer ' + sessionStorage.getItem('tokenKey')
            }),
        })
        .then(response =>
        {
            if(response.ok)
            {
                dispatch(receiveDeleteObject(typeName, id));
                if(context && context.onReceiveDeleteObject)
                {
                    context.onReceiveDeleteObject();
                }
            }
            else
            {
                return response.json().then(json =>
                {
                    let errorMessage;
                    if(json.ExceptionMessage)
                    {
                        errorMessage = json.ExceptionMessage;
                    }
                    else if(json.Message)
                    {
                        errorMessage = json.Message;
                    }
                    else
                    {
                        let errorInfo = JSON.parse(json.error_description);

                        errorMessage = errorInfo.Message + ' (' + json.error + ')';
                    }

                    throw new Error(errorMessage);
                });
            }
        })
        .catch(exc =>
        {
            dispatch(receiveDeleteObjectError(typeName, id));
            dispatch(addLogEntry(exc.message));
        });

        return promise;
    }
}
