import React, { Component } from 'react';
import NestedTable from '../nested-table';
import './table-body.css';
import '../app/app.css';

export default class TableBody extends Component {
	state = {
		hiddenData: null,
		id: null
	}
onShowMore = (e) => {
	const clikedId = e.target.parentNode.parentNode.id;
	const allCellsInRow = e.target.parentNode.parentNode.children;
	let array = [];
	for (var i=0; i<allCellsInRow.length; i++) {
		if (!allCellsInRow[i].offsetParent) {
			array.push(allCellsInRow[i].textContent)
		}
	}
	const deletedData = array.toString().split(',');
	const regExp = /\d+/g;
	let nestedData = [];
	let nestedArray = {};
	for (let j=0; j<deletedData.length; j++ ) {
		let numbersMatch = deletedData[j].match(regExp);
		let numbers = parseInt(numbersMatch);
		let words = deletedData[j].slice(0, (deletedData[j].length - numbersMatch.length));
		nestedArray = [[words], [numbers]];
		nestedData.push(nestedArray);
			}
	this.setState({
		hiddenData: nestedData,
		id: clikedId
	})
	}
	
render() {

	const { hiddenData, id } = this.state;
	const { tData } = this.props;
	const lines = tData.map((el, i) => {
		const sameId = id == i;
		const nestedTable = sameId ? <NestedTable hiddenData={hiddenData} key={`nestedData${i}`}/> : null;
		const { date, hits, unique, registrations, demo_registrations,
			conversion, deposit, ftd, deals, profit } = el;
			return (
				<React.Fragment key={i}>
		<tr key={i} id={i} className='main-table-row'>	
			<td>
			<span>{date}</span>
			<button className='btn btn-warning btn-sm btn-block more-details-button' onClick={this.onShowMore}>More details</button>
			</td>
			<td><span className='display-none'>{Object.keys({hits})}</span>{hits}
			</td>
			<td><span className='display-none'>{Object.keys({unique})}</span>{unique}</td>
			<td><span className='display-none'>{Object.keys({registrations})}</span>{registrations}</td>
			<td><span className='display-none'>{Object.keys({demo_registrations})}</span>{demo_registrations}</td>
			<td><span className='display-none'>{Object.keys({conversion})}</span>{conversion}</td>
			<td><span className='display-none'>{Object.keys({deposit})}</span>{deposit}</td>
			<td><span className='display-none'>{Object.keys({ftd})}</span>{ftd}</td>
			<td><span className='display-none'>{Object.keys({deals})}</span>{deals}</td>
			<td>{profit}</td>
		</tr>
		<tr key={`nestedRow${i}`}>
		<td key={`nestedCell${i}`} style={{width: '100%'}} className='nested-cell'>
		{ nestedTable }
		</td>
		</tr>
		</React.Fragment>
	)
	})
return (
			<tbody className='table-body'>
				{lines}
			</tbody>

)
}
}