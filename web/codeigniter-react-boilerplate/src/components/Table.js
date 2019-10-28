import React from "react";
import { BASE_URL } from "../util/constants";

class Table extends React.Component {
	state = {
		data: [],
		filter: {
			body: {
				value: null
			},
			country: {
				value: null
			},
			date: {
				value: {
					from: null,
					to: null
				}
			},
			car4x4: {
				value: null
			}
		},
		sort: {
			column: null,
			direction: null
		}
	};
	async componentDidMount(){
		await this.getData();
		console.log('hello :', this.state);
	}
	componentWillUnmount = () => {};
	componentDidUpdate = () => {
		// let newData = data;
		// const { filter } = this.state
		// for (const key of Object.keys(filter)) {
		//   if( filter[key].value !== null) {
		//     newData = newData.filter(item => item[key]===filter[key].value)
		//   } else {
		//   }
		// }
	};
	onFilterUpdate = column => {};
	onSortUpdate = column => {};
	getData = async () => {
		try {
			const response = await fetch("http://localhost:3000/welcome/test", {
				method: "get",
				headers: {
					"Content-Type": "application/json; charset=UTF-8"
				}
			});
			console.log("response :", response);
			console.log("response.body :", response.body);
			const result = await response.json();
			if (result.error) {
				throw new Error(result.message);
			}
			this.setState({
				...this.state,
				data: result,
			});
		} catch (err) {
			console.log(err);
		}
	};

	// createInfo = car => {};

	// deleteInfo = id => {};
	// updateInfo = car => {};

	render() {
		const { data }= this.state;
		if (data.length===0){
			return '';
		}
		const headers = Object.keys(data[0]);
		return (
			<div className="container">
				<div className="table-wrapper">
					<table className="table__main">
						<thead>
							{headers.map((header, idx) => (
								<td key={idx}>{header}</td>
							))}
						</thead>
						<tbody>
							{data.map((row, row_idx) => (
								<tr key={row_idx}>
									{Object.keys(row).map((cell, cell_idx) => (
										<td key={cell_idx}>{row[cell]}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Table;
