import React from 'react';
import './style/style.css';

class Outgoings extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: '',
			amount: '',
			date: '',
			category: '',
			outgoings: [],
			categories: [],
			response: ''
		};
	}

	check_outgoings() {
		let that = this;
		fetch('https://mateusz-styrna.pl:3001/check_outgoings', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).then(function(response) {
			response.text().then(function(results) {
				results = JSON.parse(results);
		    	that.setState({outgoings: results});
			});
		});
	}

	remove_outgoing(id) {
		let that = this;
		fetch('https://mateusz-styrna.pl:3001/remove_outgoings', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				id: id
			})
		}).then(function(response) {
			response.text().then(function(text) {
				that.setState({
					response: text
				});
				that.check_outgoings();
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
				let outgoings = [];

				for (let i = 0; i < results.length; i++) {
					if (results[i]['type'] === 'outgoings') {
						outgoings.push(results[i]);
					}
				}

		    	that.setState({categories: outgoings});
			});
		});
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	}

	onSubmit = e => {
		e.preventDefault();
		this.setState({
			category: document.getElementById('category').value
		}, () => {
			let that = this;
			fetch('https://mateusz-styrna.pl:3001/add_outgoing', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					title: that.state.title,
					amount: that.state.amount,
					date: that.state.date,
					category: that.state.category
				})
			}).then(function(response) {
				response.text().then(function(results) {
					that.setState({
						response: results
					});
					that.check_outgoings();
				});
			});
		});
	}

	componentWillMount() {
		this.check_outgoings();
		this.check_categories();
	}

	render() {
		return(
			<section className="panel section section--form">
				<form className="form panel__box" onSubmit={this.onSubmit}>
					<h1 className="title">Outgoings</h1>
					<label htmlFor="title" className="form__label">
						<span className="form__label--text">Title:</span>
						<input className="form__input-text" onChange={this.onChange} type="text" id="title" placeholder="Title" />
					</label>
					<label htmlFor="amount" className="form__label">
						<span className="form__label--text">Amount:</span>
						<input className="form__input-text" onChange={this.onChange} placeholder="Amount" step="0.01" id="amount" type="number" />
					</label>
					<label htmlFor="date" className="form__label">
						<span className="form__label--text">Date:</span>
						<input className="form__input-text" onChange={this.onChange} id="date" type="date" />
					</label>
					<label htmlFor="category" className="form__label">
						<span className="form__label--text">Category:</span>
						<select className="form__input-text form__select" id="category">
						{this.state.categories.map(item => (
							<option value={item['Name']} key={item['Name']}>{item['Name']}</option>
						))}
						</select>
					</label>
					<input className="form__input-submit" type="submit" value="Add" />
					<div id="form__result" className="form__result">{this.state.response}</div>
				</form>
				<div className="panel__box table-container">
					<h2 className="title">Your Outgoings</h2>
					<table className="table">
						<thead className="table__head">
							<tr className="table__tr">
								<th className="table__td">Title</th>
								<th className="table__td">Amount</th>
								<th className="table__td">Category</th>
								<th className="table__td">Remove</th>
							</tr>
						</thead>
						<tbody>
							{this.state.outgoings.map(item => (
								<tr className="table__tr--tbody" key={item['ID']+"--tr"}>
									<td className="table__td" key={item['Title']}>
										{item['Title']}
									</td>
									<td className="table__td" key={item['Amount']}>
										{item['Amount']}
									</td>
									<td className="table__td" key={item['Category']}>
										{item['Category']}
									</td>
									<td className="table__td" key={item['ID']}>
										<button className="remove_button" onClick={this.remove_outgoing.bind(this, item['ID'])} key={item['ID']+"--remove"}>-</button>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot className="table__foot">
							<tr className="table__tr">
								<td className="table__td">Title</td>
								<td className="table__td">Amount</td>
								<td className="table__td">Category</td>
								<th className="table__td">Remove</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</section>
		);
	}
}

export default Outgoings;