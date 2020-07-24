import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as yup from 'yup';
// import { FacebookLoginButton } from 'react-social-login-buttons';


const schema = yup.object().shape({
    name: yup.string()
        .required('Please enter your name')
        .min(2, 'That\'s not a real name.'),
    phone: yup.string()
        .required('Please enter a phone number.')
        .matches(/^[0-9]{10}$/, 'Please enter a valid phone number.')
})

const defaultFormState = {
    name: '',
    phone:'',
    password: '',
}

const defaultErrorState = {
    name: '',
    phone:''
}


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
        console.log('form Submitted:', formState);
        axios.post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log('res:', res.data);
                setFormState(defaultFormState);
            })
            .catch(err => console.log(err));
    }
    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'name' || e.target.name === 'phone') {
            validate(e);
        }
    }


    return (
        <formContainer>
            <header>
                <h1 className='text-center'>Sign Up</h1>
            </header>
            <Form className="login-form" onSubmit={handleSubmit}>
                <FormGroup >
                    <Label>Username </Label>
                    <Input type='text' name='name' value={formState.name} onChange={handleChange}></Input>
                    {errors.name.length > 0 && <p style={{ color: 'red' }}>{errors.name}</p>}
                    <Label>Phone Number</Label>
                    <Input type='phone' name='phone' value={formState.phone} onChange={handleChange}></Input>
                    {errors.phone.length > 0 && <p style={{ color: 'red' }}>{errors.phone}</p>}
                    <Label>Password</Label>
                    <Input type='password' name='password' value={formState.password} onChange={handleChange}></Input>
                </FormGroup>
                <Button disabled={isDisabled} className='btn-lg btn-block' type='submit' name='submit' color="success">
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