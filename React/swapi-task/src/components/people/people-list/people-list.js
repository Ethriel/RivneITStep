import React, { useState, useEffect } from 'react';
import FetchData from '../../common/fetch-data/fetch-data';
import ListItems from '../../common/list-items/list-items';
import { BASE_URL } from '../../constants';
import getPeopleItems from './get-people-items';
import './people-list';

const PeopleList = () => {
    const [people, setPeople] = useState({});
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchPeople() {
            const data = await FetchData(`${BASE_URL}people`, signal);
            setPeople(data);
        }

        fetchPeople();

        return function cleanUp() {
            controller.abort();
        }

    }, []);
    const nextClick = async () => {
        const next = people.next;
        const controller = new AbortController();
        const signal = controller.signal;

        const data = await FetchData(next, signal);
        setPeople(data);
    };

    const prevClick = async () => {
        if (people.pervious) {
            const previous = people.next;
            const controller = new AbortController();
            const signal = controller.signal;

            const data = await FetchData(previous, signal);
            setPeople(data);
        }
    };
    let results = [];
    if (people.results) {
        results = people.results;
    }
    const peopleitems = getPeopleItems(results);
    return (
        <>
            <ListItems items={peopleitems} />
            <ul className="pagination">
                <li className="page-item"><button className="btn-sm btn-primary" onClick={prevClick}>Previous</button></li>
                <li className="page-item"><button className="btn-sm btn-primary" onClick={nextClick}>Next</button></li>
            </ul>
        </>
    )
};
// class PeopleList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             people: {}
//         };
//     }

//     componentDidMount() {
//         this.fetchPeople();
//     }

//     fetchPeople = async () => {
//         const data = await FetchData(`${baseUrl}people`);
//         console.log(data);
//     }
//     render() {
//         const { people } = this.state;
//         return (
//             // <ListItems items={people.results}/>
//             <div></div>
//         )
//     }
// }

export default PeopleList;