import React, { Component } from 'react';
import NestedTable from '../nested-table';
import './table-body.css';
import '../app/app.css';

export default class TableBody extends Component {

	state = {
		hiddenData: null,
		id: null
	}

	displayNestedTable = false;

	onShowMore = (e) => {
		const targetRow = e.target.parentNode.parentNode;
		const IdOfClickedRow = targetRow.id;
		const allCellsInRow = targetRow.children;
		let array = [];
		for (var i=1; i<allCellsInRow.length - 1; i++) {
				array.push(allCellsInRow[i].textContent)
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
			id: IdOfClickedRow
		})
		this.displayNestedTable = !this.displayNestedTable;
		}
		
	render() {
		const { hiddenData, id } = this.state;
		const { tData } = this.props;

		const lines = tData.map((el, i) => {
			const sameId = id == i;
			const { date, hits, unique, registrations, demo_registrations,
				conversion, deposit, ftd, deals, profit } = el;

			return (
				<React.Fragment key={i}>
					<tr id={i} className='main-table-row'>	
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
					<tr>
						<td className='nested-cell' colSpan={8}>
							{ sameId ? <NestedTable hiddenData={hiddenData} display={this.displayNestedTable} /> : null }
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