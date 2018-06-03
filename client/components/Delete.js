//client/components/Delete.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Delete extends Component {

	constructor(){
		super();
		this.state = { 
			id: ''
		}
		this.onClick = this.onClick.bind(this);
		this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		this.setState({
			id: this.props.expense._id
		})
	}

	onClick(e){
		this.delete(this);
		this.props.callback(this.props.idx);
	}

	delete(e){
		axios.get('/delete?id='+e.state.id)
			.then((res) => {
				console.log(res);
			}).catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="Delete">
				<Button 
					bsStyle="danger" 
					bsSize="small" 
					onClick={ ()=>{ 
						if(window.confirm("Are you sure to delete?")) this.onClick() } }>
					<Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
						<span className="glyphicon glyphicon-remove"></span>
					</Link>
				</Button>
			</div>
		);
	}
}
export default Delete;