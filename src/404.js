import React from 'react';
import './style/style.css';
import './style/404.css';

class NotFound extends React.Component {

	render() {
		return(
			<div className="page-404">
				<div className="error">
					<h1 className="error__code">.404.</h1>
					<a className="error__link" href="/">home</a>
				</div>
			</div>
		);
	}
}

export default NotFound;