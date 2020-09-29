import React from 'react';

const ListItems = ({items}, ...props) => {
    return(
        <div className="container">
            <div className="card-deck">
                {items}
            </div>
        </div>
    )
};

export default ListItems;