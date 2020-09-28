import React from 'react';
import uuid from 'react-uuid';
import './App.css';

const AppSideBar = ({ groups, checkChanged }, ...props) => {
    const onChange = (ev) => {
        const target = ev.target;
        if (!target.checked) {
            const group = target.value;
            checkChanged(group);
        }
    }
    const checkboxes = groups.map((group) => {
        return (
            <li key={uuid()} className="nav-item text-left"><input type="checkbox" checked={true} className="checkbox-light" value={group} onChange={onChange} />{group}</li>
        )
    });

    return (
        <nav id="sidebar" className="sidebar">
            <ul className="list-unstyled">
                {checkboxes}
            </ul>
        </nav>
    )
};

export default AppSideBar;