import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppMenu from './AppTopMenu';
import Page404 from './components/page-404/page-404';
import FilmsList from './components/films/films-list/films-list';
import PeopleList from './components/people/people-list/people-list';
import PlanetsList from './components/planets/planets-list/planets-list';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <AppMenu />
          <div className="container-fluid">
            <Switch>
              <Route exact path="/" />
              <Route exact path="/films" component={FilmsList}/>
              <Route exact path="/characters" component={PeopleList}/>
              <Route exact path="/planets" component={PlanetsList}/>
              <Route exact path="*" render={() => <Page404 />} />
            </Switch>
          </div>
        </div>
      </Router>

    )
  }
}

export default App;
