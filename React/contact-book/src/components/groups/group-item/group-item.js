import React from 'react';
import ContactItem from '../../contact-item/contact-item';
import './group-item.css';

const GroupItem = ({ groupHeader, contacts }, ...props) => {
    let key = 1;
    const items = contacts.map((c) => {
        return <ContactItem key={++key} contact={c} />
    });
    return (
        <div className="container">
            <h3 className="card-title text-left">{groupHeader}</h3>
            <div className="card-deck">
                {items}
            </div>
            <hr className="my-4"></hr>
        </div>
    )
};

export default GroupItem;