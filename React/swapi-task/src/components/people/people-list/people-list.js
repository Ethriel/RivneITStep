import React from 'react';
import FetchData from '../../common/fetch-data/fetch-data';
import getImageLink from '../../common/get-image-link/getImageLink';
import getImageUrl from '../../common/get-image-url/get-image-url';
import ListItems from '../../common/list-items/list-items';
import { BASE_URL, SEARCH_PEOPLE } from '../../constants';
import getPeopleItems from './get-people-items';
import './people-list.css';


class PeopleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: {},
            search: ""
        };
    }

    componentDidMount() {
        this.fetchPeople();
    };

    fetchPeople = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        let data = await FetchData(`${BASE_URL}people`, signal);
        data = this.setData(data, false);
        this.setPeople(data);
    };

    nextClick = async () => {
        const next = this.state.people.next;
        const controller = new AbortController();
        const signal = controller.signal;

        let data = await FetchData(next, signal);
        data = this.setData(data, false);
        this.setPeople(data);
    };

    prevClick = async () => {
        if (this.state.people.previous) {
            const previous = this.state.people.previous;
            console.log(previous);
            const controller = new AbortController();
            const signal = controller.signal;

            let data = await FetchData(previous, signal);
            data = this.setData(data, true);
            this.setPeople(data);
        }
    };

    setPeople = (data) => {
        this.setState({
            people: data
        });
    };

    setData = (data) => {
        let obj;
        data.results.forEach((p) => {
            obj = getImageLink(p.url, "people");
            p.img = obj.img;
            p.id = obj.id;
        });

        return data;
    };

    inputChanged = (ev) => {
        const target = ev.target;
        const value = target.value;
        if (value) {
            this.setState({ search: value });
        }
        else {
            this.fetchPeople();
        }
    };

    searchClick = async (ev) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const { search } = this.state;
        if (search && search !== "") {
            let data = await FetchData(`${SEARCH_PEOPLE}${search}`, signal);
            data = this.setData(data);
            this.setPeople(data);
        }
        else {
            this.fetchPeople();
        }
    };

    render() {
        const { people } = this.state;
        let results = [];
        if (people.results) {
            results = people.results;
        }
        const peopleitems = getPeopleItems(results);

        return (
            <>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.inputChanged} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.searchClick}>Search</button>
                </form>
                <ul className="pagination justify-content-center">
                    <li className="page-item btn btn-primary pagination-btn" onClick={this.prevClick}>Previous</li>
                    <li className="page-item btn btn-primary pagination-btn" onClick={this.nextClick}>Next</li>
                </ul>
                <ListItems items={peopleitems} />
                <ul className="pagination justify-content-center">
                    <li className="page-item btn btn-primary pagination-btn" onClick={this.prevClick}>Previous</li>
                    <li className="page-item btn btn-primary pagination-btn" onClick={this.nextClick}>Next</li>
                </ul>
            </>
        )
    }
}

export default PeopleList;