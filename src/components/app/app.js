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
		tableData: '',
		isLoading: false,
		error: false,
		startDate: null,
		endDate: null
}

UNSAFE_componentWillMount() {
	this.setState({
		isLoading: true
	})
}
componentDidMount() {
	this.updateData();
}

updateData = () => {
	this.data.getData()
	.then(this.onDataLoaded)
	.catch(this.onError)
}

onDataLoaded = (data) => {
	this.setState({
		tableData: data,
		isLoading: false
	})
}

onError = () => {
	this.setState({
		error: true
	})
}

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
	const parseStartDate = Date.parse(startDate)
	this.setState({startDate: parseStartDate});	
}

onFilterEnd = (endDate) => {
	const parseEndDate = Date.parse(endDate);
	this.setState({endDate: parseEndDate});
}

onShowAll = () => {
	this.setState({
		startDate: null,
		endDate: null
	})
}

findMaxEl = (items) => {
	return items.reduce((max, el) =>
	el.date > max ? el.date : max, items[0].date); 
}

findMinEl = (items) => {
	return items.reduce((min, el) =>
	el.date < min ? el.date : min, items[0].date); 
}

search(items, startDate, endDate) {
	if (startDate === null && endDate === null) {
		return items;
	};
	return items.filter((item) => {
		return Date.parse(item.date) >= startDate && Date.parse(item.date) <= endDate;
})
}

	render () {
		if (this.state.error) {
			return <p>There is a mistake</p>
		}
		if (this.state.isLoading) {
			return <p>Data is loading...</p>
		}
		const { tableData, startDate, endDate } = this.state;
		const maxDate = this.findMaxEl(tableData);
		const minDate = this.findMinEl(tableData);
		const visibleItems = this.search(tableData, startDate, endDate);
		const totalSum = this.data.getTotalSumArray(visibleItems, tableData);

		return (
			<div className='table-app'>

			<DateFilter onFilterStart={this.onFilterStart}
			 onFilterEnd={this.onFilterEnd} onShowAll={this.onShowAll}
			 minDate={minDate} maxDate={maxDate} />

			<table className='main-table table'>
				<TableHead sortUp={this.onSortUp} sortDown={this.onSortDown} />
				<TableFoot totalSum={totalSum} />
				<TableBody tData={visibleItems} />
			</table>
			
			</div>
			)
	};
};
