import React, { useState } from 'react';
import '../../styles/common.css';
import LoginForm from './index.js';
import { withRouter } from 'react-router';

const SignInComponent = (props) => {
    const [user, setUser] = useState({});
    const [isSet, setIsSet] = useState(false);

    const submit = values => {
        setUser(values);
        setIsSet(true);
    };

    if (isSet) {
        console.log(user);
    }

    return (
        <LoginForm submit={submit} />
    )
};

export default withRouter(SignInComponent);