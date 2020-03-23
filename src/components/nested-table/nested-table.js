import React from 'react';
import './nested-table.css';

const NestedTable = ({hiddenData, display}) => {

    let displayClass = display ? ' display-block' : ' display-none';

    const data = hiddenData.map((el, i) => {
        return (
            <tr key={i}>
                <td>{el[0]}</td>
                <td>{el[1]}</td>
            </tr>
        )
    })

    return (
        <table className={`nested-table table table-bordered ${displayClass}`}>
            <tbody>
                { data }
            </tbody>
        </table>
    )
}

export default NestedTable;


