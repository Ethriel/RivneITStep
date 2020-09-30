import React from 'react';
import FetchData from '../../common/fetch-data/fetch-data';
import getImageLink from '../../common/get-image-link/getImageLink';
import getImageUrl from '../../common/get-image-url/get-image-url';
import ListItems from '../../common/list-items/list-items';
import { BASE_URL, SEARCH_PLANETS } from '../../constants';
import getPlanetsItems from './get-planets.items';
import './planets-list.css';

class PlanetsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: {},
            img: 1,
            search: ""
        }
    }

    componentDidMount() {
        this.fetchPlanets();
    };

    fetchPlanets = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        let data = await FetchData(`${BASE_URL}planets`, signal);
        data = this.setData(data);
        this.setPlanets(data);
    };

    setData = (data) => {
        let obj;
        data.results.forEach((p) => {
            obj = getImageLink(p.url, "planets");
            p.img = obj.img;
            p.id = obj.id;
        })

        return data;
    };

    setPlanets = (data) => {
        this.setState({
            planets: data
        });
    };

    nextClick = async () => {
        const next = this.state.planets.next;
        const controller = new AbortController();
        const signal = controller.signal;

        let data = await FetchData(next, signal);
        data = this.setData(data);
        this.setPlanets(data);
    };

    prevClick = async () => {
        if (this.state.planets.previous) {
            const previous = this.state.planets.previous;
            console.log(previous);
            const controller = new AbortController();
            const signal = controller.signal;

            let data = await FetchData(previous, signal);
            data = this.setData(data);
            this.setPlanets(data);
        }
    };

    inputChanged = (ev) => {
        const target = ev.target;
        const value = target.value;
        if (value) {
            this.setState({ search: value });
        }
        else {
            this.fetchPlanets();
        }
    };

    searchClick = async (ev) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const { search } = this.state;
        if (search && search !== "") {
            let data = await FetchData(`${SEARCH_PLANETS}${search}`, signal);
            this.setPlanets(data);
        }
        else {
            this.fetchPlanets();
        }
    };

    render() {
        const { planets } = this.state;
        let results = [];
        if (planets.results) {
            results = planets.results;
        }

        const planetsItems = getPlanetsItems(results);

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
                <ListItems items={planetsItems} />
                <ul className="pagination justify-content-center">
                    <li className="page-item btn btn-primary pagination-btn" onClick={this.prevClick}>Previous</li>
                    <li className="page-item btn btn-primary pagination-btn" onClick={this.nextClick}>Next</li>
                </ul>
            </>
        )
    }
};

export default PlanetsList;