import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { FacebookLoginButton } from 'react-social-login-buttons';
import * as yup from 'yup';

const defaultFormState = {
    name: '',
    phone:'',
    email: '',
    password: '',
}

const defaultErrorState = {
    name: '',
    email:''
}

const schema = yup.object().shape({
    name: yup.string()
        .required('Please enter your name')
        .min(2, 'That\'s not a real name.'),
    phone: yup.string()
        .required('Please enter a phone number.')
        .matches(/^[0-9]{10}$/, 'Please enter a valid phone number.')
})

function SignUpForm() {

    const [formState, setFormState] = useState(defaultFormState);
    const [errors, setErrors] = useState(defaultErrorState);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        schema.isValid(formState).then(valid => setIsDisabled(!valid));
    }, [formState, schema])

    const validate = e => {
        e.persist();
        yup.reach(schema, e.target.name).validate(e.target.value)
            .then(valid => setErrors({ ...errors, [e.target.name]: '' }))
            .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('form Submitted');
        console.log('fromstate:', formState);
        axios.post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log(res.data);
                setFormState(defaultFormState);
            })
            .catch(err => console.log(err));
    }
    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    console.log(formState)

    return (
        <formContainer>
            <header>
                <h1 className='text-center'>Sign Up</h1>
            </header>
            <Form className="login-form" onSubmit={handleSubmit}>
                <FormGroup >
                    <Label>Name </Label>
                    <Input type='text' name='name' value={formState.name} onChange={handleChange}></Input>
                    <Label>Phone</Label>
                    <Input type='phone' name='phone' value={formState.phone} onChange={handleChange}></Input>
                    <Label>Email</Label>
                    <Input type='email' name='email' value={formState.email} onChange={handleChange}></Input>
                    <Label>Password</Label>
                    <Input type='password' name='password' value={formState.password} onChange={handleChange}></Input>
                </FormGroup>
                <Button className='btn-lg btn-block' type='submit' name='submit' color="success">
                    Submit
                </Button>
            <div className='text-center pt-3'>
                <a href='/Login'>Login</a>
            </div>
            </Form>
        </formContainer>
    )
}

const formContainer = styled.div`
    

`
export default SignUpForm;