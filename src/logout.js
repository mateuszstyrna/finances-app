import React from 'react';
import './style/style.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Logout extends React.Component {

	componentWillMount() {

	    fetch('https://mateusz-styrna.pl:3001/logout', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		}).then(() => {
			cookies.remove('Auth');
			window.location.href = '/';
		});
	}

	render() {
		return(
			<div>
				<p>Wait...</p>
			</div>
		);
	}
}

export default Logout;