import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppMenu from './AppTopMenu';
import SwitchRoutes from './components/routes/switch-routes';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <AppMenu />
          <div className="container-fluid">
            <SwitchRoutes />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
