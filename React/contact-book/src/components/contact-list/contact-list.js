import React from 'react';
import ContactItem from '../contact-item/contact-item';
import './contact-list.css';

const ContactList = ({dataContacts, ...props}) => {

    const contacts = dataContacts.map((contact) => {
        return <ContactItem contact={contact}></ContactItem>;
    });
    
    return (
        <div className="card-deck">
           {contacts}
        </div>
    )
}

export default ContactList;