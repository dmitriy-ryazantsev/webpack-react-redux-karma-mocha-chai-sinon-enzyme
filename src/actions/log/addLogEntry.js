import ActionTypes from './../../constants/actionTypes';
import LogMessageType from './../../constants/logMessageType';


const addLogEntry = (message, logType = LogMessageType.Danger, context = null) =>
{
	console.log(message);

    const action =
    {
        type: ActionTypes.AddLogEntry,
        payload:
        {
            message: message,
            type: logType,
            context: context
        }
    };

    return action;
}

export default addLogEntry;
