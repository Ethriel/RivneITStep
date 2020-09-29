import React from 'react';
import uuid from 'react-uuid';
import LabelAndText from '../../common/label-and-text/label-and-text';
import './planet-items.css';

const PlanetItem = ({ planet, img }, ...props) => {
    const { name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population } = planet;

    return(
        <div className="col-lg-4 col-md-3 col-sm-6" key={uuid()}>
            <div className="card">
                <div className="card-img-top">
                    <img className="card-img-my" src={img} alt={name} />
                </div>
                <div className="card-body">
                    <div className="card-title">
                        <p className="card-title">{name}</p>
                        <LabelAndText label="Rotation period" text={rotation_period}/>
                        <LabelAndText label="Orbital period" text={orbital_period}/>
                        <LabelAndText label="Diameter" text={diameter}/>
                        <LabelAndText label="Climate" text={climate}/>
                        <LabelAndText label="Gravity" text={gravity}/>
                        <LabelAndText label="Terrain" text={terrain}/>
                        <LabelAndText label="Surface" text={surface_water}/>
                        <LabelAndText label="Population" text={population}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PlanetItem;