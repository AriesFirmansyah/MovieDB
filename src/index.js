// eslint-disable-next-line no-undef
require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';

// var React = require('react');
// var ReactDOM = require('react-dom');

// React
import {
    BrowserRouter,
    Routes,
    Route,
    HashRouter,
    MemoryRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Components
import Container from './components/Home/Container';
import Movies from './components/MovieDetails/Container';
import Footer from './components/Footer';
import Navigation from './components/Header/Container';
import FilterSearch from './components/FilterSearch';
import Login from './components/Login';

// Chakra-UI
import { ChakraProvider } from '@chakra-ui/react';

// Redux
import { createStore, applyMiddleware } from 'redux';
import allReducer from './redux/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const store = createStore(
    allReducer,
    {},
    applyMiddleware(thunk, promise),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const hist = createBrowserHistory();

ReactDOM.render(
    <ChakraProvider>
        <Provider store={store}>
            <BrowserRouter history={hist}>
                <Navigation />
                <Login />
                <Routes>
                    <Route exact path="/" element={<Container />} />
                    <Route path="/movie-details/:key" element={<Movies />} />
                    <Route path="/movies/:country" element={<FilterSearch />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: '1rem' }}>
                                <p>{"There's nothing here!"}</p>
                            </main>
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </Provider>
    </ChakraProvider>,
    document.getElementById('app')
);

// module.hot.accept()