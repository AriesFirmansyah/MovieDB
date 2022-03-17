// React
import {
    BrowserRouter,
    Routes as Router,
    Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';


import ReactBreakpoints from 'react-breakpoints';

// Components
import Container from '../../components/Home/Container';
import Movies from '../../components/MovieDetails/Container';
import Navigation from '../../components/Header/Container';
import FilterSearch from '../../components/FilterSearch';
import Login from '../../components/Login';
import Footer from '../../components/Footer';


const hist = createBrowserHistory();

const breakpoints = {
    mobile: 479,
    tablet: 480,
    desktop: 992
};

const Routes = () => {
    return (
        <ReactBreakpoints breakpoints={breakpoints}>
            <BrowserRouter history={hist}>
                <Navigation />
                <Router>
                    <Route exact path="/" element={<Container />} />
                    <Route path="/movie-details/:key" element={<Movies />} />
                    <Route path="/movies/:key" element={<FilterSearch />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: '1rem' }}>
                                <p>{"There's nothing here!"}</p>
                            </main>
                        }
                    />
                </Router>
                {
                    window.location.pathname !== '/login' ? (
                        <Footer />
                    ) : null
                }
                <Footer />
            </BrowserRouter>
        </ReactBreakpoints>
    );
};

export default Routes;