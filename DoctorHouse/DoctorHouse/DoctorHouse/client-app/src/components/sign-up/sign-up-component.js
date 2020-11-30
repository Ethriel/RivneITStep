import React, { useState } from 'react';
import '../../styles/common.css';
import SignUpForm from './index';
import { withRouter } from 'react-router';

const SignUpComponent = (props) => {

    const [user, setUser] = useState({});
    const [isSet, setIsSet] = useState(false);

    const submit = values => {
        setUser(values);
        setIsSet(true);
    }

    if (isSet) {
        console.log(user);
    }

    return (
        <SignUpForm submit={submit} />
    )
};

export default withRouter(SignUpComponent);
