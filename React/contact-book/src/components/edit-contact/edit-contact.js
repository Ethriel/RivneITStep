import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import EditContactForm from './edit-contact-form';
import './edit-contact.css';

class EditContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.contact.id,
            name: props.contact.name,
            phone: props.contact.phone,
            email: props.contact.email,
            address: props.contact.address,
            gender: props.contact.gender,
            avatar: props.contact.avatar,
            group: props.contact.group,
            isFavourite: props.contact.isFavourite,
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
        this.props.submitEdit(this.state);
        this.setState({ redirect: true });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" push={true} />
        }
        return (
            <Fragment>
                <div className="container">
                    <EditContactForm
                        setName={this.setName}
                        setPhone={this.setPhone}
                        setEmail={this.setEmail}
                        setAddress={this.setAddress}
                        setGender={this.setGender}
                        setAvatar={this.setAvatar}
                        submitClick={this.submitClick}
                        contact={this.state} />
                </div>

            </Fragment>
        )
    };
}

export default EditContact;