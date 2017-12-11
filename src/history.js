import createHistory from 'history/createBrowserHistory';
// import { openPage } from './actions/openPage';
import { fetchObject } from './actions/rest/fetchObject';
// import ServerTypes from './constants/serverTypes';


const history = createHistory();
// const history = createHistory(
// {
//     basename: '/ui'
// });
export default history;


let dispatch;
export const initializeRouting = (store) =>
{
    dispatch = store.dispatch;

    history.listen(navigateToPage);
    if(sessionStorage.getItem('tokenKey'))
    {
        // dispatch(fetchObject(ServerTypes.Schema));

        navigateToPage(history.location);
    }
    else
    {
        history.push('/');
    }
};

const navigateToPage = (location) =>
{
    let args = location.pathname.split('/');
    if(args.length < 2)
    {
        return;
    }

    // let context = {};
    // dispatch(openPage(context));
};
