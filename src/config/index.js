import RoutesProvider from "./routes";

// Redux
import { createStore, applyMiddleware } from 'redux';
import allReducer from '../redux/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const store = createStore(
    allReducer,
    {},
    applyMiddleware(thunk, promise),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Config = () => {
    return (
        <Provider store={store}>
            <RoutesProvider />
        </Provider>
    );
};

export default Config;