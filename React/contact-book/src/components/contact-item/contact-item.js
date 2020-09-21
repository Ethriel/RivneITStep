import React, { Component, Fragment } from 'react';
import './contact-item.css';

class ContactItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Volodymyr Lukashchuk",
            phone: "+38 (097) 5449124",
            email: "kerfoer6@ukr.net",
            address: "Makarova 44",
            gender: "men",
            avatar: 3,
            isFavourite: true
        };
    };

    setRandomImg() {
        const number = Math.floor(Math.random() * Math.floor(99));
        this.setState({
            avatar: number
        });
    };

    render() {
        const { name, phone, email, address, gender, avatar } = this.state;
        const avatarUri = `https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`;
        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-3 col-sm-6 col-md-3">
                        <div className="card">
                            <img className="card-img-top center-div my-card" src={avatarUri} alt="avatar" />
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text">{phone}</p>
                                <p className="card-text">{email}</p>
                                <p className="card-text">{address}</p>
                                <button href="#" className="btn btn-primary" onClick={this.setRandomImg.bind(this)}>Random image</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default ContactItem;
