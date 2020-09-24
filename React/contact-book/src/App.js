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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        {
          id: uuid(),
          name: "Volodymyr Lukashchuk",
          phone: "+38 (097) 5449124",
          email: "kerfoer6@ukr.net",
          address: "Makarova 44",
          gender: "men",
          avatar: 3,
          isFavourite: false,
          group: "All"
        },
        {
          id: uuid(),
          name: "Jack Black",
          phone: "+38 (055) 5478321",
          email: "aaa6@ukr.net",
          address: "MStreet 11",
          gender: "men",
          avatar: 6,
          isFavourite: false,
          group: "All"
        },
        {
          id: uuid(),
          name: "Allison White",
          phone: "+38 (035) 7538547",
          email: "aw6@ukr.net",
          address: "BStreet 12",
          gender: "women",
          avatar: 6,
          isFavourite: false,
          group: "All"
        }
      ],
      search: "",
      groups: [
        "All",
        "No group"
      ],
      contactToEdit: {},
      filteredGroups: []
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
  };

  addContact = (contact) => {
    const { contacts } = this.state;
    contact.id = uuid();
    contacts.push(contact);
    this.setState({
      contacts: contacts
    });
  };

  checkChanged = (group) => {
    const filteredGroups = this.state.groups.filter(x => x !== group);
    this.setState({ filteredGroups: filteredGroups });
  }

  addGroup = (name) => {
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

  deleteContact = (id) => {
    const contacts = this.state.contacts.filter((x) => x.id !== id);
    this.setState({ contacts: contacts });
  };

  editContact = (id) => {
    const contact = this.state.contacts.find(x => x.id === id);
    this.setState({
      contactToEdit: contact
    });
  };

  submitEdit = (contact) => {
    console.log(contact);
    const contacts = this.state.contacts.map((c) => {
      if (c.id === contact.id) {
        return contact;
      }
      return c;
    });

    this.setState({ contacts: contacts });
  };

  deleteGroup = (name) => {
    const contacts = this.state.contacts.filter(x => x.group !== name);
    const groups = this.state.groups.filter(x => x !== name);
    this.setState({ contacts: contacts });
    this.setState({ groups: groups });
  }
  render() {
    const favourites = this.state.contacts.filter((x) => { return x.isFavourite === true });
    const { contacts, search, groups, contactToEdit, filteredGroups } = this.state;
    console.log("FILTERED", filteredGroups);
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
