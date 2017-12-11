import fetch from 'isomorphic-fetch';
import formUrlEncoded from 'form-urlencoded';
import ActionTypes from './../../constants/actionTypes';
import addLogEntry from './../log/addLogEntry';
import LogMessageType from './../../constants/logMessageType';
import { fetchObject } from './../../actions/rest/fetchObject';
// import ServerTypes from './../../constants/serverTypes';
import Defaults from './../../constants/defaults';


export function requestToken()
{
	const action =
	{
		type: ActionTypes.RequestLogin
	};

	return action;
}

export function receiveToken(login)
{
	const action =
	{
		type: ActionTypes.ReceiveLogin,
		payload:
		{
			loginName: login,
			receivedAt: Date.now()
		}
	};

	return action;
}

export function receiveTokenError()
{
	const action =
	{
		type: ActionTypes.ReceiveLoginError
	};

	return action;
}

export function fetchToken(login, password)
{
	return function (dispatch)
	{
		dispatch(requestToken());
		let url = Defaults.Url;
		url += '/token';
		let promise = fetch(url,
		{
			method: 'POST',
			headers: new Headers(
			{
				'Content-Type' : 'application/x-www-form-urlencoded'
			}),
			body: formUrlEncoded(
			{
				grant_type: 'password',
				username: login,
				password: password
			})
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
					let errorInfo = JSON.parse(json.error_description);

					throw new Error(errorInfo.Message);
				});
			}
		})
		.then(json =>
		{
			sessionStorage.setItem('tokenKey', json.access_token);
			sessionStorage.setItem('loginName', login);
			dispatch(receiveToken(login));
			dispatch(addLogEntry('Пользователь "' + login + '" удачно зашёл в систему!', LogMessageType.Success));
			// dispatch(fetchObject(ServerTypes.Schema)); //вызова fetch из fetch'a но в парадигме Redux
			// dispatch(fetchObject(ServerTypes.ServerDescription)); //вызова fetch из fetch'a но в парадигме Redux
		})
		.catch(exc =>
		{
			dispatch(receiveTokenError());
			dispatch(addLogEntry(exc.message, LogMessageType.Danger, exc.stack));
		});

		return promise;
	}
}
