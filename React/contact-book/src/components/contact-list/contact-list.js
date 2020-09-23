import React from 'react';
import ContactItem from '../contact-item/contact-item';
import './contact-list.css';

const ContactList = ({ dataContacts, setFavourite, searchOnChange, search, ...props }) => {
    let contacts = dataContacts;
    if (search) {
        contacts = dataContacts.filter((x) => {
            return x.name.toLowerCase().includes(search.toLowerCase()) ||
                x.email.toLowerCase().includes(search.toLowerCase()) ||
                x.address.toLowerCase().includes(search.toLowerCase())
        });
    }

    contacts = contacts.map((contact) => {
        return <ContactItem key={contact.id} contact={contact} setFavourite={setFavourite}></ContactItem>;
    });

    return (
        <div className="container">
            <input type="text" onChange={searchOnChange} className="form-control search-bar center-div" placeholder="Enter search criteria"></input>
            <div className="card-deck">
                {contacts}
            </div>
        </div>
    )
}

export default ContactList;