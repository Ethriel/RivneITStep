import React, { useState, useEffect } from 'react';
import FetchData from '../../common/fetch-data/fetch-data';
import ListItems from '../../common/list-items/list-items';
import './films-list';
import getFilmsItems from './get-films-items';
import { BASE_URL } from '../../constants';

const FilmsList = (props) => {
    const [films, setFilms] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchFilms() {
            const data = await FetchData(`${BASE_URL}films`, signal);
            setFilms(data.results);
        };

        fetchFilms();

        return function cleanUp() {
            controller.abort();
        }

    }, [])
    const filmsItems = getFilmsItems(films);
    return <ListItems items={filmsItems} />
};

export default FilmsList;