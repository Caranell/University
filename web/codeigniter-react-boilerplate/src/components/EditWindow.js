import React, { Component } from 'react';

class EditWindow extends Component {
	state = {
		item: {}
	};

	onSubmit = async () => {
		try {
			const { id } = this.props;
			const { item } = this.state;
			const hasId = typeof id !== 'undefined';
			const response = await fetch(
				`http://localhost:3000/welcome/modifyRecord/${hasId ? id : ''}`,
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					body: JSON.stringify(item)
				}
			);
			if (response.error) {
				throw new Error(response.message);
			}
			fetch('http://localhost:3000/welcome/table');
		} catch (err) {
			console.log(err);
		}
	};

	onChange = e => {
		const { field, value } = e.target;
		this.setState({
			item: {
				...this.state.item,
				[field]: value
			}
		});
	};

	componentDidMount = async () => {
		const { id } = this.props;
		if (id) {
			const response = await fetch(
				`http://localhost:3000/welcome/getRecord/${id}`,
				{
					method: 'get',
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}
			);
			const result = await response.json();
			if (result.error) {
				throw new Error(result.message);
			}
			this.setState(result.item);
		}
	};

	getGeneratedValues = () => {};
	render() {
		return (
			<div className='container'>
				<div className='edit-form__wrapper'>hello worl</div>
			</div>
		);
	}
}

export default EditWindow;
