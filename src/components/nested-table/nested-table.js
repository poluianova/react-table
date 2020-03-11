import React from 'react';
import './nested-table.css';

const  NestedTable = ({hiddenData}) => {
    
    return hiddenData.map((el, i) => {
        const cells = el.map((item, index) => {
        return ( 
            <td key={index}>{item}</td>    
        )
       })
        return (
    <table className='nested-table table table-bordered' style={{width: '100%'}}>
        <tbody>
        <tr key={i}>
           {cells}
       </tr>
       </tbody>
    </table>
        )
        })
    }
    
export default NestedTable;

