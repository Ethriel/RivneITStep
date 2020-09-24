import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import './contact-item.css';

class ContactItem extends Component {
    constructor(props) {
        super(props);
        const { id, name, phone, email, address, gender, avatar, isFavourite, group } = props.contact;
        this.state = {
            id: id,
            name: name,
            phone: phone,
            email: email,
            address: address,
            gender: gender,
            avatar: avatar,
            isFavourite: isFavourite,
            setFavourite: props.setFavourite,
            deleteContact: props.deleteContact,
            group: group,
            groups: props.groups,
            redirect: false,
            redirectEdit: false
        };
    };

    setRandomImg = () => {
        const number = Math.floor(Math.random() * Math.floor(99));
        this.setState({
            avatar: number
        });
    };

    setFavourite = () => {
        const opposite = !this.state.isFavourite;
        this.setState({
            isFavourite: opposite
        });
        this.setState({ redirect: true })
    };

    changeGroup = (ev) => {
        const select = ev.target;
        const group = select.options[select.selectedIndex].value;
        this.props.changeGroup(this.state.id, group);
        this.setState({ redirect: true })
    };

    editClick = (ev) => {
        this.props.editContact(this.state.id);
        this.setState({ redirectEdit: true })
    }

    render() {
        const { id, name, phone, email, address, gender, avatar, isFavourite, setFavourite, group, groups, redirect, deleteContact, redirectEdit } = this.state;
        const avatarUri = `https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`;
        const baseStar = this.props.contact.isFavourite ? "fas" : "far";
        const star = `${baseStar} fa-star my-star`;
        const title = isFavourite ? "Unfavourite" : "Favourite";
        let groupPresent = false;
        if (group) {
            groupPresent = true;
        }
        let groupsPresent = false;
        let selectOptions = [];
        let key = 1;
        if (groups) {
            groupsPresent = true;
            selectOptions = groups.map((group) => {
                if (group === this.state.group) {
                    return <option key={key++} value={this.state.group} defaultValue={this.state.group}>{group}</option>
                }
                return <option key={key++} value={group}>{group}</option>
            })
        }
        if (redirect) {
            this.setState({ redirect: false });
            return (<Redirect to="/" push={true} />);
        }
        if (redirectEdit) {
            this.setState({ redirectEdit: false });
            return <Redirect to="/editContact" push={true} />
        }
        return (
            <Fragment>
                {
                    redirect === false &&
                    <div className="col-lg-4 col-md-3 col-sm-6">
                        <div className="card my-card">
                            <img className="card-img-top center-div" src={avatarUri} alt="avatar" />
                            <div className="card-body">
                                <h5 className="card-title my-card-title">{name}</h5>
                                <p className="card-text my-card-text">{phone}</p>
                                <p className="card-text my-card-text">{email}</p>
                                <p className="card-text my-card-text">{address}</p>
                                <div className="d-flex justify-content-between w-100 align-content-center">
                                    <button className="btn btn-primary" onClick={this.setRandomImg}>Random image</button>
                                    <i className={star} onClick={() => setFavourite(id)} title={title}></i>
                                    <i className="fa fa-trash my-trashcan" onClick={() => { deleteContact(id) }} title="Remove"></i>
                                    <i className="fa fa-pencil-square-o my-edit" onClick={this.editClick} title="Edit"></i>
                                </div>

                                {
                                    groupPresent &&
                                    <div className="d-flex justify-content-between w-100 align-content-center">
                                        <p className="text-left card-text">Group:</p>
                                        <p className="text-right card-text">{group}</p>
                                    </div>
                                }

                                {
                                    groupsPresent &&
                                    <select className="form-control" onChange={this.changeGroup}>
                                        {selectOptions}
                                    </select>
                                }
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    };
};

export default ContactItem;
