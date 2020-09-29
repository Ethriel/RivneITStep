import React, { useState, useEffect, useCallback } from 'react';
import FetchData from '../../common/fetch-data/fetch-data';
import ListItems from '../../common/list-items/list-items';
import './films-list';
import getFilmsItems from './get-films-items';
import { BASE_URL, SEARCH_FILMS } from '../../constants';

const FilmsList = (props) => {
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState("");

    const fetchFilms = useCallback(async (signal) => {
        const controller = new AbortController();
        if (!signal) {
            signal = controller.signal;
        }
        const data = await FetchData(`${BASE_URL}films`, signal);
        setFilms(data.results);
    }, []);
    
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchFilms(signal);

        return function cleanUp() {
            controller.abort();
        }

    }, [fetchFilms]);

    const inputChanged = (ev) => {
        const target = ev.target;
        const value = target.value;
        if (value) {
            setSearch(value);
        }
        else {
            fetchFilms();
        }
    };

    const searchClick = async (ev) => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (search && search !== "") {
            let data = await FetchData(`${SEARCH_FILMS}${search}`, signal);
            setFilms(data.results);
        }
        else {
            fetchFilms(signal);
        }
    };

    const filmsItems = getFilmsItems(films);
    return (
        <>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={inputChanged} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={searchClick}>Search</button>
            </form>
            <ListItems items={filmsItems} />
        </>
    )
};

export default FilmsList;