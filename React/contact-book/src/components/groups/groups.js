import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import GroupItem from './group-item/group-item';
import './groups.css';

const Groups = ({ contacts, groups }, ...props) => {
    let key = 1;
const goupItems = groups.map((g) => {
    let contactItems = contacts.filter((c) => {
        return c.group === g;
    });
    return <GroupItem key={key++} groupHeader={g} contacts={contactItems} />
})
    return (
        <Fragment>
            <div className="container">
                <Link to="addGroup" className="btn btn-primary">Add group</Link>
                <Link to="listGroups" className="btn btn-primary">List groups</Link>
                <hr className="my-4"></hr>
                {goupItems}
            </div>
        </Fragment>
    )
};

export default Groups;