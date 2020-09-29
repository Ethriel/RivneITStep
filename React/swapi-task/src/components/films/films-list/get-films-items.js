import React from 'react';
import uuid from 'react-uuid';
import getImageUrl from '../../common/get-image-url/get-image-url';
import FilmItem from '../film-item/film-item';

const getFilmsItems = (films) => {
    let i = 1;
    const filmsItems = films.map((film) => {
        return (
            <FilmItem key={uuid()} film={film} img={getImageUrl("film", i++)} />
        )
    })

    return filmsItems;
};

export default getFilmsItems;