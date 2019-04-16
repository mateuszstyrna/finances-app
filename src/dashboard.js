import React from 'react';
import './style/style.css';
import Charts from './chart.js';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			balance: ''
		};
	}

	componentWillMount() {
		let that = this;
	    fetch('https://mateusz-styrna.pl:3001/check_balance', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).then(function(response) {
			response.text().then(function(text) {
		    	that.setState({
		    		balance: text
		    	});
			});
		});
	}

	render() {
		return(
			<section  className="panel">
				<div className="balance panel__box">{this.state.balance}</div>
				<Charts />
			</section>
		);
	}
}

export default Dashboard;