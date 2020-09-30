import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FetchData from '../../common/fetch-data/fetch-data';
import getImageLink from '../../common/get-image-link/getImageLink';
import LabelAndText from '../../common/label-and-text/label-and-text';
import TextWithItems from '../../common/text-with-items/text-with-items';
import { BASE_CHARACTER_DETAILS } from '../../constants';
import './people-item.css';

const PeopleDetails = (props) => {
    const [character, setCharacter] = useState({
        name: "",
        height: 0,
        mass: 0,
        hair_color: "",
        skin_color: "",
        eye_color: "",
        birth_year: "",
        gender: "",
        homeworld: "",
        films: [],
        id: 1,
        img: ""
    });

    const fetchCharacter = useCallback(async (signal) => {
        if (!signal) {
            const controller = new AbortController();
            signal = controller.signal;
        };

        const id = props.match.params.id;
        let data = await FetchData(`${BASE_CHARACTER_DETAILS}${id}`, signal);
        const obj = getImageLink(data.url, "people");
        data.id = obj.id;
        data.img = obj.img;

        const dataHomeworld = await FetchData(data.homeworld, signal);
        data.homeworld = dataHomeworld.name;

        let dataFilm = {};
        const films = [];
        for(let film of data.films){
            dataFilm = await FetchData(film, signal);
            films.push(dataFilm.title);
        }
        
        data.films = films;

        setCharacter(data);
    }, [props.match.params.id]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchCharacter(signal);

        return function cleanUp() {
            controller.abort();
        }
    }, [fetchCharacter])

    return (
        <div className="card card-details d-flex flex-row justify-content-between">
            <img className="card-img-my card-img-details" src={character.img} alt={character.name} />
            <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <LabelAndText label="Height" text={`${character.height} cm`} />
                <LabelAndText label="Mass" text={`${character.mass} kg`} />
                <LabelAndText label="Hair color" text={`${character.hair_color}`} />
                <LabelAndText label="Skin color" text={`${character.skin_color}`} />
                <LabelAndText label="Eye color" text={`${character.eye_color}`} />
                <LabelAndText label="Birth year" text={`${character.birth_year}`} />
                <LabelAndText label="Gender" text={`${character.gender}`} />
                <LabelAndText label="Homeworld" text={`${character.homeworld}`} />
                <TextWithItems text="Films" items={character.films}/>
            </div>
        </div>
    )
};

export default withRouter(PeopleDetails);