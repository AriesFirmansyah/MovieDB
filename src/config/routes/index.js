// React
import {
    BrowserRouter,
    Routes as Router,
    Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';


// Components
import Container from '../../components/Home/Container';
import Movies from '../../components/MovieDetails/Container';
import Navigation from '../../components/Header/Container';
import FilterSearch from '../../components/FilterSearch';
import Login from '../../components/Login';
import Footer from '../../components/Footer';


const hist = createBrowserHistory();

const Routes = () => {
    return (
        <BrowserRouter history={hist}>
            <Navigation />
            <Router>
                <Route exact path="/" element={<Container />} />
                <Route path="/movie-details/:key" element={<Movies />} />
                <Route path="/movies/:country" element={<FilterSearch />} />
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
            <Footer />
        </BrowserRouter>
    );
};

export default Routes;