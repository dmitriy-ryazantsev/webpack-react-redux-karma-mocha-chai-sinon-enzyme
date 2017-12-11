import ActionTypes from './../../constants/actionTypes';


const hideLogEntry = (id) =>
{
    const action =
    {
        type: ActionTypes.HideLogEntry,
        payload:
        {
            id: id
        }
    };

    return action;
}

export default hideLogEntry;
