import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import AddContactForm from './add-contact-form';
import './add-contact.css';

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            email: "",
            address: "",
            gender: "",
            avatar: 1,
            isFavourite: false,
            redirect: false
        }
    };

    setName = (ev) => {
        const value = ev.target.value;
        this.setState({
            name: value
        });
    }

    setPhone = (ev) => {
        const value = ev.target.value;
        this.setState({
            phone: value
        });
    }

    setEmail = (ev) => {
        const value = ev.target.value;
        this.setState({
            email: value
        });
    }

    setAddress = (ev) => {
        const value = ev.target.value;
        this.setState({
            address: value
        });
    }

    setGender = (ev) => {
        const select = ev.target;
        const gender = select.options[select.selectedIndex].value;
        this.setState({
            gender: gender
        });
    }

    setAvatar = (ev) => {
        const value = ev.target.value;
        this.setState({
            avatar: value
        });
    };

    submitClick = (ev) => {
        this.props.addContact(this.state);
        this.setState({ redirect: true });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" push={true} />
        }
        return (
            <Fragment>
                <div className="container">
                    <AddContactForm
                        setName={this.setName}
                        setPhone={this.setPhone}
                        setEmail={this.setEmail}
                        setAddress={this.setAddress}
                        setGender={this.setGender}
                        setAvatar={this.setAvatar}
                        submitClick={this.submitClick} />
                </div>

            </Fragment>
        )
    };
}

export default AddContact;