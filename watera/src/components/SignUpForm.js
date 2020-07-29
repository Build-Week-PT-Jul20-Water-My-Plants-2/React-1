import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom'
// import { FacebookLoginButton } from 'react-social-login-buttons';


const schema = yup.object().shape({
    username: yup.string()
        .required('Please create a username')
        .min(2, 'That\'s not a real name.'),
    phoneNumber: yup.string()
        .required('Please enter your phone number.')
        .matches(/^[0-9]{10}$/, 'Not a valid phone number.'),
    password: yup.string()
        .required('Please create a password.')
        .min(6, 'Must be atleast 6 characters long.')
})

const defaultFormState = {
    username: '',
    phoneNumber: '',
    password: '',
}

const defaultErrorState = {
    username: '',
    phoneNumber: '',
    password: ''
}


function SignUpForm() {

    const [formState, setFormState] = useState(defaultFormState);
    const [errors, setErrors] = useState(defaultErrorState);
    const [isDisabled, setIsDisabled] = useState(true);
    const history = useHistory();

    useEffect(() => {
        schema.isValid(formState).then(valid => setIsDisabled(!valid));
    }, [formState])

    const validate = e => {
        e.persist();
        yup.reach(schema, e.target.name).validate(e.target.value)
            .then(valid => setErrors({ ...errors, [e.target.name]: '' }))
            .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
    }

    console.log(formState);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('form Submitted:', formState);
        axios.post("https://watermyplants1.herokuapp.com/api/auth/register", formState)
            .then(res => {
                console.log('res:', res.data);
                setFormState(defaultFormState);
                history.push('/')
            })
            .catch(err => console.log(err));
    }
    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'username' || e.target.name === 'phoneNumber' || e.target.name === 'password') {
            validate(e);
        }
    }


    return (
        <FormContainer>
            <header>
                <h1 className='text-center'>Create a New Account</h1>
            </header>
            <Form className="login-form" onSubmit={handleSubmit}>
                <FormGroup >
                    <Label>Username </Label>
                    <Input type='text' name='username' value={formState.username} onChange={handleChange}></Input>
                    {errors.username.length > 0 && <p style={{ color: 'orange', marginBottom: '-.75rem' }}>{errors.username}</p>}
                    <Label>Phone Number</Label>
                    <Input type='phone' name='phoneNumber' value={formState.phoneNumber} onChange={handleChange}></Input>
                    {errors.phoneNumber.length > 0 && <p style={{ color: 'orange', marginBottom: '-.75rem' }}>{errors.phoneNumber}</p>}
                    <Label>Password</Label>
                    <Input type='password' name='password' value={formState.password} onChange={handleChange}></Input>
                    {errors.password.length > 0 && <p style={{ color: 'orange', marginBottom: '-.75rem' }}>{errors.password}</p>}
                </FormGroup>
                <Button disabled={isDisabled} className='btn-lg btn-block' type='submit' name='submit' color="success">
                    Sign Up
                </Button>
                <div className='text-center pt-3'>
                    <a href='/Login'>Login</a>
                </div>
            </Form>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    width: 100%;
    max-width: 400px;
    margin: auto;
    border: 2px black;

    h1{
        border: 1px black;
    }

`
export default SignUpForm;