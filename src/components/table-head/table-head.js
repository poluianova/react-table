import React from 'react';
import TableHeaditem from '../table-head-item'

const TableHead = ({ sortUp, sortDown}) => {

	return (

		<thead className='table-head'>
				<TableHeaditem sortUp={sortUp} sortDown={sortDown} />
		</thead>
	)
}

export default TableHead;
