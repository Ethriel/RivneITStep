import React from 'react';
import './favourite-contacts-list.css';
import ContactItem from '../contact-item/contact-item';

const FavouriteContacstList = ({ dataContacts, setFavourite, ...props }) => {
    const contacts = dataContacts.map((contact) => {
        return <ContactItem key={contact.id} contact={contact} setFavourite={setFavourite}></ContactItem>;
    });
    return (
        <div className="card-deck">
            {contacts}
        </div>
    );
};

export default FavouriteContacstList;