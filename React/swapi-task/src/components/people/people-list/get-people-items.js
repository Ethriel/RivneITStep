import React from 'react';
import uuid from 'react-uuid';
import getImageUrl from '../../common/get-image-url/get-image-url';
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