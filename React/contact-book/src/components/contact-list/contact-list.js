import React from 'react';
import ContactItem from '../contact-item/contact-item';
import './contact-list.css';

const ContactList = ({ dataContacts, setFavourite, ...props }) => {
    const contacts = dataContacts.map((contact) => {
        return <ContactItem key={contact.id} contact={contact} setFavourite={setFavourite}></ContactItem>;
    });

    return (
        <div className="card-deck">
            {contacts}
        </div>
    )
}

export default ContactList;