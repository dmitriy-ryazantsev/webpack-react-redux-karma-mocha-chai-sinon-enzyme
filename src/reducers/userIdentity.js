import ActionTypes from './../constants/actionTypes';

const initialState =
{
    authorized: sessionStorage.getItem('tokenKey') ? true : false,
    loginName: sessionStorage.getItem('loginName') ? sessionStorage.getItem('loginName') : null
}
const userIdentity = (state = initialState, action) =>
{
    let data = action.payload;
    switch (action.type)
    {
        case ActionTypes.ReceiveLogin:
        {
            let state =
            {
                authorized: true,
                loginName: data.loginName,
                loginTime: data.receivedAt
            };

            return state;
        }
        case ActionTypes.ReceiveLogout:
        {
            let state =
            {
                authorized: sessionStorage.getItem('tokenKey') ? true : false,
                loginName: sessionStorage.getItem('loginName') ? sessionStorage.getItem('loginName') : null
            };

            return state;
        }
        default:
        {
            return state;
        }
    }
}

export default userIdentity;
