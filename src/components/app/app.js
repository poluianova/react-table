import React, { Component } from 'react';
import Data from '../data/data';
import DateFilter from '../date-filter';
import TableHead from '../table-head';
import TableFoot from '../table-foot';
import TableBody from '../table-body';
import './app.css';


export default class App extends Component {
	data = new Data();

	state = {
		tableData: this.data.tableData,
		startDate: '',
		endDate: ''

};

onSortUp = (key) => {
	this.setState(({tableData}) => {
		const newArr = tableData.sort(function(a, b) {
			if (key === 'date') {
				let date1 = a[key].toString();
				let date2 = b[key].toString();
				let dateA = new Date(date1);
				let dateB = new Date(date2);
				return dateA - dateB;
			}
			if (key === 'profit') {
				let profit1 = a[key].slice(1);
				let profit2 = b[key].slice(1);
				return profit1- profit2;
			}
				return a[key] - b[key];
			});
		return {
			tableData: newArr
		}
	})
}

onSortDown = (key) => {
	this.setState(({tableData}) => {
		const newArr = tableData.sort(function(a, b) {
			if (key === 'date') {
				let date1 = a[key].toString();
				let date2 = b[key].toString();
				let dateA = new Date(date1);
				let dateB = new Date(date2);
				return dateB - dateA;
			}
			if (key === 'profit') {
				let profit1 = a[key].slice(1);
				let profit2 = b[key].slice(1);
				return profit2- profit1;
			}
				return b[key] - a[key];
			});
		return {
			tableData: newArr
		}
	})
}

onFilterStart = (startDate) => {
	this.setState({startDate});
}
onFilterEnd = (endDate) => {
	this.setState({endDate});
}
onShowAll = (startDate, endDate) => {
	this.setState({
		startDate: '',
		endDate: ''
	})
}

search(items, startDate, endDate) {
	// if (startDate.length === 0 && endDate.length === 0) {
	// 	return items;
	// };
	if (startDate.length === 0) {
		startDate = items.reduce((min, el) =>
		 el.date < min ? el.date : min, items[0].date); 
	}
	if (endDate.length === 0) {
		endDate = items.reduce((max, el) =>
		el.date > max ? el.date : max, items[0].date); 
	}
	return items.filter((item) => {
		return item.date >= startDate && item.date <= endDate;
})
}

	render () {
		const { tableData, startDate, endDate } = this.state;
		const visibleItems = this.search(tableData, startDate, endDate);
		const totalSum = this.data.getTotalSumArray(visibleItems, tableData);

		return (
			<div className='table-app'>
			<DateFilter onFilterStart={this.onFilterStart}
			 onFilterEnd={this.onFilterEnd}/>
			<table className='main-table table'>
				<TableHead sortUp={this.onSortUp} sortDown={this.onSortDown} />
				<TableFoot totalSum={totalSum} />
				<TableBody tData={visibleItems} />
			</table>
			</div>
			)
	};
};
