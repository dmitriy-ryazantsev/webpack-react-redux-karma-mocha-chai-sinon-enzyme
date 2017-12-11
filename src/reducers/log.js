import ActionTypes from './../constants/actionTypes';


const log = (state = [], action) =>
{
    let data = action.payload;
    switch (action.type)
    {
        case ActionTypes.ReceiveLogout:
        {
            return [];
        }
        case ActionTypes.AddLogEntry:
        {
            let newState =
            [
                ...state,
                {
                    text: data.message,
                    type: data.type,
                    context: data.context,
                    showed: false
                }
            ];

            return newState;
        }
        case ActionTypes.HideLogEntry:
        {
            let newState = state.map((item, index) =>
            {
                if(index === data.id)
                {
                    let newMessage =
                    {
                        ...item,
                        showed: true
                    }

                    return newMessage;
                }
                else
                {
                    return item;
                }
            })

            return newState;
        }
        default:
        {
            return state;
        }
    }
}

export default log;
