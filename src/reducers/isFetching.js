import ActionTypes from './../constants/actionTypes';


const isFetching = (state = 0, action) =>
{
    switch (action.type)
    {
        case ActionTypes.ReceiveLogout:
        case ActionTypes.ReceiveLogoutError:
        {
            return 0;
        }
        case ActionTypes.RequestLogin:
        case ActionTypes.RequestLogout:
        case ActionTypes.RequestObject:
        case ActionTypes.RequestObjectsPageData:
        case ActionTypes.RequestUpdateObject:
        case ActionTypes.RequestDeleteObject:
        case ActionTypes.RequestCreateObject:
        {
            return state + 1;
        }
        case ActionTypes.ReceiveLogin:
        case ActionTypes.ReceiveLoginError:
        case ActionTypes.ReceiveObject:
        case ActionTypes.ReceiveObjectError:
        case ActionTypes.ReceiveObjectsPageData:
        case ActionTypes.ReceiveObjectsPageDataError:
        case ActionTypes.ReceiveUpdateObject:
        case ActionTypes.ReceiveUpdateObjectError:
        case ActionTypes.ReceiveDeleteObject:
        case ActionTypes.ReceiveDeleteObjectError:
        case ActionTypes.ReceiveCreateObject:
        case ActionTypes.ReceiveCreateObjectError:
        {
            return state - 1;
        }
        default:
        {
            return state;
        }
    }
}

export default isFetching;
