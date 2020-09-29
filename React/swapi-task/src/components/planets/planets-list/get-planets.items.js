import React from 'react';
import uuid from 'react-uuid';
import getImageUrl from '../../common/get-image-url/get-image-url';
import PlanetItem from '../planet-item/planet-item';

const getPlanetsItems = (planets) => {
    const planetsItems = planets.map((planet) => {
        return <PlanetItem key={uuid()} planet={planet} img={getImageUrl("planets", planet.id)} />
    });

    return planetsItems;
};

export default getPlanetsItems;