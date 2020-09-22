import React from 'react';
import './App.css';
import ContactList from './components/contact-list/contact-list';

const App = (props) => {
  const state = [
    {
      name: "Volodymyr Lukashchuk",
      phone: "+38 (097) 5449124",
      email: "kerfoer6@ukr.net",
      address: "Makarova 44",
      gender: "men",
      avatar: 3,
      isFavourite: false
    },
    {
      name: "Jack Black",
      phone: "+38 (055) 5478321",
      email: "aaa6@ukr.net",
      address: "MStreet 11",
      gender: "men",
      avatar: 6,
      isFavourite: false
    },
    {
      name: "Allison White",
      phone: "+38 (035) 7538547",
      email: "aw6@ukr.net",
      address: "BStreet 12",
      gender: "women",
      avatar: 6,
      isFavourite: false
    }
  ];

  return (
    <div className="App">
      <ContactList dataContacts={state}></ContactList>
    </div>
  );
}

export default App;
