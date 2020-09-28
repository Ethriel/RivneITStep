import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppMenu from './appMenu';
import ContactList from './components/contact-list/contact-list';
import FavouriteContacstList from './components/favourite-contacts-list/favourite-contacts-list';
import AddContact from './components/add-contact/add-contact';
import NotFound from './components/page-404/page-404';
import AddGroup from './components/add-group/add-group';
import Groups from './components/groups/groups';
import uuid from 'react-uuid';
import EditContact from './components/edit-contact/edit-contact';
import ListGroups from './components/groups/listGroups';
import AppSideBar from './appSidebar';
const URL = "https://contactbook-9f583.firebaseio.com/lukashchukContacts.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      search: "",
      groups: [
        "All",
        "No group"
      ],
      contactToEdit: {},
      filteredGroups: []
    }
  };

  componentDidMount() {
    this.getContacts();
  };

  getContacts = () => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const contacts = (data !== null && data !== undefined) ? data : [];
        this.setState({ contacts: contacts });
      })
      .catch((error) => {
        console.log(error);
      })
  };

  setFavourite = id => {
    const contacts = this.state.contacts.map((contact) => {
      if (contact.id !== id) {
        return contact;
      }
      return { ...contact, isFavourite: !contact.isFavourite }
    });

    this.setState({ contacts: contacts });
    this.saveChanges(contacts);
  };

  searchOnChange = event => {
    const value = event.target.value;
    this.setState({ search: value })
  };

  addContact = contact => {
    const { contacts } = this.state;
    contact.id = uuid();
    contacts.push(contact);
    this.setState({
      contacts: contacts
    });
    this.saveChanges(contacts);
  };

  checkChanged = group => {
    const filteredGroups = this.state.groups.filter(x => x !== group);
    this.setState({ filteredGroups: filteredGroups });
  }

  addGroup = name => {
    const { groups } = this.state;
    groups.push(name);
    this.setState({
      groups: groups
    });
  };

  changeGroup = (id, group) => {
    const contacts = this.state.contacts.map((contact) => {
      if (contact.id !== id) {
        return contact;
      }
      return { ...contact, group: group }
    });
    this.setState({ contacts: contacts });
  };

  deleteContact = id => {
    const contacts = this.state.contacts.filter((x) => x.id !== id);
    this.setState({ contacts: contacts });
    this.saveChanges(contacts);
  };

  editContact = id => {
    const contact = this.state.contacts.find(x => x.id === id);
    this.setState({
      contactToEdit: contact
    });
    this.saveChanges();
  };

  submitEdit = contact => {
    const contacts = this.state.contacts.map((c) => {
      if (c.id === contact.id) {
        return contact;
      }
      return c;
    });

    this.setState({ contacts: contacts });
    this.saveChanges(contacts);
  };

  deleteGroup = name => {
    const contacts = this.state.contacts.filter(x => x.group !== name);
    const groups = this.state.groups.filter(x => x !== name);
    this.setState({ contacts: contacts });
    this.setState({ groups: groups });
  };

  saveChanges = contacts => {
    fetch(URL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contacts)
    }).then((response) => {
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    const favourites = this.state.contacts.filter((x) => { return x.isFavourite === true });
    const { contacts, search, groups, contactToEdit, filteredGroups } = this.state;
    const filtered = filteredGroups.length > 0 ? filteredGroups : groups;

    return (
      <Router>
        <div className="App">
          <AppMenu />
          <AppSideBar groups={groups} checkChanged={this.checkChanged} />
          <Switch>
            <Route exact path="/"
              render={() =>
                <ContactList dataContacts={contacts}
                  setFavourite={this.setFavourite}
                  groups={groups}
                  searchOnChange={this.searchOnChange}
                  search={search}
                  changeGroup={this.changeGroup}
                  deleteContact={this.deleteContact}
                  editContact={this.editContact} />} />
            <Route exact path="/favouriteContacts"
              render={() => <FavouriteContacstList dataContacts={favourites} setFavourite={this.setFavourite}></FavouriteContacstList>} />
            <Route exact path="/groups"
              render={() => <Groups contacts={contacts} groups={filtered}></Groups>} />
            <Route exact path="/listGroups"
              render={() => <ListGroups groups={groups} deleteGroup={this.deleteGroup}></ListGroups>} />
            <Route exact path="/addGroup"
              render={() => <AddGroup addGroup={this.addGroup}></AddGroup>} />
            <Route exact path="/editContact"
              render={() => <EditContact submitEdit={this.submitEdit} contact={contactToEdit}></EditContact>} />
            <Route exact path="/addContact"
              render={() => <AddContact addContact={this.addContact}></AddContact>} />
            <Route path="*" render={() => <NotFound></NotFound>} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
