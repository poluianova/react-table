import React, { Component } from 'react';
import './date-filter.css';

export default class DateFilter extends Component {

	state = {
		startDate: '',
		endDate: ''
	}
onStartFilter = (e) => {
	const startDate = e.target.value;
	this.setState({ startDate });
	this.props.onFilterStart(startDate);
}

onEndFilter = (e) => {
	const endDate = e.target.value;
	this.setState({ endDate });
	this.props.onFilterEnd(endDate);
}
// onSubmit = (e) => {
//     e.preventDefault();
// }

render() {

return (
        <div className='date-filter'>

                <h5>Filter by date</h5>

		<form className='date-filter-form d-flex flex-column' onSubmit={this.onSubmit}>

                        <label>Enter start date
                                <input type='date' id='date-filter-start'
                                className='form-control filter-input'
                                value={this.state.startDate}
                                onChange={this.onStartFilter}
                                />
                        </label>

                        <label>Enter end date
                                <input type='date' id='date-filter-end'
                                className='form-control filter-input'
                                value={this.state.endDate}
                                onChange={this.onEndFilter}
                                />
                        </label>
                        <button className="btn date-filter-all" onClick={this.props.onShowAll}>
                        Back to the full list
                        </button>
                </form>
	</div>
	);
}}


