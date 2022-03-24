// React
import {
    BrowserRouter,
    Routes as Router,
    Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactBreakpoints from 'react-breakpoints';

import Navigation from '../../components/Header/Container';
import Footer from '../../components/Footer';

import Routes from './routes';


const hist = createBrowserHistory();

const breakpoints = {
    xs: 479,
    sm: 614,
    md: 768,
    lg: 992,
    xl: 1200
};

const RoutesProvider = () => {
    return (
        <ReactBreakpoints breakpoints={breakpoints}>
            <BrowserRouter history={hist}>
                <Navigation />
                <Router>
                    {
                        Routes.map((routes, index) => {
                            return !routes.auth ? (
                                <Route 
                                    exact 
                                    path={routes.path}
                                    element={routes.component} key={index} />
                            ) : null;
                        })
                    }
                </Router>
                <Footer />
            </BrowserRouter>
        </ReactBreakpoints>
    );
};

// AuthCheck.propTypes = propTypes;

export default RoutesProvider;