import React from 'react';
import uuid from 'react-uuid';
import './people-item';

const PeopleItem = ({ character, img }, ...props) => {
    const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = character;
    return(
        <div className="col-lg-4 col-md-3 col-sm-6" key={uuid()}>
            <div className="card">
                <div className="card-img-top">
                    <img src={img} alt={name} />
                </div>
                <div className="card-body">
                    <div className="card-title">
                        <p className="card-title">{name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PeopleItem;