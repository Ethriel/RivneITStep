import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './groups.css';

const Groups = (props) => {
return(
    <Fragment>
        <div className="container">
            <Link to="addGroup" className="btn btn-primary">Add group</Link>
        </div>
    </Fragment>
)
};

export default Groups;