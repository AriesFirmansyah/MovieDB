import Container from '../../components/Home/Container';
import Movies from '../../components/MovieDetails/Container';
import FilterSearch from '../../components/FilterSearch';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import NotFound from '../../components/NotFound';
import Genres from '../../components/Mobile/Genres';
import Years from '../../components/Mobile/Years';
import Country from '../../components/Mobile/Country';

const Routes = [
    {
        name: 'Home',
        path: '/',
        auth: false,
        component: <Container />,
    },
    {
        name: 'Movie Details',
        path: '/movie-details/:key',
        auth: false,
        component: <Movies />,
    },
    {
        name: 'Movie Results',
        path: '/movies/:key',
        auth: false,
        component: <FilterSearch />,
    },
    {
        name: 'Login',
        path: '/login',
        auth: false,
        component: <Login />,
    },
    {
        name: 'Register',
        path: '/register',
        auth: false,
        component: <Register />,
    },
    {
        name: 'Genres',
        path: '/movies/genres',
        auth: false,
        component: <Genres />,
    },
    {
        name: 'Country',
        path: '/movies/country',
        auth: false,
        component: <Country />,
    },
    {
        name: 'Years',
        path: '/movies/years',
        auth: false,
        component: <Years />,
    },
    {
        name: 'Unknown Page',
        path: '*',
        auth: false,
        component: <NotFound />, 
    },


];

export default Routes;
