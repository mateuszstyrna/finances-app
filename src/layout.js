import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './style/style.css';
import Nav from './nav';
import Dashboard from './dashboard';
import Footer from './footer';
import Settings from './settings';
import Categories from './categories';
import Incomings from './incomings';
import Outgoings from './outgoings';
import Logout from './logout';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Layout extends React.Component {

	componentWillMount() {
		if (!cookies.get('Auth')) {
			this.props.history.push('/login');
		}
	}

	render() {
		return(
			<Router>
				<div className="main-container">
					<Nav />
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/settings" component={Settings} />
					<Route exact path="/incomings" component={Incomings} />
					<Route exact path="/outgoings" component={Outgoings} />
					<Route exact path="/categories" component={Categories} />
					<Route exact path="/logout" component={Logout} />
					<Footer />
				</div>
			</Router>
		);
	}
}

export default Layout;