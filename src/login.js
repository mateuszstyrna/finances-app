import React from 'react';
import './style/style.css';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			login: "",
			password: "",
			response: ""
		};
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const userData = {
	    	login: this.state.login,
	    	password: this.state.password
	    };

	    let that = this;
	    fetch('https://mateusz-styrna.pl:3001/login_user', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(userData)
		}).then(function(response) {
			response.text().then(function(text) {
		    	that.setState({
		    		response: text
		    	});
		    	if (text === 'Success!') {
		    		cookies.set('Auth', 'true', { path: '/' });
		    		that.props.history.push('/');
		    	}	
			});
		});
	}

	componentWillMount() {
		if (cookies.get('Auth')) {
			this.props.history.push('/');
		}
	}

	render() {
		return(
			<div className="not-logged">
				<div className="not-logged__container">
					<form className="form" onSubmit={this.onSubmit}>
					<h1 className="form__title">Login</h1>
					<label htmlFor="login" className="form__label">
						<span className="form__label--text">Login:</span>
						<input onChange={this.onChange} type="text" id="login" className="form__input-text" placeholder="Login" />
					</label>
					<label htmlFor="password" className="form__label">
						<span className="form__label--text">Password:</span>
						<input onChange={this.onChange} type="password" id="password" className="form__input-text" placeholder="Password" />
					</label>
					<div className="form__buttons-container">
						<Link className="form__link form__buttons-container--button" to="/register">Register</Link>
						<input type="submit" id="submit" className="form__input-submit form__buttons-container--button" value="Login" />
					</div>
						<div id="form__result" className="form__result">{this.state.response}</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;