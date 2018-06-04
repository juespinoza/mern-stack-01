//client/components/App.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';

import '../css/App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			selectedMonth:'Jan', 
			selectedYear: 2016, 
			data: []
		};
		this.getData = this.getData.bind(this);
		this.getDelete = this.getDelete.bind(this);
	}
	componentDidMount() {
		this.getData(this, '2016');
		console.log('Recibe data mount');
	}
	componentWillReceiveProps(nextProps) {
		this.getData(this, '2016');
		console.log('Recibe data prop');
	}

	getData(ev, year) {
		axios.get('/getAll?month=All&year='+year)
			.then((response) => {
				ev.setState({data: response.data});
				ev.setState({selectedYear: parseInt(year)});
			});
	}

	getDelete(idx){
		let elementosActualizados = [...this.state.data];
		elementosActualizados.splice(idx, 1);
		//re creamos el estado para que vuelva a renderizar
		this.setState({
			...this.state,
			data: elementosActualizados,
		});
		console.log(elementosActualizados);
	}

	render() {
		return (
			<div className="App">
				<Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
				<table id="expense">
					<thead>
						<tr>
							<th></th>
							<th className='desc-col'>Description</th>
							<th className='button-col'>Amount</th>
							<th className='button-col'>Month</th>
							<th className='button-col'>Year</th>
							<th className='button-col'>Update</th>
							<th className='button-col'>Delete</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.data.map((exp, idx) => {
								return  (
									<tr key={exp._id}>
										<td className='counterCell'></td>
										<td className='desc-col'>{exp.description}</td>
										<td className='button-col'>{exp.amount}</td>
										<td className='button-col'>{exp.month}</td>
										<td className='button-col'>{exp.year}</td>
										<td className='button-col'><Update expense={exp} /></td>
										<td className='button-col'>
											<Delete expense={exp} callback={this.getDelete.bind(this, idx)} />
										</td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;