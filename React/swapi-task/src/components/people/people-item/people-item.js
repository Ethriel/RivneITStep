import React from 'react';
import uuid from 'react-uuid';
import LabelAndText from '../../common/label-and-text/label-and-text';
import './people-item';

const PeopleItem = ({ character, img }, ...props) => {
    const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = character;
    return(
        <div className="col-lg-4 col-md-3 col-sm-6" key={uuid()}>
            <div className="card">
                <div className="card-img-top">
                    <img className="card-img-my" src={character.img} alt={name} />
                </div>
                <div className="card-body">
                    <div className="card-title">
                        <p className="card-title">{name}</p>
                        <LabelAndText label="Height" text={height}/>
                        <LabelAndText label="Mass" text={mass}/>
                        <LabelAndText label="Hair color" text={hair_color}/>
                        <LabelAndText label="Skin color" text={skin_color}/>
                        <LabelAndText label="Eye color" text={eye_color}/>
                        <LabelAndText label="Birth year" text={birth_year}/>
                        <LabelAndText label="Gender" text={gender}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PeopleItem;