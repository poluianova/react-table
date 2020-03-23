import React from 'react';
import './table-head-item.css';

const TableHeaditem = ({sortUp, sortDown}) => {

    const headers = [
    	{name: 'date', label: 'Date'},
    	{name: 'hits', label: 'Hits'},
    	{name: 'unique', label: 'Unique'},
    	{name: 'registrations', label: 'Registrations'},
    	{name: 'demo_registrations', label: 'Demo registrations'},
    	{name: 'conversion', label: 'Conversion'},
    	{name: 'deposit', label: 'Deposit'},
    	{name: 'ftd', label: 'Ftd'},
    	{name: 'deals', label: 'Deals'},
    	{name: 'profit', label: 'Profit'}
		]

	const titles = headers.map(({name, label}, index) => {
    	return (
			<td key={name}>

            	<div className='d-flex align-items-center'>

					<div className='sort-buttons d-flex flex-column'>

						<button type="button" id={`button-up-${index}`}
              			className="button-sort d-flex align-items-end" onClick={() => {sortUp(name)}} >
		        			<i className="fas fa-angle-up"/>
		      			</button>

						<button type="button" id={`button-down-${index}`}
              			className="button-sort d-flex align-items-start" onClick={() => {sortDown(name)}}>
		        			<i className="fas fa-angle-down" />
		      			</button>
		      		</div>

					<span>{ label }</span>

                </div>
			</td>

    	)})

    return (
		<tr className='main-table-row'>
        	{ titles }
		</tr>

)}

export default TableHeaditem;
