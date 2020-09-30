import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import './people-item';

const PeopleItem = ({ character }, ...props) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const { id, name, img } = character;
    const moreClick = (ev) => {
        ev.preventDefault();
        setIsRedirect(true);
    };
    if (isRedirect) {
        return (
            <Redirect to={`more/characters/${id}`} push={true} />
        )
    }
    return (
        <div className="col-lg-4 col-md-3 col-sm-6" key={uuid()}>
            <div className="card">
                <div className="card-img-top">
                    <img className="card-img-my" src={img} alt={name} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <button className="btn btn-primary more-btn" onClick={moreClick}>Details...</button>
                </div>
            </div>
        </div>

    )
};

export default PeopleItem;