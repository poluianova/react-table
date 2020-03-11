import React from 'react';
import TableHeaditem from '../table-head-item'
import './table-head.css';

const TableHead = ({ sortUp, sortDown}) => {

	return (
		<thead className='table-head'>
				<TableHeaditem
				sortUp={sortUp}
				sortDown={sortDown}
				/>
		</thead>
		)
}

export default TableHead;
