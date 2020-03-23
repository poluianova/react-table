import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, toMomentObject } from 'react-dates';
import './date-filter.css';

export default class DateFilter extends Component {

	state = {
		startDate: null,
    endDate: null,
    minDate: null,
    maxDate: null
  }
  
  componentDidMount() {
    this.setState({
      minDate: toMomentObject(this.props.minDate, 'YYYY-MM-DD'),
      maxDate: toMomentObject(this.props.maxDate, 'YYYY-MM-DD')
  })
  }

  render() {
    return (
      <div className='date-filter'>

        <h5>Filter by date</h5>

        <DateRangePicker
          startDate={this.state.startDate}
          startDateId="your_unique_start_date_id"
          endDate={this.state.endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={({ startDate, endDate }) => {
            this.setState({ startDate, endDate });
            if ((this.state.startDate || this.state.endDate) === null) {
                return;
            }
            this.props.onFilterStart({startDate}.startDate._d);
            this.props.onFilterEnd({endDate}.endDate._d);
            }}  
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          minDate={toMomentObject(this.props.minDate, 'YYYY-MM-DD')}
          maxDate={this.state.maxDate}
        />

        <button className="btn date-filter-all" onClick={this.props.onShowAll}>
          Back to the full list
        </button>
        
      </div>
    )
  }
}
