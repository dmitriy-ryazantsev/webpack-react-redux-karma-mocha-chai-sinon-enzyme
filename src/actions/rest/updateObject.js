import fetch from 'isomorphic-fetch';
import ActionTypes from './../../constants/actionTypes';
import addLogEntry from './../log/addLogEntry';
import Defaults from './../../constants/defaults';


export function requestUpdateObject(typeName, id)
{
    const action =
    {
        type: ActionTypes.RequestUpdateObject,
        payload:
        {
            typeName: typeName,
            id: id
        }
    };

    return action;
}

export function receiveUpdateObject(typeName, id)
{
    const action =
    {
        type: ActionTypes.ReceiveUpdateObject,
        payload:
        {
            typeName: typeName,
            id: id,
            receivedAt: Date.now()
        }
    };

    return action;
}

export function receiveUpdateObjectError(typeName, id)
{
    const action =
    {
        type: ActionTypes.ReceiveUpdateObjectError,
        payload:
        {
            typeName: typeName,
            id: id
        }
    };

    return action;
}

export function updateObject(typeName, id, dto, context)
{
    return function (dispatch)
    {
        dispatch(requestUpdateObject(typeName, id));
        let url = Defaults.Url;
        url += '/api/' + typeName + '/' + id;
        let promise = fetch(url,
        {
            method: 'PUT',
            headers: new Headers(
            {
                'Content-Type' : 'application/json; charset=utf-8',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('tokenKey')
            }),
            body: JSON.stringify(dto)
        })
        .then(response =>
        {
            if(response.ok)
            {
                dispatch(receiveUpdateObject(typeName, id));
                if(context && context.onReceiveUpdateObject)
                {
                    context.onReceiveUpdateObject();
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
            dispatch(receiveUpdateObjectError(typeName, id));
            dispatch(addLogEntry(exc.message));
        });

        return promise;
    }
}
