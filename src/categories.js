import React from 'react';
import './style/style.css';

class Categories extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cat_name: '',
			response: '',
			categories: []
		};
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	}

	onSubmit = e => {
		e.preventDefault();

		let type = "";

		if (document.getElementById('incomings').checked) {
	    	type = 'incomings';
	    }
	    else {
	    	if (document.getElementById('outgoings').checked)
	    		type = 'outgoings';
	    }

		const userData = {
	    	category: this.state.cat_name,
	    	type: type
	    };

	    let that = this;
		fetch('https://mateusz-styrna.pl:3001/add_category', {
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
		    	that.check_categories();
			});
		});
	}

	check_categories() {
		let that = this;
		fetch('https://mateusz-styrna.pl:3001/check_categories', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).then(function(response) {
			response.text().then(function(results) {
				results = JSON.parse(results);
		    	that.setState({categories: results});
			});
		});
	}

	componentWillMount() {
		this.check_categories();
	}

	removeCatConfirm(cat_name, cat_type) {
		let confirmed = window.confirm("Are You sure?");
        if( confirmed === true ) {
        	this.removeCat(cat_name, cat_type);
			return true;
		} else {
			return false;
		}
	}

	removeCat(cat_name, cat_type) {
		let that = this;
		fetch('https://mateusz-styrna.pl:3001/remove_categories', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				name: cat_name,
				type: cat_type
			})
		}).then(() => {
			that.check_categories();
		});
	}

	render() {
		return(
			<section className="panel section section--form">
				<form className="form panel__box" onSubmit={this.onSubmit}>
					<h1 className="title">Categories</h1>
					<label htmlFor="cat_name" className="form__label">
						<span className="form__label--text">Title:</span>
						<input className="form__input-text" onChange={this.onChange} type="text" id="cat_name" placeholder="Title" />
					</label>
					<label className="form__label" htmlFor="incomings">
						Incomings <input className="form__radio" id="incomings" type="radio" name="type" />
					</label>
					<label className="form__label" htmlFor="outgoings">
						Outgoings <input className="form__radio" id="outgoings" type="radio" name="type" />
					</label>
					<input className="form__input-submit" type="submit" value="Add" />
					<div id="form__result" className="form__result">{this.state.response}</div>
				</form>
				<div className="panel__box table-container">
					<h2 className="title">Your Categories</h2>
					<table className="table">
						<thead className="table__head">
							<tr className="table__tr">
								<th className="table__td">Title</th>
								<th className="table__td">Type</th>
								<th className="table__td">Remove</th>
							</tr>
						</thead>
						<tbody>
							{this.state.categories.map(item => (
								<tr key={item['Name'] + item['type'] + "--tr"} className="table__tr--tbody">
					            	<td className="table__td" key={item['Name']}>{item['Name']}</td>
					            	<td className="table__td" key={item['type']}>{item['type']}</td>
					            	<td className="table__td" key={item['Name'] + item['type'] + "--td"}>
					            		<button onClick={this.removeCatConfirm.bind(this, item['Name'], item['type'])} className="remove_button" key={item['Name'] + item['type'] + "--remove"}>
					            			-
					            		</button>
					            	</td>
					            </tr>
					        ))}
					    </tbody>
					    <tfoot className="table__foot">
							<tr className="table__tr">
								<td className="table__td">Title</td>
								<td className="table__td">Type</td>
								<th className="table__td">Remove</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</section>
		);
	}
}

export default Categories;