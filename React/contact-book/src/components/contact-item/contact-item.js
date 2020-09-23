import React, { Component, Fragment } from 'react';
import './contact-item.css';

class ContactItem extends Component {
    constructor(props) {
        super(props);
        const { id, name, phone, email, address, gender, avatar, isFavourite } = props.contact;
        this.state = {
            id: id,
            name: name,
            phone: phone,
            email: email,
            address: address,
            gender: gender,
            avatar: avatar,
            isFavourite: isFavourite,
            setFavourite: props.setFavourite
        };
        this.setRandomImg = this.setRandomImg.bind(this);
        this.setFavourite = this.setFavourite.bind(this);
    };

    setRandomImg() {
        const number = Math.floor(Math.random() * Math.floor(99));
        this.setState({
            avatar: number
        });
    };

    setFavourite() {
        const opposite = !this.state.isFavourite;
        this.setState({
            isFavourite: opposite
        });
    };

    render() {
        const {id, name, phone, email, address, gender, avatar, isFavourite, setFavourite } = this.state;
        const avatarUri = `https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`;
        const baseStar = this.props.contact.isFavourite ? "fas" : "far";
        const star = `${baseStar} fa-star my-star`;
        const title = isFavourite ? "Unfavourite" : "Favourite";
        return (
            <Fragment>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="card my-card">
                        <img className="card-img-top center-div" src={avatarUri} alt="avatar" />
                        <div className="card-body">
                            <h5 className="card-title my-card-title">{name}</h5>
                            <p className="card-text my-card-text">{phone}</p>
                            <p className="card-text my-card-text">{email}</p>
                            <p className="card-text my-card-text">{address}</p>
                            <div className="d-flex justify-content-between w-100 align-content-center">
                                <button href="#" className="btn btn-primary" onClick={this.setRandomImg}>Random image</button>
                                <i className={star} onClick={() => setFavourite(id)} title={title}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default ContactItem;
