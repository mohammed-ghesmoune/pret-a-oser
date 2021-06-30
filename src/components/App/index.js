import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Prestation from '../Prestation';
import Admin from '../Admin';
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';
import Profil from '../Profil';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import NotFound from '../NotFound';
import Login from '../Login';
import Signup from '../Signup';
import Logout from '../Logout';
import Forgetpassword from '../Forgetpassword';


function App() {
	return (
		<Router>
			<Route component={Header} />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/contact" component={Contact} />
				<Route path={["/prestation/:category/:title", "/prestation/:category", "/prestation"]} component={Prestation} />
				<Route path="/admin" component={Admin} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/logout" component={Logout} />
				<Route path="/forgetpassword" component={Forgetpassword} />
				<Route path="/profil" component={Profil} />
				<Route path="/notfound" component={NotFound} />
				<Redirect to="/notfound" />
			</Switch>
			<Route component={Footer} />
		</Router>
	);
}

export default App;
