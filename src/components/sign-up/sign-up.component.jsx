import React, {useState} from 'react';
import './sign-up.styles.scss';
import {connect} from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import {signUpStart} from "../../redux/user/user.actions";

const SignUp = ({signUpStart}) => {
    const [userCredentials, setUserCredential] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        signUpStart({displayName, email, password})
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setUserCredential({...userCredentials, [name]: value});
    };
    return (
        <div className="title">
            <h2>I do not have an account</h2>
            <span className="">Sign Up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>

        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    signUpStart: userCredential => dispatch(signUpStart(userCredential))
});

export default connect(null, mapDispatchToProps)(SignUp);
