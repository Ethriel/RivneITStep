import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const AppMenu = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Contact book</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Contact list</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favouriteContacts" className="nav-link">Favourite contacts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addContact" className="nav-link">Add contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/groups" className="nav-link">Groups</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default AppMenu;