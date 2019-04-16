import React from 'react';
import {Link} from 'react-router-dom';
import './style/style.css';

class Nav extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			id: '',
			login: ''
		};
	}

	componentWillMount() {
		let that = this;
		fetch('https://mateusz-styrna.pl:3001/check_settings', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).then(function(response) {
			response.text().then(function(results) {
		    	results = JSON.parse(results);
		    	that.setState({
		    		id: results['id'],
		    		login: results['login'],
		    		email: results['email']
		    	});
			});
		});
	}

	render() {
		return(
			<nav className="menu">
				<div className="menu__profile">
					<div className="menu__profile--circle">
						<span className="menu__id">{this.state.id}</span>
						<span className="menu__login">{this.state.login}</span>
						<span className="menu__email">{this.state.email}</span>
					</div>
				</div>
				<ul className="menu__list">
					<li className="menu__item">
						<Link className="menu__link" to="/"><span className="material-icons">dashboard</span> <span className="menu__text">Dashboard</span></Link>
					</li>
					<li className="menu__item">
						<Link className="menu__link" to="/settings"><span className="material-icons">settings</span> <span className="menu__text">Settings</span></Link>
					</li>
					<li className="menu__item">
						<Link className="menu__link" to="/incomings"><span className="material-icons">trending_up</span> <span className="menu__text">Incomings</span></Link>
					</li>
					<li className="menu__item">
						<Link className="menu__link" to="/outgoings"><span className="material-icons">trending_down</span> <span className="menu__text">Outgoings</span></Link>
					</li>
					<li className="menu__item">
						<Link className="menu__link" to="/categories"><span className="material-icons">description</span> <span className="menu__text">Categories</span></Link>
					</li>
					<li className="menu__item">
						<Link className="menu__link" to="/logout"><span className="material-icons">logout</span> <span className="menu__text">Logout</span></Link>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Nav;