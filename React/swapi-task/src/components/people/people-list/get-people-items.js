import React from 'react';
import uuid from 'react-uuid';
import PeopleItem from '../people-item/people-item';

const getPeopleItems = (people) => {
    const peopleItems = people.map((character) => {
        return (
            <PeopleItem key={uuid()} character={character} />
        );
    });
    return peopleItems;
};

export default getPeopleItems;