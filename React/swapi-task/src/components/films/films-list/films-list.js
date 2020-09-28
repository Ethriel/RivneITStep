import React from 'react';
import FilmItem from '../film-item/film-item';
import './films-list';

const FilmsList = ({ films }, ...props) => {
    const filmsItems = [];
    let filmItem = {};
    let img = "";
    for (let i = 0; i < films.length; i++) {
        img = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
        filmItem = <FilmItem film={films[i]} img={img}></FilmItem>
        filmsItems.push(filmItem);
    };

    return(
        <div className="container">
            <div className="card-deck">
                {filmsItems}
            </div>
        </div>
    )
};

export default FilmsList;