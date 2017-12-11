import fetch from 'isomorphic-fetch';
import ActionTypes from './../../constants/actionTypes';
import addLogEntry from './../log/addLogEntry';
import Defaults from './../../constants/defaults';


export function requestCreateObject(typeName)
{
    const action =
    {
        type: ActionTypes.RequestCreateObject,
        payload:
        {
            typeName: typeName
        }
    };

    return action;
}

export function receiveCreateObject(typeName)
{
    const action =
    {
        type: ActionTypes.ReceiveCreateObject,
        payload:
        {
            typeName: typeName,
            receivedAt: Date.now()
        }
    };

    return action;
}

export function receiveCreateObjectError(typeName)
{
    const action =
    {
        type: ActionTypes.ReceiveCreateObjectError,
        payload:
        {
            typeName: typeName
        }
    };

    return action;
}

export function createObject(typeName, dto, context)
{
    return function (dispatch)
    {
        dispatch(requestCreateObject(typeName));
        let url = Defaults.Url;
        url += '/api/' + typeName;
        let promise = fetch(url,
        {
            method: 'POST',
            headers: new Headers(
            {
                'Accept': 'application/json',
                'Content-Type' : 'application/json; charset=utf-8',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('tokenKey')
            }),
            body: JSON.stringify(dto)
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
        .then(json =>
        {
            dispatch(receiveCreateObject(typeName));
            if(context && context.onReceiveCreateObject)
            {
                context.onReceiveCreateObject();
            }
        })
        .catch(exc =>
        {
            dispatch(receiveCreateObjectError(typeName));
            dispatch(addLogEntry(exc.message));
        });

        return promise;
    }
}
