import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './style/style.css';
import Login from './login';
import Register from './register';
import Layout from './layout';
import NotFound from './404';

class App extends React.Component {

	render() {
		return(
			<Router>
				<main className="main">
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/" component={Layout} />
						<Route exact path="/settings" component={Layout} />
						<Route exact path="/incomings" component={Layout} />
						<Route exact path="/outgoings" component={Layout} />
						<Route exact path="/categories" component={Layout} />
						<Route exact path="/logout" component={Layout} />
						<Route component={NotFound} />
					</Switch>
				</main>
			</Router>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);