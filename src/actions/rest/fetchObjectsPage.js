import fetch from 'isomorphic-fetch';
import ActionTypes from './../../constants/actionTypes';
import addLogEntry from './../log/addLogEntry';
import Defaults from './../../constants/defaults';


export function requestObjectsPageData(typeName, pageSize, pageNumber)
{
    const action =
    {
        type: ActionTypes.RequestObjectsPageData,
        payload:
        {
            typeName: typeName,
            pageSize: pageSize,
            pageNumber: pageNumber
        }
    };

    return action;
}

export function receiveObjectsPageData(typeName, payload)
{
    const action =
    {
        type: ActionTypes.ReceiveObjectsPageData,
        payload:
        {
            typeName: typeName,
            items: payload.items,
            pagesCount: payload.count,
            receivedAt: Date.now()
        }
    };

    return action;
}

export function receiveObjectsPageDataError(typeName)
{
    const action =
    {
        type: ActionTypes.ReceiveObjectsPageDataError,
        payload:
        {
            typeName: typeName,
            items: null,
            receivedAt: Date.now()
        }
    };

    return action;
}

export function fetchObjectsPage(typeName, pageSize, pageNumber, sortFieldName, ascending, filter)
{
    return function (dispatch)
    {
        dispatch(requestObjectsPageData(typeName, pageSize, pageNumber));
        let url = Defaults.Url;
        url += '/api/' + typeName + '/?pageNumber=' + pageNumber + '&pageSize=' + pageSize;
        if(sortFieldName)
        {
            url += '&sortFieldName=' + sortFieldName + '&ascending=' + ascending;
        }
        if(filter)
        {
            url += '&filter=' + filter;
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
            dispatch(receiveObjectsPageData(typeName, json))
        })
        .catch(exc =>
        {
            dispatch(receiveObjectsPageDataError(typeName));
            dispatch(addLogEntry(exc.message));
        });

        return promise;
    }
}
