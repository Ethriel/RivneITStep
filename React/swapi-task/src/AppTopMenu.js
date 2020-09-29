import React from 'react';
import { Link } from 'react-router-dom';

const AppMenu = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Star Wars</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/films" className="nav-link">Films</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/characters" className="nav-link">Characters</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/planets" className="nav-link">Planets</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default AppMenu;