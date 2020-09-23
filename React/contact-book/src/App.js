import React from 'react';
import './App.css';
import ContactList from './components/contact-list/contact-list';
import FavouriteContacstList from './components/favourite-contacts-list/favourite-contacts-list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        {
          id: 1,
          name: "Volodymyr Lukashchuk",
          phone: "+38 (097) 5449124",
          email: "kerfoer6@ukr.net",
          address: "Makarova 44",
          gender: "men",
          avatar: 3,
          isFavourite: false
        },
        {
          id: 2,
          name: "Jack Black",
          phone: "+38 (055) 5478321",
          email: "aaa6@ukr.net",
          address: "MStreet 11",
          gender: "men",
          avatar: 6,
          isFavourite: false
        },
        {
          id: 3,
          name: "Allison White",
          phone: "+38 (035) 7538547",
          email: "aw6@ukr.net",
          address: "BStreet 12",
          gender: "women",
          avatar: 6,
          isFavourite: false
        }
      ],
      search: ""
    }
  };

  setFavourite = id => {
    const contacts = this.state.contacts.map((contact) => {
      if (contact.id !== id) {
        return contact;
      }
      return { ...contact, isFavourite: !contact.isFavourite }
    });

    this.setState({ contacts: contacts });
  };

  searchOnChange = event => {
    const value = event.target.value;
    this.setState({ search: value })
  }

  render() {
    const favourites = this.state.contacts.filter((x) => { return x.isFavourite === true });
    const { contacts, search } = this.state;
    return (
      <div className="App">
        <ContactList dataContacts={contacts} setFavourite={this.setFavourite} searchOnChange={this.searchOnChange} search={search}></ContactList>
        <FavouriteContacstList dataContacts={favourites} setFavourite={this.setFavourite}></FavouriteContacstList>
      </div>
    );
  }
}

export default App;
