// React
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Components
// import App from './App';
import Container from './components/Home/Container';
import Movies from './components/MovieDetails/Container';
import Footer from './components/Footer';
import Navigation from './components/Header/Container';
import FilterSearch from './components/FilterSearch';

// Chakra-UI
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

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


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <ColorModeScript initialColorMode="light"></ColorModeScript> */}
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            {/* <Route path="/" element={<Testing />} /> */}
            <Route path="/" element={<Container />} />
            <Route path="/movie-details/:key" element={<Movies />} />
            <Route path="/movies/:country" element={<FilterSearch />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
