import React from 'react';
import logo from './logo.svg';
import './App.css';

const filmsUrl = "https://swapi.dev/api/films";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      people: [],
      planets: []
    }
  }
  componentDidMount() {
    this.fetchFilms();
  }
  fetchFilms = () => {
    fetch(filmsUrl).then((response) => {
      return response.json();
    }).then((films) => {
      console.log(films);
    })
  }
  render() {
    return (
      <div className="App">

      </div>
    )
  }
}

export default App;
