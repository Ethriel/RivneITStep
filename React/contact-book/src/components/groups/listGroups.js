import React from 'react';
import uuid from 'react-uuid';
import './groups.css';

const ListGroups = ({ groups, deleteGroup }, ...props) => {
    const head = <tr key={uuid()}><th >Name</th><th>Action</th></tr>;
    const body = groups.map((group) => {
        return (
            <tr key={uuid()}>
                <th key={uuid()}>{group}</th>
                <th key={uuid()}><input type="button" className="btn-sm btn-danger" value="Delete" onClick={() => { deleteGroup(group) }}></input></th>
            </tr>
        )
    });

    return (
        <table className="table">
            <thead>
                {head}
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
    )
};

export default ListGroups;