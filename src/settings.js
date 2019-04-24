import React from 'react';
import './style/style.css';

class Settings extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			currency: '',
			password: '',
			repeat_password: '',
			current_password: '',
			response: ''
		};
	}

	componentWillMount() {
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
		    	document.getElementById('id').innerText = results['id'];
		    	document.getElementById('login').innerText = results['login'];
		    	document.getElementById('email').value = results['email'];
		    	document.getElementById('currency').value = results['currency'];
			});
		});
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const userData = {
	    	password: this.state.password,
	    	repeat_password: this.state.repeat_password,
	    	email: this.state.email,
	    	current_password: this.state.current_password,
	    	currency: this.state.currency
	    };

	    let that = this;
		fetch('https://mateusz-styrna.pl:3001/change_settings', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(userData)
		}).then(function(response) {
			response.text().then(function(text) {
		    	that.setState({response: text});
			});
		});
	}

	render() {
		return(
			<section className="panel section section--form">
				<form className="form panel__box" onSubmit={this.onSubmit}>
					<span className="form__id" id="id"></span>
					<span className="form__login" id="login"></span>
					<label htmlFor="email" className="form__label">
						<span className="form__label--text">Email:</span>
						<input onChange={this.onChange} className="form__input-text" id="email" type="text" />
					</label>
					<label htmlFor="currency" className="form__label">
						<span className="form__label--text">Currency:</span>
						<input onChange={this.onChange} className="form__input-text" id="currency" type="text" />
					</label>
					<label htmlFor="password" className="form__label">
						<span className="form__label--text">New password:</span>
						<input onChange={this.onChange} className="form__input-text" id="password" type="password" />
					</label>
					<label htmlFor="repeat_password" className="form__label">
						<span className="form__label--text">Repeat new password:</span>
						<input onChange={this.onChange} className="form__input-text" id="repeat_password" type="password" />
					</label>
					<label htmlFor="current_password" className="form__label">
						<span className="form__label--text form__required">Current password:</span>
						<input onChange={this.onChange} className="form__input-text" id="current_password" type="password" />
					</label>
					<input className="form__input-submit" type="submit" value="Save changes" />
					<div id="form__result" className="form__result">{this.state.response}</div>
				</form>
			</section>
		);
	}
}

export default Settings;