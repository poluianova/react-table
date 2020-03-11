import React from 'react';
import './table-foot.css';

const TableFoot = ({ totalSum })  => {
	const row = totalSum.map((el, i) => {
		return (
			<td key={`${i}Sum`}>{el}</td>
		)
	})
		return (
<tfoot className='table-foot'>
	<tr className='main-table-row'>
		{row}
	</tr>
</tfoot>

		);
};

export default TableFoot;