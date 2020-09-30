import React from 'react';
import uuid from 'react-uuid';
import './text-with-items.css';

const TextWithItems = ({ text, items }, ...props) => {
    const listItems = items.map((item) => {
        return (
            <li key={uuid()} className="card-text">{item}</li>
        );
    })
    return (
        <div className="container text-with-items-container">
            <label className="card-text font-weight-bold">{text}</label>
            <ul className="text-with-items-ul">
                {listItems}
            </ul>
        </div>
    )
};

export default TextWithItems;