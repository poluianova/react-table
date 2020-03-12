import React from 'react';
import './nested-table.css';

const  NestedTable = ({hiddenData}) => {
    
    const data = hiddenData.map((el, i) => {
        const cells = el.map((item, index) => {
        return ( 
            <td key={index}>
                {item}
            </td>    
        )
       })
        return (
        <tr key={i}>
           {cells}
       </tr>
        )
        })
    return (
        <table className='nested-table table table-bordered' style={{width: '100%'}}>
        <tbody>
       { data }
       </tbody>
    </table>
    )
    }
    
export default NestedTable;

