import React from 'react';

const LabelAndText = ({ label, text }, ...props) => {
    return (
        <div className="d-flex justify-content-between w-100">
            <label className="card-text font-weight-bold">{label}:</label>
            <p className="card-text">{text}</p>
        </div>
    )
};

export default LabelAndText;